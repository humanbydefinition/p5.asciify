precision mediump float;

// Uniforms
uniform sampler2D u_characterTexture;
uniform vec2 u_charsetDimensions;

uniform sampler2D u_primaryColorTexture;
uniform sampler2D u_secondaryColorTexture;
uniform sampler2D u_asciiCharacterTexture;

uniform vec2 u_gridCellDimensions;
uniform vec2 u_gridPixelDimensions;
uniform vec2 u_gridOffsetDimensions;

uniform float u_rotationAngle;

uniform int u_invertMode;

uniform vec2 u_resolution;
uniform float u_pixelRatio; // Added uniform for pixel ratio

uniform sampler2D u_prevAsciiTexture;
uniform sampler2D u_gradientReferenceTexture;

uniform int u_layer;

// Function to rotate coordinates
mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = gl_FragCoord.xy / u_pixelRatio;

    // Adjusted coordinate in logical pixel space
    vec2 adjustedCoord = (logicalFragCoord - u_gridOffsetDimensions) / u_gridPixelDimensions;

    // Calculate the grid coordinate
    vec2 gridCoord = adjustedCoord * u_gridCellDimensions;
    vec2 cellCoord = floor(gridCoord);

    // Texture coordinate for sampling character indices
    vec2 charIndexTexCoord = (cellCoord + vec2(0.5)) / u_gridCellDimensions;

    // Sample secondary color (background color)
    vec4 secondaryColor = texture2D(u_secondaryColorTexture, charIndexTexCoord);

    // Check if the adjusted coordinate is outside the valid range
    if(adjustedCoord.x < 0.0 || adjustedCoord.x > 1.0 || adjustedCoord.y < 0.0 || adjustedCoord.y > 1.0) {
        gl_FragColor = vec4(0);
        return;
    }

    // Sample primary color (foreground color)
    vec4 primaryColor = texture2D(u_primaryColorTexture, charIndexTexCoord);

    if(u_layer == 2) {
        // asciiGradient.frag logic
        vec4 encodedIndexVec = texture2D(u_asciiCharacterTexture, charIndexTexCoord);
        vec4 gradientReferenceColor = texture2D(u_gradientReferenceTexture, charIndexTexCoord);

        if(encodedIndexVec.rgb == gradientReferenceColor.rgb) {
            gl_FragColor = texture2D(u_prevAsciiTexture, logicalFragCoord / u_resolution);
            return;
        }
    } else if(u_layer == 4) {
        // asciiCustom.frag logic
        vec4 encodedIndexVec = texture2D(u_asciiCharacterTexture, charIndexTexCoord);

        if(encodedIndexVec.rgba == vec4(0.0)) {
            gl_FragColor = texture2D(u_prevAsciiTexture, logicalFragCoord / u_resolution);
            return;
        }
    }

    // Sample the character index from the ASCII character texture
    vec4 encodedIndexVec = texture2D(u_asciiCharacterTexture, charIndexTexCoord);

    // Decode the bestCharIndex from red and green channels
    int charIndex = int(encodedIndexVec.r * 255.0 + 0.5) + int(encodedIndexVec.g * 255.0 + 0.5) * 256;

        // Calculate the column and row of the character in the charset texture
    int charCol = charIndex - (charIndex / int(u_charsetDimensions.x)) * int(u_charsetDimensions.x);
    int charRow = charIndex / int(u_charsetDimensions.x);

    // Calculate the texture coordinate of the character in the charset texture
    vec2 charCoord = vec2(float(charCol) / u_charsetDimensions.x, float(charRow) / u_charsetDimensions.y);

    // Calculate fractional part and apply rotation
    vec2 fractionalPart = fract(gridCoord) - 0.5; // Center fractional part around (0,0) for rotation
    fractionalPart = rotate2D(u_rotationAngle) * fractionalPart; // Rotate fractional part
    fractionalPart += 0.5; // Move back to original coordinate space

    // Calculate the texture coordinates
    vec2 cellMin = charCoord;
    vec2 cellMax = charCoord + vec2(1.0 / u_charsetDimensions.x, 1.0 / u_charsetDimensions.y);
    vec2 texCoord = charCoord + fractionalPart * vec2(1.0 / u_charsetDimensions.x, 1.0 / u_charsetDimensions.y);

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

    // Mix the final color with the secondary color based on the alpha value
    gl_FragColor = mix(secondaryColor, finalColor, charColor.a);

    // Override final color with background color for out-of-bounds areas due to rotation
    if(outsideBounds) {
        gl_FragColor = u_invertMode == 1 ? primaryColor : secondaryColor;
    }
}
