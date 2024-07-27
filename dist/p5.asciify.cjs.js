'use strict';

class P5AsciifyConstants {

    static VERT_SHADER_CODE = ` #version 300 es
                                precision highp float;

                                layout(location = 0) in vec3 aPosition;
                                layout(location = 1) in vec2 aTexCoord;

                                out vec2 v_texCoord;

                                void main() {
                                    vec4 positionVec4 = vec4(aPosition, 1.0);

                                    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

                                    gl_Position = positionVec4;

                                    v_texCoord = aTexCoord;
                                }`;

    static ASCII_FRAG_SHADER_CODE = `   #version 300 es
                                        precision highp float;

                                        uniform sampler2D u_characterTexture;
                                        uniform float u_charsetCols;
                                        uniform float u_charsetRows;
                                        uniform int u_totalChars;

                                        uniform sampler2D u_sketchTexture;
                                        uniform sampler2D u_rotationTexture;
                                        uniform sampler2D u_edgesTexture; 
                                        uniform sampler2D u_asciiBrightnessTexture;

                                        uniform vec2 u_gridCellDimensions;
                                        uniform vec2 u_gridPixelDimensions;
                                        uniform vec2 u_gridOffsetDimensions;

                                        uniform vec3 u_characterColor;
                                        uniform int u_characterColorMode;
                                        uniform vec3 u_backgroundColor;
                                        uniform int u_backgroundColorMode;

                                        uniform float u_rotationAngle;

                                        uniform int u_invertMode;

                                        uniform int u_renderMode;

                                        uniform bool u_brightnessEnabled;

                                        out vec4 fragColor;

                                        mat2 rotate2D(float angle) {
                                            float s = sin(angle);
                                            float c = cos(angle);
                                            return mat2(c, -s, s, c);
                                        }

                                        void main() {
                                            vec2 adjustedCoord = (gl_FragCoord.xy - u_gridOffsetDimensions) / u_gridPixelDimensions;

                                            if(adjustedCoord.x < 0.0f || adjustedCoord.x > 1.0f || adjustedCoord.y < 0.0f || adjustedCoord.y > 1.0f) {
                                                fragColor = vec4(u_backgroundColor, 1.0f);
                                                return;
                                            }

                                            // Calculate the grid coordinate
                                            vec2 gridCoord = adjustedCoord * u_gridCellDimensions;
                                            vec2 cellCoord = floor(gridCoord);
                                            vec2 centerCoord = cellCoord + vec2(0.5f);
                                            vec2 baseCoord = centerCoord / u_gridCellDimensions;

                                            vec4 edgeColor; // edge color (only used in edges mode)
                                            vec4 sketchColor; // Simulation color

                                            if(u_renderMode == 1) { // edges mode
                                                edgeColor = texture(u_edgesTexture, baseCoord);
                                                sketchColor = texture(u_sketchTexture, baseCoord);

                                                if(edgeColor.rgb == vec3(0.0f)) {
                                                    if (u_brightnessEnabled) {
                                                    fragColor = texture(u_asciiBrightnessTexture, gl_FragCoord.xy / vec2(textureSize(u_asciiBrightnessTexture, 0)));
                                                    } else {
                                                     fragColor = vec4(u_backgroundColor, 1.0f);
                                                    }
                                                    return;
                                                }
                                            } else { // Brightness mode
                                                sketchColor = texture(u_sketchTexture, baseCoord);
                                            }

                                            float brightness = u_renderMode == 1 ? edgeColor.r : dot(sketchColor.rgb, vec3(0.299f, 0.587f, 0.114f));

                                            // Map the brightness to a character index
                                            int charIndex = int(brightness * float(u_totalChars));
                                            charIndex = min(charIndex, u_totalChars - 1);

                                            // Calculate the column and row of the character in the charset texture
                                            int charCol = charIndex % int(u_charsetCols);
                                            int charRow = charIndex / int(u_charsetCols);

                                            // Calculate the texture coordinate of the character in the charset texture
                                            vec2 charCoord = vec2(float(charCol) / u_charsetCols, float(charRow) / u_charsetRows);
                                            
                                            // Sample the rotation texture and calculate brightness for rotation angle
                                            vec4 rotationColor = texture(u_rotationTexture, baseCoord);
                                            float rotationBrightness = dot(rotationColor.rgb, vec3(0.299f, 0.587f, 0.114f));
                                            float rotationAngle = rotationBrightness * 2.0 * 3.14159265; // Convert brightness to angle (0 to 2*PI radians)

                                            vec2 fractionalPart = fract(gridCoord) - 0.5f; // Center fractional part around (0,0) for rotation
                                            fractionalPart = rotate2D(u_rotationAngle) * fractionalPart; // Rotate fractional part
                                            fractionalPart += 0.5f; // Move back to original coordinate space

                                            // Calculate the texture coordinates
                                            vec2 cellMin = charCoord;
                                            vec2 cellMax = charCoord + vec2(1.0f / u_charsetCols, 1.0f / u_charsetRows);
                                            vec2 texCoord = charCoord + fractionalPart * vec2(1.0f / u_charsetCols, 1.0f / u_charsetRows);

                                            // Determine if the texture coordinate is within the cell boundaries
                                            bool outsideBounds = any(lessThan(texCoord, cellMin)) || any(greaterThan(texCoord, cellMax));

                                            // Get the color of the character from the charset texture or use the background color if outside bounds
                                            vec4 charColor = outsideBounds ? vec4(u_backgroundColor, 1.0f) : texture(u_characterTexture, texCoord);

                                            // If the inversion mode is enabled, invert the character color
                                            if(u_invertMode == 1) {
                                                charColor.a = 1.0f - charColor.a;
                                                charColor.rgb = vec3(1.0f);
                                            }

                                            // Calculate the final color of the character
                                            vec4 finalColor = (u_characterColorMode == 0) ? vec4(sketchColor.rgb * charColor.rgb, charColor.a) : vec4(u_characterColor * charColor.rgb, charColor.a);

                                            // If the background color mode is 0, mix the sketch color and the final color based on the character's alpha value
                                            // Otherwise, mix the background color and the final color based on the character's alpha value
                                            if(u_backgroundColorMode == 0) {
                                                fragColor = mix(vec4(sketchColor.rgb, 1.0f), finalColor, charColor.a);
                                            } else {
                                                fragColor = mix(vec4(u_backgroundColor, 1.0f), finalColor, charColor.a);
                                            }

                                            // Override final color with background color for out-of-bounds areas due to rotation
                                            if (outsideBounds) {
                                                fragColor = (u_backgroundColorMode == 0) 
                                                            ? (u_invertMode == 1 ? (u_characterColorMode == 0 ? vec4(sketchColor.rgb, 1.0f) : vec4(u_characterColor, 1.0f)) : vec4(sketchColor.rgb, 1.0f)) 
                                                            : (u_invertMode == 1 ? (u_characterColorMode == 0 ? vec4(sketchColor.rgb, 1.0f) : vec4(u_characterColor, 1.0f)) : vec4(u_backgroundColor, 1.0f));
                                            }
                                        }`;

    static SAMPLE_FRAG_SHADER_CODE = `  #version 300 es
                                        precision highp float;

                                        uniform sampler2D u_image;

                                        uniform vec2 u_gridCellDimensions; // New uniform to store the dimensions of the grid (number of columns and rows)
                                        uniform int u_threshold;
                                        out vec4 outColor;

                                        const vec3 BLACK = vec3(0.0, 0.0, 0.0);

                                        // Increase the size of the histogram arrays to handle larger cells
                                        const int MAX_HISTOGRAM_SIZE = 16;
                                        vec3 colorHistogram[MAX_HISTOGRAM_SIZE];
                                        int countHistogram[MAX_HISTOGRAM_SIZE];

                                        void main() {
                                            vec2 bufferDimensions = u_gridCellDimensions;
                                            vec2 imageDimensions = vec2(textureSize(u_image, 0));
                                            vec2 gridCellDimensions = vec2(imageDimensions.x / bufferDimensions.x, imageDimensions.y / bufferDimensions.y);

                                            ivec2 coords = ivec2(gl_FragCoord.xy);
                                            int gridX = coords.x;
                                            int gridY = coords.y;

                                            ivec2 cellOrigin = ivec2(gridX * int(gridCellDimensions.x), gridY * int(gridCellDimensions.y));
                                            int histogramIndex = 0;
                                            int nonBlackCount = 0;

                                            // Initialize histograms
                                            for (int i = 0; i < MAX_HISTOGRAM_SIZE; i++) {
                                                colorHistogram[i] = BLACK;
                                                countHistogram[i] = 0;
                                            }

                                            // Iterate over the cell and populate the histograms
                                            for (int i = 0; i < int(gridCellDimensions.x); i += 1) {
                                                for (int j = 0; j < int(gridCellDimensions.y); j += 1) {
                                                    ivec2 pixelCoords = cellOrigin + ivec2(i, j);
                                                    vec3 color = texelFetch(u_image, pixelCoords, 0).rgb;

                                                    if (color == BLACK) continue;

                                                    nonBlackCount++;
                                                    bool found = false;
                                                    for (int k = 0; k < histogramIndex; k++) {
                                                        if (colorHistogram[k] == color) {
                                                            countHistogram[k]++;
                                                            found = true;
                                                            break;
                                                        }
                                                    }

                                                    if (!found && histogramIndex < MAX_HISTOGRAM_SIZE) {
                                                        colorHistogram[histogramIndex] = color;
                                                        countHistogram[histogramIndex] = 1;
                                                        histogramIndex++;
                                                    }
                                                }
                                            }

                                            vec3 mostFrequentColor = BLACK;
                                            int highestCount = 0;

                                            // Find the most frequent color
                                            for (int k = 0; k < histogramIndex; k++) {
                                                if (countHistogram[k] > highestCount) {
                                                    mostFrequentColor = colorHistogram[k];
                                                    highestCount = countHistogram[k];
                                                }
                                            }

                                            // If the number of non-black pixels is below the threshold, output black, otherwise output the most frequent color
                                            if (nonBlackCount < u_threshold) {
                                                outColor = vec4(BLACK, 1.0);
                                            } else {
                                                outColor = vec4(mostFrequentColor, 1.0);
                                            }
                                        }`;

    static SOBEL_FRAG_SHADER_CODE = `   #version 300 es
                                        precision highp float;

                                        in vec2 v_texCoord;
                                        out vec4 fragColor;

                                        uniform sampler2D u_texture;
                                        uniform vec2 u_textureSize;
                                        uniform float u_threshold;

                                        void main() {
                                            vec2 texelSize = 1.0 / u_textureSize;

                                            float kernelX[9];
                                            float kernelY[9];

                                            kernelX[0] = -1.0; kernelX[1] = 0.0; kernelX[2] = 1.0;
                                            kernelX[3] = -2.0; kernelX[4] = 0.0; kernelX[5] = 2.0;
                                            kernelX[6] = -1.0; kernelX[7] = 0.0; kernelX[8] = 1.0;

                                            kernelY[0] = -1.0; kernelY[1] = -2.0; kernelY[2] = -1.0;
                                            kernelY[3] = 0.0; kernelY[4] = 0.0; kernelY[5] = 0.0;
                                            kernelY[6] = 1.0; kernelY[7] = 2.0; kernelY[8] = 1.0;

                                            vec3 texColor[9];
                                            for(int i = 0; i < 3; i++) {
                                                for(int j = 0; j < 3; j++) {
                                                    texColor[i * 3 + j] = texture(u_texture, v_texCoord + vec2(i - 1, j - 1) * texelSize).rgb;
                                                }
                                            }

                                            vec3 sobelX = vec3(0.0);
                                            vec3 sobelY = vec3(0.0);
                                            for(int i = 0; i < 9; i++) {
                                                sobelX += kernelX[i] * texColor[i];
                                                sobelY += kernelY[i] * texColor[i];
                                            }

                                            vec3 sobel = sqrt(sobelX * sobelX + sobelY * sobelY);
                                            float intensity = length(sobel) / sqrt(3.0);

                                            float angleDeg = degrees(atan(sobelY.r, sobelX.r));
                                            vec3 edgeColor = vec3(0.0);

                                            if(intensity > u_threshold) {
                                                if(angleDeg >= -22.5 && angleDeg < 22.5) {
                                                    edgeColor = vec3(0.1); // "-"
                                                } else if(angleDeg >= 22.5 && angleDeg < 67.5) {
                                                    edgeColor = vec3(0.2); // "/"
                                                } else if(angleDeg >= 67.5 && angleDeg < 112.5) {
                                                    edgeColor = vec3(0.3); // "|"
                                                } else if(angleDeg >= 112.5 && angleDeg < 157.5) {
                                                    edgeColor = vec3(0.4); // "\"
                                                } else if(angleDeg >= 157.5 || angleDeg < -157.5) {
                                                    edgeColor = vec3(0.6); // "-"
                                                } else if(angleDeg >= -157.5 && angleDeg < -112.5) {
                                                    edgeColor = vec3(0.7); // "/"
                                                } else if(angleDeg >= -112.5 && angleDeg < -67.5) {
                                                    edgeColor = vec3(0.8); // "|"
                                                } else if(angleDeg >= -67.5 && angleDeg < -22.5) {
                                                    edgeColor = vec3(0.9); // "\"
                                                }
                                            }

                                            fragColor = vec4(edgeColor, 1.0);
                                        }`;

    static KALEIDOSCOPE_FRAG_SHADER_CODE = `#version 300 es
                                            precision highp float;

                                            uniform sampler2D u_image; // The image to apply the kaleidoscope effect
                                            uniform int u_segments; // Number of kaleidoscope segments
                                            uniform float u_angle; // Rotation angle for the kaleidoscope

                                            in vec2 v_texCoord; // Texture coordinates from vertex shader
                                            out vec4 fragColor; // Output color

                                            #define PI 3.1415926535897932384626433832795

                                            void main() {
                                                // Calculate the angle per segment
                                                float angle = 2.0 * PI / float(u_segments);

                                                // Translate texture coordinates to the center
                                                vec2 centeredCoord = v_texCoord - 0.5;
                                                
                                                // Rotate texture coordinates
                                                float currentAngle = atan(centeredCoord.y, centeredCoord.x);
                                                float radius = length(centeredCoord);
                                                currentAngle = mod(currentAngle, angle);

                                                // Mirror the segments
                                                currentAngle = angle / 2.0 - abs(currentAngle - angle / 2.0);

                                                // Apply the kaleidoscope rotation angle
                                                currentAngle += u_angle;

                                                // Convert polar coordinates back to Cartesian
                                                vec2 rotatedCoord = vec2(cos(currentAngle), sin(currentAngle)) * radius;
                                                
                                                // Re-translate coordinates back
                                                vec2 finalCoord = rotatedCoord + 0.5;
                                                
                                                // Sample the color from the image using the manipulated coordinates
                                                vec4 color = texture(u_image, finalCoord);

                                                // Output the color
                                                fragColor = color;
                                            }`;

    static DISTORTION_FRAG_SHADER_CODE = `  #version 300 es
                                            precision highp float;

                                            in vec2 v_texCoord;

                                            uniform sampler2D u_image;
                                            uniform float u_time;
                                            uniform float u_frequency;
                                            uniform float u_amplitude;

                                            out vec4 fragColor;

                                            void main() {
                                            vec2 uv = v_texCoord;

                                            float sineWave = sin(uv.y * u_frequency + u_time) * u_amplitude;

                                            vec2 distort = vec2(sineWave, sineWave);

                                            vec4 texColor = texture(u_image, mod(uv + distort, 1.0));

                                            fragColor = texColor;
                                            }`;
                                        
    static GRAYSCALE_FRAG_SHADER_CODE = `   #version 300 es
                                            precision highp float;

                                            uniform sampler2D u_image; 
                                            in vec2 v_texCoord; 

                                            out vec4 fragColor; 

                                            void main() {
                                                vec4 color = texture(u_image, v_texCoord);
                                                float luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
                                                color.rgb = vec3(luminance);
                                                fragColor = color;
                                            }`;

    static INVERT_FRAG_SHADER_CODE = `  #version 300 es
                                        precision highp float;

                                        uniform sampler2D u_image; // The image, whose colors get inverted
                                        in vec2 v_texCoord; // Texture coordinates from vertex shader

                                        out vec4 fragColor; // Output color

                                        void main() {
                                            // Sample the color from the image
                                            vec4 color = texture(u_image, v_texCoord);

                                            // Invert the color
                                            color.rgb = 1.0 - color.rgb;

                                            // Output the inverted color
                                            fragColor = color;
                                        }`;

    static CHROMATIC_ABERRATION_FRAG_SHADER_CODE = `#version 300 es
                                                    precision highp float;

                                                    uniform sampler2D u_image; // The image to apply the effect to
                                                    in vec2 v_texCoord; // Texture coordinates from vertex shader

                                                    // Parameters for controlling the effect
                                                    uniform float u_aberrationAmount; // The amount of chromatic aberration
                                                    uniform float u_aberrationAngle; // The angle of chromatic aberration

                                                    out vec4 fragColor; // Output color

                                                    void main() {
                                                        // Calculate the offsets for each color channel
                                                        vec2 redOffset = vec2(u_aberrationAmount * cos(u_aberrationAngle), u_aberrationAmount * sin(u_aberrationAngle));
                                                        vec2 greenOffset = vec2(0.0, 0.0); // Green channel remains at the center
                                                        vec2 blueOffset = vec2(-u_aberrationAmount * cos(u_aberrationAngle), -u_aberrationAmount * sin(u_aberrationAngle));

                                                        // Sample the color for each channel with the offset
                                                        float red = texture(u_image, v_texCoord + redOffset).r;
                                                        float green = texture(u_image, v_texCoord + greenOffset).g;
                                                        float blue = texture(u_image, v_texCoord + blueOffset).b;

                                                        // Combine the colors back together
                                                        vec4 color = vec4(red, green, blue, 1.0);

                                                        // Output the color with chromatic aberration
                                                        fragColor = color;
                                                    }`;

    static ROTATE_FRAG_SHADER_CODE = `  #version 300 es
                                        precision highp float;

                                        uniform sampler2D u_image; // The image to rotate
                                        uniform float u_angle; // The rotation angle
                                        in vec2 v_texCoord; // Texture coordinates from vertex shader

                                        out vec4 fragColor; // Output color

                                        void main() {
                                            // Translate texture coordinates to the center
                                            vec2 centeredCoord = v_texCoord - 0.5;

                                            // Rotate texture coordinates
                                            vec2 rotatedCoord;
                                            rotatedCoord.x = centeredCoord.x * cos(u_angle) - centeredCoord.y * sin(u_angle);
                                            rotatedCoord.y = centeredCoord.x * sin(u_angle) + centeredCoord.y * cos(u_angle);

                                            // Re-translate coordinates back
                                            vec2 finalCoord = rotatedCoord + 0.5;

                                            // Flip the y-coordinate
                                            finalCoord.y = 1.0 - finalCoord.y;

                                            // Sample the color from the image using the rotated and flipped coordinates
                                            vec4 color = texture(u_image, finalCoord);

                                            // Output the color
                                            fragColor = color;
                                        }`;

    static BRIGHTNESS_FRAG_SHADER_CODE = `  #version 300 es
                                            precision highp float;

                                            uniform sampler2D u_image; // The image to be brightness adjusted
                                            uniform float u_brightness; // Brightness adjustment factor
                                            in vec2 v_texCoord; // Texture coordinates from vertex shader

                                            out vec4 fragColor; // Output color

                                            void main() {
                                                // Sample the color from the image
                                                vec4 color = texture(u_image, v_texCoord);

                                                // Adjust the color's brightness
                                                color.rgb += u_brightness;

                                                // Clamp the results to the valid range [0, 1] to avoid invalid colors
                                                color.rgb = clamp(color.rgb, 0.0, 1.0);

                                                // Output the brightness-adjusted color
                                                fragColor = color;
                                            }`;

    static COLOR_PALETTE_FRAG_SHADER_CODE = `   #version 300 es
                                                precision mediump float;

                                                uniform sampler2D u_image; // Original image
                                                uniform sampler2D u_colorPalette; // Color palette image
                                                uniform vec2 u_colorPaletteDimensions; // Dimensions of the color palette texture
                                                uniform int u_colorPaletteRow; // Row index for the color palette texture
                                                uniform float u_colorPaletteLength; // Number of colors in the gradient (length of the texture row)

                                                out vec4 fragColor;

                                                void main() {
                                                    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_image, 0));

                                                    vec4 texColor = texture(u_image, uv); // Color of the current fragment in the original image

                                                    // Convert the original image color to grayscale
                                                    float gray = (texColor.r + texColor.g + texColor.b) / 3.0;

                                                    // Use the grayscale value as the horizontal coordinate in the color palette texture
                                                    float paletteX = gray * (u_colorPaletteLength - 1.0);
                                                    float paletteTexelPosition = (floor(paletteX) + 0.5) / u_colorPaletteDimensions.x;

                                                    // Calculate the correct row position for the color palette texture
                                                    float rowPosition = float(u_colorPaletteRow) + 0.5; // colorPaletteRow is an integer starting from 0
                                                    float rowTexCoord = rowPosition / u_colorPaletteDimensions.y;

                                                    // Fetch the color from the color palette texture
                                                    vec4 paletteColor = texture(u_colorPalette, vec2(paletteTexelPosition, rowTexCoord));

                                                    // Set the fragment color to the color from the palette
                                                    fragColor = paletteColor;
                                                }`;

    static URSAFONT_BASE64 = "data:text/javascript;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAA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AIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
}

class P5AsciifyError extends Error {
    constructor(message) {
        super(message);
        this.name = "P5AsciifyError";
    }
}

class P5AsciifyEffect {
    constructor(name, shader) {
        this._name = name;
        this._shader = shader;
        this._enabled = true;
    }

    setUniforms(framebuffer) {
        this._shader.setUniform('u_image', framebuffer);
    }

    get shader() {
        return this._shader;
    }

    set shader(shader) {
        this._shader = shader;
    }

    get name() {
        return this._name;
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(enabled) {
        this._enabled = enabled;
    }
}

class P5AsciifyBrightnessEffect extends P5AsciifyEffect {
    constructor({ shader, brightness }) {
        super("brightness", shader);
        this._brightness = brightness;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_brightness', this._brightness);
    }

    set brightness(brightness) {
        this._brightness = brightness;
    }

    get brightness() {
        return this._brightness;
    }
}

class P5AsciifyChromaticAberrationEffect extends P5AsciifyEffect {
    constructor({ shader, amount, angle }) {
        super("chromaticaberration", shader);
        this._amount = amount;
        this._angle = angle;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);

        this._shader.setUniform('u_aberrationAmount', this._amount);
        this._shader.setUniform('u_aberrationAngle', this._angle * Math.PI / 180);
    }

    set amount(amount) {
        this._amount = amount;
    }

    set angle(angle) {
        this._angle = angle;
    }

    get amount() {
        return this._amount;
    }

    get angle() {
        return this._angle;
    }
}

class P5AsciifyColorPaletteEffect extends P5AsciifyEffect {
    constructor({ shader, palette, paletteBuffer }) {
        super("colorpalette", shader);
        this._palette = palette;
        this.paletteBuffer = paletteBuffer;
        this._paletteId = this.paletteBuffer.addPalette(this._palette);
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);

        this._shader.setUniform('u_colorPalette', this.paletteBuffer.texture);
        this._shader.setUniform('u_colorPaletteRow', this._paletteId);
        this._shader.setUniform('u_colorPaletteDimensions', [this.paletteBuffer.texture.width, this.paletteBuffer.texture.height]);
        this._shader.setUniform('u_colorPaletteLength', this._palette.length);
    }

    set palette(palette) {
        this._palette = palette;
        this.paletteBuffer.setPaletteColors(this._paletteId, this._palette);
    }
}

class P5AsciifyDistortionEffect extends P5AsciifyEffect {
    constructor({ shader, frequency, amplitude }) {
        super("distortion", shader);
        this._frequency = frequency;
        this._amplitude = amplitude;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);

        this._shader.setUniform('u_frequency', this._frequency);
        this._shader.setUniform('u_amplitude', this._amplitude);
        this._shader.setUniform('u_time', frameCount * 0.01);
    }

    set frequency(frequency) {
        this._frequency = frequency;
    }

    set amplitude(amplitude) {
        this._amplitude = amplitude;
    }

    get frequency() {
        return this._frequency;
    }

    get amplitude() {
        return this._amplitude;
    }
}

class P5AsciifyGrayscaleEffect extends P5AsciifyEffect {
    constructor({ shader }) {
        super("grayscale", shader);
    }
}

class P5AsciifyInvertEffect extends P5AsciifyEffect {
    constructor({ shader }) {
        super("invert", shader);
    }
}

class P5AsciifyKaleidoscopeEffect extends P5AsciifyEffect {
    constructor({ shader, segments, angle }) {
        super("kaleidoscope", shader);
        this._segments = segments;
        this._angle = angle;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_segments', this._segments);
        this._shader.setUniform('u_angle', this._angle * Math.PI / 180);
    }

    set segments(segments) {
        this._segments = segments;
    }

    set angle(angle) {
        this._angle = angle;
    }

    get segments() {
        return this._segments;
    }

    get angle() {
        return this._angle;
    }
}

class P5AsciifyRotateEffect extends P5AsciifyEffect {
    constructor({ shader, angle }) {
        super("rotate", shader);
        this._angle = angle;
    }

    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);

        this._shader.setUniform('u_angle', this._angle * Math.PI / 180);
    }

    set angle(angle) {
        this._angle = angle;
    }

    get angle() {
        return this._angle;
    }
}

/**
 * Represents a color palette texture.
 */
class P5AsciifyColorPalette {
    /**
     * Creates a new instance of the ColorPaletteTexture class.
     */
    constructor() {
        this.palettes = [];

    }

    setup() {
        this.texture = createFramebuffer({ width: 1, height: 1 });

        if (this.palettes.length > 0) {
            this.updateTexture();
        }
    }

    /**
     * Updates the texture with the current palettes.
     */
    updateTexture() {
        let maxColors = this.palettes.reduce((max, colors) => Math.max(max, colors.length), 1);
        this.texture.resize(maxColors, this.palettes.length);

        this.texture.loadPixels();

        for (let y = 0; y < this.palettes.length; y++) {
            let colors = this.palettes[y].map(c => color(c)); // Convert to p5.Color objects
            for (let x = 0; x < colors.length; x++) {
                let index = (y * maxColors + x) * 4;
                let col = colors[x];
                this.texture.pixels[index] = red(col);
                this.texture.pixels[index + 1] = green(col);
                this.texture.pixels[index + 2] = blue(col);
                this.texture.pixels[index + 3] = alpha(col); // Use alpha value from p5.Color object
            }
            // Fill the rest of the row with transparent pixels if the palette is shorter
            for (let x = colors.length; x < maxColors; x++) {
                let index = (y * maxColors + x) * 4;
                this.texture.pixels[index] = 0;
                this.texture.pixels[index + 1] = 0;
                this.texture.pixels[index + 2] = 0;
                this.texture.pixels[index + 3] = 0;
            }
        }
        this.texture.updatePixels();
    }

    reset() {
        this.palettes = [];

        this.texture.resize(1, 1);

        this.texture.begin();
        clear();
        this.texture.end();
    }

    addPalette(colors) {
        this.palettes.push(colors);

        if (frameCount > 0) {
            this.updateTexture();
        }
        return this.palettes.length - 1;
    }

    removePalette(index) {
        if (index >= 0 && index < this.palettes.length) {
            this.palettes.splice(index, 1);
            if (frameCount > 0) {
                this.updateTexture();
            }
        } else {
            console.warn(`Index ${index} is out of range`);
        }
    }

    setPaletteColors(index, colors) {
        if (index >= 0 && index < this.palettes.length) {
            this.palettes[index] = colors;
            if (frameCount > 0) {
                this.updateTexture();
            }
        } else {
            console.warn(`Index ${index} is out of range`);
        }
    }
}

class P5AsciifyEffectManager {

    colorPalette = new P5AsciifyColorPalette();

    effectParams = {
        "kaleidoscope": { "segments": 2, "angle": 0.0 },
        "distortion": { "frequency": 0.1, "amplitude": 0.1 },
        "grayscale": {},
        "invert": {},
        "chromaticaberration": { "amount": 0.1, "angle": 0.0 },
        "rotate": { "angle": 0.0 },
        "brightness": { "brightness": 0.0 },
        "colorpalette": { "palette": ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"], "paletteBuffer": this.colorPalette },
    }

    effectShaders = {
        "kaleidoscope": P5AsciifyConstants.KALEIDOSCOPE_FRAG_SHADER_CODE,
        "distortion": P5AsciifyConstants.DISTORTION_FRAG_SHADER_CODE,
        "grayscale": P5AsciifyConstants.GRAYSCALE_FRAG_SHADER_CODE,
        "invert": P5AsciifyConstants.INVERT_FRAG_SHADER_CODE,
        "chromaticaberration": P5AsciifyConstants.CHROMATIC_ABERRATION_FRAG_SHADER_CODE,
        "rotate": P5AsciifyConstants.ROTATE_FRAG_SHADER_CODE,
        "brightness": P5AsciifyConstants.BRIGHTNESS_FRAG_SHADER_CODE,
        "colorpalette": P5AsciifyConstants.COLOR_PALETTE_FRAG_SHADER_CODE,
    }

    effectConstructors = {
        "kaleidoscope": ({ shader, params }) => new P5AsciifyKaleidoscopeEffect({ shader, ...params }),
        "distortion": ({ shader, params }) => new P5AsciifyDistortionEffect({ shader, ...params }),
        "grayscale": ({ shader, params }) => new P5AsciifyGrayscaleEffect({ shader, ...params }),
        "invert": ({ shader, params }) => new P5AsciifyInvertEffect({ shader, ...params }),
        "chromaticaberration": ({ shader, params }) => new P5AsciifyChromaticAberrationEffect({ shader, ...params }),
        "rotate": ({ shader, params }) => new P5AsciifyRotateEffect({ shader, ...params }),
        "brightness": ({ shader, params }) => new P5AsciifyBrightnessEffect({ shader, ...params }),
        "colorpalette": ({ shader, params }) => new P5AsciifyColorPaletteEffect({ shader, ...params }),
    }

    _setupQueue = [];

    constructor() {
        this._effects = [];
    }

    setup(colorPalette) {
        this.colorPalette = colorPalette;
        this.setupShaders();
        this.setupEffectQueue();
    }

    setupShaders() {
        for (let effectName in this.effectShaders) {
            this.effectShaders[effectName] = createShader(P5AsciifyConstants.VERT_SHADER_CODE, this.effectShaders[effectName]);
        }
    }

    setupEffectQueue() {
        for (let effectInstance of this._setupQueue) {
            effectInstance.shader = this.effectShaders[effectInstance.name];
        }
    }

    addExistingEffectAtIndex(effectInstance, index) {
        if (this.hasEffect(effectInstance)) {
            throw new P5AsciifyError(`Effect instance of type '${effectInstance.name}' already exists in the effect manager.`);
        }

        effectInstance.shader = this.effectShaders[effectInstance.name];
        this._effects.splice(index, 0, effectInstance);

        if (frameCount === 0) {
            this._setupQueue.push(effectInstance);
        }
    }

    getEffectIndex(effectInstance) {
        const index = this._effects.indexOf(effectInstance);
        if (index === -1) {
            throw new P5AsciifyError(`Effect instance of type '${effectInstance.name}' does not exist in the effect manager.`);
        }
        return index;
    }

    addEffect(effectName, userParams = {}) {
        if (!this.effectConstructors[effectName]) {
            throw new P5AsciifyError(
                `Effect '${effectName}' does not exist! 
                Available effects: ${Object.keys(this.effectConstructors).join(", ")}`
            );
        }

        const validParams = Object.keys(this.effectParams[effectName]);
        const invalidKeys = Object.keys(userParams).filter(key => !Object.keys(this.effectParams[effectName]).includes(key));
        if (invalidKeys.length > 0) {
            throw new P5AsciifyError(
                `Invalid parameter(s) for effect '${effectName}': ${invalidKeys.join(", ")}
                Valid parameters are: ${validParams.join(", ")}`
            );
        }

        const shader = frameCount === 0 ? null : this.effectShaders[effectName];
        const params = { ...this.effectParams[effectName], ...userParams };
        const effectInstance = this.effectConstructors[effectName]({ shader, params });
        this._effects.push(effectInstance);

        if (frameCount === 0) {
            this._setupQueue.push(effectInstance);
        }

        return effectInstance;
    }

    removeEffect(effectInstance) {
        const index = this._effects.indexOf(effectInstance);
        if (index > -1) {
            this._effects.splice(index, 1);
        } else {
            throw new P5AsciifyError(`Effect instance of type '${effectInstance.name}' cannot be removed because it does not exist in the effect manager.`);
        }
    }

    hasEffect(effectInstance) {
        return this._effects.includes(effectInstance);
    }

    swapEffects(effectInstance1, effectInstance2) {
        const index1 = this._effects.indexOf(effectInstance1);
        const index2 = this._effects.indexOf(effectInstance2);

        if (index1 === -1) {
            throw new P5AsciifyError(`First effect parameter of type '${effectInstance1.name}' cannot be swapped because it does not exist in the effect manager.`);
        }

        if (index2 === -1) {
            throw new P5AsciifyError(`Second effect parameter of type '${effectInstance2.name}' cannot be swapped because it does not exist in the effect manager.`);
        }

        // Swap the effects
        [this._effects[index1], this._effects[index2]] = [this._effects[index2], this._effects[index1]];
    }

    getEffects() {
        return this._effects;
    }
}

class P5AsciifyCharacterSet {
    constructor({ fontSize = 16, characters }) {
        this.fontSize = fontSize;
        this.characters = Array.from(characters);
    }

    setup({ font, characters, fontSize }) {
        this.font = font;
        this.characters = Array.from(characters);
        this.fontSize = fontSize;
        this.reset();
    }

    reset() {
        this.glyphs = Object.values(this.font.font.glyphs.glyphs);
        this.glyphs = this.glyphs.filter(glyph => glyph.unicode !== undefined);

        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);

        this.createTexture({ fontSize: 512 });
    }

    getMaxGlyphDimensions(fontSize) {
        return this.glyphs.reduce((maxDims, glyph) => {
            const bounds = glyph.getPath(0, 0, fontSize).getBoundingBox();
            return {
                width: Math.ceil(Math.max(maxDims.width, bounds.x2 - bounds.x1)),
                height: Math.ceil(Math.max(maxDims.height, bounds.y2 - bounds.y1))
            };
        }, { width: 0, height: 0 });
    }

    setFontObject(font) {
        this.font = font;
        this.reset();
    }

    setCharacterSet(characters) {
        this.characters = Array.from(characters);
        this.createTexture({ fontSize: 512 });
    }

    setCharacter({ character, index }) {
        this.characters[index] = character;
        this.createTexture({ fontSize: 512 });
    }

    getUnsupportedCharacters(characters) {
        const badCharacters = new Set();

        for (const char of characters) {
            const charCode = char.codePointAt(0);
            const existsInFont = this.glyphs.some(glyph => glyph.unicodes.includes(charCode));
            if (!existsInFont) {
                badCharacters.add(char);
            }
        }

        return Array.from(badCharacters);
    }

    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
    }

    createTexture({ fontSize }) {
        // Calculate the number of columns and rows for the texture based on the number of characters
        this.charsetCols = Math.ceil(Math.sqrt(this.characters.length));
        this.charsetRows = Math.ceil(this.characters.length / this.charsetCols);

        let dimensions = this.getMaxGlyphDimensions(fontSize); // Calculate the dimensions of the texture

        if (!this.texture) {
            this.texture = createFramebuffer({ format: FLOAT, width: dimensions.width * this.charsetCols, height: dimensions.height * this.charsetRows });
        } else {
            this.texture.resize(dimensions.width * this.charsetCols, dimensions.height * this.charsetRows);
        }

        this.texture.begin();

        clear();
        textFont(this.font);
        fill(255);
        textSize(fontSize);
        textAlign(LEFT, TOP);
        noStroke();

        for (let i = 0; i < this.characters.length; i++) {
            const col = i % this.charsetCols;
            const row = Math.floor(i / this.charsetCols);
            const x = dimensions.width * col;
            const y = dimensions.height * row;

            const character = this.characters[i];
            text(character, x - ((dimensions.width * this.charsetCols) / 2), y - ((dimensions.height * this.charsetRows) / 2));
        }

        this.texture.end();
    }
}

class P5AsciifyGrid {
    constructor({ cellWidth, cellHeight }) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }

    reset() {
        let [cols, rows] = this._calculateGridCellDimensions();
        this.cols = cols;
        this.rows = rows;

        this._resizeGrid();
    }

    _resizeGrid() {
        this.width = this.cols * this.cellWidth;
        this.height = this.rows * this.cellHeight;

        this.offsetX = Math.floor((width - this.width) / 2);
        this.offsetY = Math.floor((height - this.height) / 2);
    }

    _calculateGridCellDimensions() {
        const cellsX = Math.floor(width / this.cellWidth);
        const cellsY = Math.floor(height / this.cellHeight);
        return [cellsX, cellsY];
    }

    resizeCellDimensions(newCellWidth, newCellHeight) {
        this.cellWidth = newCellWidth;
        this.cellHeight = newCellHeight;

        this.reset();
    }
}

class P5AsciifyUtils {

    static hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    static rgbToShaderColor(color) {
        return [color[0] / 255, color[1] / 255, color[2] / 255];
    }

    static hexToShaderColor(hex) {
        return this.rgbToShaderColor(this.hexToRgb(hex));
    }

    static compareVersions(v1, v2) {
        const [v1Parts, v2Parts] = [v1, v2].map(v => v.split('.').map(Number));

        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            const [v1Part, v2Part] = [v1Parts[i] ?? 0, v2Parts[i] ?? 0];
            if (v1Part !== v2Part) return v1Part > v2Part ? 1 : -1;
        }

        return 0;
    }

    static deepMerge(target, source) {
        const result = { ...target };

        for (const key of Object.keys(source)) {
            if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key]) && key in target && typeof target[key] === 'object' && !Array.isArray(target[key])) {
                result[key] = this.deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }

        return result;
    }
}

class P5Asciify {
    static config = {
        common: {
            fontSize: 16,
        },
        brightness: {
            enabled: true,
            characters: "0123456789",
            characterColor: [1.0, 1.0, 1.0],
            characterColorMode: 0,
            backgroundColor: [0.0, 0.0, 0.0],
            backgroundColorMode: 1,
            invertMode: false,
            rotationAngle: 0,
        },
        edge: {
            enabled: false,
            characters: "-/|\\-/|\\",
            characterColor: [1.0, 1.0, 1.0],
            characterColorMode: 0,
            backgroundColor: [0.0, 0.0, 0.0],
            backgroundColorMode: 1,
            invertMode: false,
            sobelThreshold: 0.5,
            sampleThreshold: 16,
            rotationAngle: 0,
        }
    };

    static preEffectSetupQueue = [];
    static preEffectManager = new P5AsciifyEffectManager();

    static afterEffectSetupQueue = [];
    static afterEffectManager = new P5AsciifyEffectManager();

    static colorPalette = new P5AsciifyColorPalette();

    static preEffectFramebuffer = null;
    static postEffectFramebuffer = null;

    static asciiShader = null;
    static asciiFramebuffer = null;
    static asciiFramebufferDimensions = { width: 0, height: 0 };

    static sobelShader = null;
    static sobelFramebuffer = null;

    static sampleShader = null;
    static sampleFramebuffer = null;

    static font = null;
    static brightnessCharacterSet = new P5AsciifyCharacterSet({ characters: "", fontSize: 16 });
    static edgeCharacterSet = new P5AsciifyCharacterSet({ characters: "", fontSize: 16 });
    static grid = new P5AsciifyGrid({ cellWidth: 0, cellHeight: 0 });

    static setup() {
        this.brightnessCharacterSet.setup({ font: this.font, characters: this.config.brightness.characters, fontSize: this.config.common.fontSize });
        this.edgeCharacterSet.setup({ font: this.font, characters: this.config.edge.characters, fontSize: this.config.common.fontSize });
        this.grid.resizeCellDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);

        this.colorPalette.setup();

        this.preEffectManager.setup(this.colorPalette);
        this.afterEffectManager.setup(this.colorPalette);

        this.preEffectFramebuffer = createFramebuffer({ format: FLOAT });
        this.postEffectFramebuffer = createFramebuffer({ format: FLOAT });

        this.asciiShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.ASCII_FRAG_SHADER_CODE);
        this.asciiFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sobelShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.SOBEL_FRAG_SHADER_CODE);
        this.sobelFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sampleShader = createShader(P5AsciifyConstants.VERT_SHADER_CODE, P5AsciifyConstants.SAMPLE_FRAG_SHADER_CODE);
        this.sampleFramebuffer = createFramebuffer({ format: this.FLOAT, width: this.grid.cols, height: this.grid.rows });

        this.asciiFramebufferDimensions = { width: this.asciiFramebuffer.width, height: this.asciiFramebuffer.height };

        pixelDensity(1);
    }

    static checkFramebufferDimensions() {
        if (this.asciiFramebufferDimensions.width !== this.asciiFramebuffer.width || this.asciiFramebufferDimensions.height !== this.asciiFramebuffer.height) {
            this.asciiFramebufferDimensions.width = this.asciiFramebuffer.width;
            this.asciiFramebufferDimensions.height = this.asciiFramebuffer.height;

            this.grid.reset();
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }
    }

    static asciify() {
        this.preEffectFramebuffer.begin();
        clear();
        image(_renderer, -width / 2, -height / 2);
        this.preEffectFramebuffer.end();

        for (const effect of this.preEffectManager._effects) {
            if (effect.enabled) {
                this.preEffectFramebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.preEffectFramebuffer);
                rect(0, 0, width, height);
                this.preEffectFramebuffer.end();
            }
        }

        if (this.config.brightness.enabled) {
            this.asciiFramebuffer.begin();
            shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.brightnessCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.brightnessCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.brightnessCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.brightnessCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.config.brightness.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.config.brightness.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.config.brightness.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.config.brightness.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.config.brightness.invertMode);
            this.asciiShader.setUniform('u_renderMode', 0);
            this.asciiShader.setUniform('u_brightnessEnabled', this.config.brightness.enabled);
            this.asciiShader.setUniform('u_rotationAngle', radians(this.config.brightness.rotationAngle));
            rect(0, 0, width, height);
            this.asciiFramebuffer.end();
        }

        if (this.config.edge.enabled) {
            this.sobelFramebuffer.begin();
            shader(this.sobelShader);
            this.sobelShader.setUniform('u_texture', this.preEffectFramebuffer);
            this.sobelShader.setUniform('u_textureSize', [width, height]);
            this.sobelShader.setUniform('u_threshold', this.config.edge.sobelThreshold);
            rect(0, 0, width, height);
            this.sobelFramebuffer.end();

            this.sampleFramebuffer.begin();
            shader(this.sampleShader);
            this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
            this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.sampleShader.setUniform('u_threshold', this.config.edge.sampleThreshold);
            rect(0, 0, width, height);
            this.sampleFramebuffer.end();

            this.asciiFramebuffer.begin();
            shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.edgeCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.edgeCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.edgeCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.edgeCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectFramebuffer);
            this.asciiShader.setUniform('u_asciiBrightnessTexture', this.asciiFramebuffer);
            this.asciiShader.setUniform('u_edgesTexture', this.sampleFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.config.edge.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.config.edge.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.config.edge.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.config.edge.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.config.edge.invertMode);
            this.asciiShader.setUniform('u_renderMode', 1);
            this.asciiShader.setUniform('u_brightnessEnabled', this.config.brightness.enabled);
            this.asciiShader.setUniform('u_rotationAngle', radians(this.config.edge.rotationAngle));
            rect(0, 0, width, height);
            this.asciiFramebuffer.end();
        }

        this.postEffectFramebuffer.begin();
        clear();
        if (this.config.brightness.enabled || this.config.edge.enabled) {
            image(this.asciiFramebuffer, -width / 2, -height / 2);
        } else {
            image(this.preEffectFramebuffer, -width / 2, -height / 2);
        }
        this.postEffectFramebuffer.end();

        for (const effect of this.afterEffectManager._effects) {
            if (effect.enabled) {
                this.postEffectFramebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.postEffectFramebuffer);
                rect(0, 0, width, height);
                this.postEffectFramebuffer.end();
            }
        }

        clear();
        image(this.postEffectFramebuffer, -width / 2, -height / 2);

        this.checkFramebufferDimensions();
    }

    static setDefaultOptions(options, warn = true) {
        // Define deprecated options
        let deprecated_parent_options = ['fontSize', 'enabled', 'characters', 'characterColor', 'characterColorMode', 'backgroundColor', 'backgroundColorMode', 'invertMode'];

        // Filter out the deprecated options used in the parent dictionary
        let used_deprecated_parent_options = deprecated_parent_options.filter(option => option in options);

        if (used_deprecated_parent_options.length > 0) {
            console.warn(`Warning: Deprecated options detected (${used_deprecated_parent_options.join(', ')}). Refer to the documentation for updated options. In v0.1.0, these options will be removed.`);

            // Move 'fontSize' to 'common' if it exists
            if ('fontSize' in options) {
                options.common = { fontSize: options.fontSize };
                delete options.fontSize;
            }

            // Move remaining options to 'brightnessAsciiShader'
            options.brightness = Object.assign({}, options);

            if (options.characterColor) {
                options.characterColor = P5AsciifyUtils.hexToShaderColor(options.characterColor);
            }
            if (options.backgroundColor) {
                options.backgroundColor = P5AsciifyUtils.hexToShaderColor(options.backgroundColor);
            }

            // Remove deprecated options from the root level
            deprecated_parent_options.forEach(option => delete options[option]);
        }

        if (warn) {
            console.warn(`'P5Asciify.setDefaultOptions()' is deprecated. Use 'setAsciiOptions()' instead. P5Asciify.setDefaultOptions() will be removed in v0.1.0.`);
        }

        let brightnessCharactersUpdated = options.brightness && options.brightness.characters && options.brightness.characters !== this.config.brightness.characters;
        let edgeCharactersUpdated = options.edge && options.edge.characters && options.edge.characters !== this.config.edge.characters;
        let fontSizeUpdated = options.common && options.common.fontSize && options.common.fontSize !== this.config.common.fontSize;

        if (options.brightness) {
            if (options.brightness.characterColor) {
                options.brightness.characterColor = P5AsciifyUtils.hexToShaderColor(options.brightness.characterColor);
            }
            if (options.brightness.backgroundColor) {
                options.brightness.backgroundColor = P5AsciifyUtils.hexToShaderColor(options.brightness.backgroundColor);
            }
        }

        if (options.edge) {
            if (options.edge.characterColor) {
                options.edge.characterColor = P5AsciifyUtils.hexToShaderColor(options.edge.characterColor);
            }

            if (options.edge.backgroundColor) {
                options.edge.backgroundColor = P5AsciifyUtils.hexToShaderColor(options.edge.backgroundColor);
            }
        }

        const newConfig = P5AsciifyUtils.deepMerge({ ...this.config }, options);
        if (fontSizeUpdated && (options.common.fontSize > 512 || options.common.fontSize < 1)) {
            console.warn(`P5Asciify: Font size ${options.common.fontSize} is out of bounds. It should be between 1 and 512. Font size not updated.`);
            fontSizeUpdated = false;
            newConfig.common.fontSize = this.config.common.fontSize;
        }

        // If the edge characters contain more or less than 8 characters, do not update the character set

        if (edgeCharactersUpdated && options.edge.characters.length !== 8) {
            console.warn(`P5Asciify: The edge character set must contain exactly 8 characters. Character set not updated.`);
            edgeCharactersUpdated = false;
            newConfig.edge.characters = this.config.edge.characters;
        }

        if (frameCount == 0) { // If we are still in setup(), the characterset and grid have not been initialized yet
            this.config = newConfig;
            return;
        }

        if (brightnessCharactersUpdated) {
            const badCharacters = this.brightnessCharacterSet.getUnsupportedCharacters(options.brightness.characters);
            if (badCharacters.length === 0) {
                newConfig.brightness.characters = options.brightness.characters;
                this.brightnessCharacterSet.setCharacterSet(options.brightness.characters);
            } else {
                console.warn(`P5Asciify: The following brightness characters are not supported by the current font: [${Array.from(badCharacters).join(', ')}]. Character set not updated.`);
            }
        }

        if (edgeCharactersUpdated) {
            const badCharacters = this.edgeCharacterSet.getUnsupportedCharacters(options.edge.characters);
            if (badCharacters.length === 0) {
                newConfig.edge.characters = options.edge.characters;
                this.edgeCharacterSet.setCharacterSet(options.edge.characters);
            } else {
                console.warn(`P5Asciify: The following edge characters are not supported by the current font: [${Array.from(badCharacters).join(', ')}]. Character set not updated.`);
            }
        }

        this.config = newConfig;

        if (fontSizeUpdated) {
            this.brightnessCharacterSet.setFontSize(this.config.common.fontSize);
            this.edgeCharacterSet.setFontSize(this.config.common.fontSize);
            this.grid.resizeCellDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }
    }
}

window.P5Asciify = P5Asciify;

window.preload = function () { }; // In case the user doesn't define a preload function, we need to define it here to avoid errors

/**
 * Preloads the default ASCII font for P5Asciify.
 * This function is registered as a method to be called before the preload phase of p5.js.
 */
p5.prototype.preloadAsciiFont = function () {
    this._incrementPreload();
    this.loadFont(
        P5AsciifyConstants.URSAFONT_BASE64,
        (loadedFont) => {
            P5Asciify.font = loadedFont;
        },
        () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
    );
};
p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);

/**
 * Loads an ASCII font and sets it as the current font for P5Asciify.
 * @param {string|object} font - The path to the ASCII font file or a font object.
 */
p5.prototype.loadAsciiFont = function (font) {
    const setFont = (loadedFont) => {
        P5Asciify.font = loadedFont;
        this._decrementPreload();
        if (this.frameCount > 0) {
            P5Asciify.brightnessCharacterSet.setFontObject(loadedFont);
            P5Asciify.edgeCharacterSet.setFontObject(loadedFont);
            P5Asciify.grid.resizeCellDimensions(
                P5Asciify.brightnessCharacterSet.maxGlyphDimensions.width,
                P5Asciify.brightnessCharacterSet.maxGlyphDimensions.height
            );
        }
    };

    if (typeof font === 'string') {
        this.loadFont(
            font,
            (loadedFont) => { setFont(loadedFont); },
            () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
        );
    } else if (typeof font === 'object') {
        setFont(font);
    } else {
        throw new P5AsciifyError(`loadAsciiFont() | Invalid font parameter. Expected a string or an object.`);
    }
};

p5.prototype.registerPreloadMethod('loadAsciiFont', p5.prototype);

/**
 * Sets up the P5Asciify renderer and checks for compatibility.
 * This function is registered as a method to be called after the setup phase of p5.js.
 */
p5.prototype.setupAsciifier = function () {
    if (this._renderer.drawingContext instanceof CanvasRenderingContext2D) {
        throw new P5AsciifyError("WebGL renderer is required for p5.asciify to work.");
    }

    if (P5AsciifyUtils.compareVersions(this.VERSION, "1.8.0") < 0) {
        throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to work.");
    }

    P5Asciify.setup();
};
p5.prototype.registerMethod("afterSetup", p5.prototype.setupAsciifier);

/**
 * Updates the current ASCII font used by P5Asciify.
 * @param {string|object} font - The path to the new ASCII font file or a font object.
 */
p5.prototype.updateAsciiFont = function (font) {
    console.warn(`updateAsciiFont() is deprecated. Use loadAsciiFont() instead. updateAsciiFont() will be removed in v0.1.0.`);
    this.loadAsciiFont(font);
};

p5.prototype.setAsciiOptions = function (options) {
    P5Asciify.setDefaultOptions(options, false);
};

p5.prototype.addAsciiEffect = function (effectType, effectName, userParams = {}) {
    if (effectType === 'pre') {
        return P5Asciify.preEffectManager.addEffect(effectName, userParams);
    } else if (effectType === 'post') {
        return P5Asciify.afterEffectManager.addEffect(effectName, userParams);
    } else {
        throw new P5AsciifyError(`Invalid effect type '${effectType}'. Valid types are 'pre' and 'after'.`);
    }
};

p5.prototype.removeAsciiEffect = function (effectInstance) {
    let removed = false;

    // Check preEffectManager
    if (P5Asciify.preEffectManager.hasEffect(effectInstance)) {
        P5Asciify.preEffectManager.removeEffect(effectInstance);
        removed = true;
    }

    // Check afterEffectManager
    if (P5Asciify.afterEffectManager.hasEffect(effectInstance)) {
        P5Asciify.afterEffectManager.removeEffect(effectInstance);
        removed = true;
    }

    if (!removed) {
        throw new P5AsciifyError(`Effect instance not found in either pre or post effect managers.`);
    }
};

p5.prototype.swapAsciiEffects = function (effectInstance1, effectInstance2) {
    let manager1 = null;
    let manager2 = null;
    let index1 = -1;
    let index2 = -1;

    // Determine the manager and index for effectInstance1
    if (P5Asciify.preEffectManager.hasEffect(effectInstance1)) {
        manager1 = P5Asciify.preEffectManager;
        index1 = manager1.getEffectIndex(effectInstance1);
    } else if (P5Asciify.afterEffectManager.hasEffect(effectInstance1)) {
        manager1 = P5Asciify.afterEffectManager;
        index1 = manager1.getEffectIndex(effectInstance1);
    } else {
        throw new P5AsciifyError(`Effect instance 1 not found in either pre or post effect managers.`);
    }

    // Determine the manager and index for effectInstance2
    if (P5Asciify.preEffectManager.hasEffect(effectInstance2)) {
        manager2 = P5Asciify.preEffectManager;
        index2 = manager2.getEffectIndex(effectInstance2);
    } else if (P5Asciify.afterEffectManager.hasEffect(effectInstance2)) {
        manager2 = P5Asciify.afterEffectManager;
        index2 = manager2.getEffectIndex(effectInstance2);
    } else {
        throw new P5AsciifyError(`Effect instance 2 not found in either pre or post effect managers.`);
    }

    // Swap the effects
    if (manager1 !== manager2) {
        manager1.removeEffect(effectInstance1);
        manager2.removeEffect(effectInstance2);

        manager1.addExistingEffectAtIndex(effectInstance2, index1);
        manager2.addExistingEffectAtIndex(effectInstance1, index2);
    } else {
        manager1.swapEffects(effectInstance1, effectInstance2);
    }
};


p5.prototype.preDrawAddPush = function () { this.push(); };
p5.prototype.registerMethod("pre", p5.prototype.preDrawAddPush);

p5.prototype.postDrawAddPop = function () { this.pop(); };
p5.prototype.registerMethod("post", p5.prototype.postDrawAddPop);

/**
 * Renders the ASCII representation of the current sketch.
 * This function is registered as a method to be called after the draw phase of p5.js.
 */
p5.prototype.asciify = function () { P5Asciify.asciify(); };
p5.prototype.registerMethod("post", p5.prototype.asciify);
