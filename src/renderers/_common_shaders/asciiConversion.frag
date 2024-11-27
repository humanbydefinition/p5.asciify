precision mediump float;

uniform sampler2D u_characterTexture;
uniform float u_charsetCols;
uniform float u_charsetRows;

uniform sampler2D u_primaryColorTexture;
uniform sampler2D u_secondaryColorTexture;
uniform sampler2D u_asciiCharacterTexture;

uniform vec2 u_gridCellDimensions;
uniform vec2 u_gridPixelDimensions;
uniform vec2 u_gridOffsetDimensions;

uniform float u_rotationAngle;

uniform int u_invertMode;

uniform vec2 u_resolution;

uniform sampler2D u_asciiBrightnessTexture;
uniform sampler2D u_gradientReferenceTexture;
uniform sampler2D u_edgesTexture;

uniform bool u_brightnessEnabled;

uniform int u_layer;

mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 adjustedCoord = (gl_FragCoord.xy - u_gridOffsetDimensions) / u_gridPixelDimensions;

    // Calculate the grid coordinate
    vec2 gridCoord = adjustedCoord * u_gridCellDimensions;
    vec2 cellCoord = floor(gridCoord);

    vec2 charIndexTexCoord = (cellCoord + vec2(0.5)) / u_gridCellDimensions;

    vec4 secondaryColor = texture2D(u_secondaryColorTexture, charIndexTexCoord);

    if(adjustedCoord.x < 0.0 || adjustedCoord.x > 1.0 || adjustedCoord.y < 0.0 || adjustedCoord.y > 1.0) {
        gl_FragColor = secondaryColor;
        return;
    }

    vec4 primaryColor = texture2D(u_primaryColorTexture, charIndexTexCoord);

    if(u_layer == 2) {
        // asciiGradient.frag logic
        vec4 encodedIndexVec = texture2D(u_asciiCharacterTexture, charIndexTexCoord);
        vec4 gradientReferenceColor = texture2D(u_gradientReferenceTexture, charIndexTexCoord);

        if(encodedIndexVec.rgb == gradientReferenceColor.rgb) {
            if(u_brightnessEnabled) {
                gl_FragColor = texture2D(u_asciiBrightnessTexture, gl_FragCoord.xy / u_resolution);
            } else {
                gl_FragColor = secondaryColor;
            }
            return;
        }
    } else if(u_layer == 3) {
        // asciiEdge.frag logic
        vec4 edgeColor = texture2D(u_edgesTexture, charIndexTexCoord);

        if(edgeColor.rgb == vec3(0.0)) {
            if(u_brightnessEnabled) {
                gl_FragColor = texture2D(u_asciiBrightnessTexture, gl_FragCoord.xy / u_resolution);
            } else {
                gl_FragColor = secondaryColor;
            }
            return;
        }
    } 

    vec4 encodedIndexVec = texture2D(u_asciiCharacterTexture, charIndexTexCoord);

        // Decode the bestCharIndex from red and green channels
    int charIndex = int(encodedIndexVec.r * 255.0 + 0.5) + int(encodedIndexVec.g * 255.0 + 0.5) * 256;

        // Calculate the column and row of the character in the charset texture
    int charCol = charIndex - (charIndex / int(u_charsetCols)) * int(u_charsetCols);
    int charRow = charIndex / int(u_charsetCols);

        // Calculate the texture coordinate of the character in the charset texture
    vec2 charCoord = vec2(float(charCol) / u_charsetCols, float(charRow) / u_charsetRows);

    vec2 fractionalPart = fract(gridCoord) - 0.5; // Center fractional part around (0,0) for rotation
    fractionalPart = rotate2D(u_rotationAngle) * fractionalPart; // Rotate fractional part
    fractionalPart += 0.5; // Move back to original coordinate space

        // Calculate the texture coordinates
    vec2 cellMin = charCoord;
    vec2 cellMax = charCoord + vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);
    vec2 texCoord = charCoord + fractionalPart * vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);

        // Determine if the texture coordinate is within the cell boundaries
    bool outsideBounds = any(lessThan(texCoord, cellMin)) || any(greaterThan(texCoord, cellMax));

        // Get the color of the character from the charset texture or use the background color if outside bounds
    vec4 charColor = outsideBounds ? secondaryColor : texture2D(u_characterTexture, texCoord);

        // If the inversion mode is enabled, invert the character color
    if(u_invertMode == 1) {
        charColor.a = 1.0 - charColor.a;
        charColor.rgb = vec3(1.0);
    }

        // Calculate the final color of the character
    vec4 finalColor = vec4(primaryColor.rgb * charColor.rgb, charColor.a);

    gl_FragColor = mix(secondaryColor, finalColor, charColor.a);

        // Override final color with background color for out-of-bounds areas due to rotation
    if(outsideBounds) {
        gl_FragColor = u_invertMode == 1 ? primaryColor : secondaryColor;
    }
}
