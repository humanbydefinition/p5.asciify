/**
 * Constants for the P5Asciify library.
 */
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

export default P5AsciifyConstants;