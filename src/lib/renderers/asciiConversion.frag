precision mediump float;

// Uniforms
uniform sampler2D u_characterTexture;
uniform vec2 u_charsetDimensions;

uniform sampler2D u_primaryColorTexture;
uniform sampler2D u_secondaryColorTexture;
uniform sampler2D u_inversionTexture;
uniform sampler2D u_asciiCharacterTexture;
uniform sampler2D u_rotationTexture;
uniform sampler2D u_flipTexture;

uniform vec2 u_gridCellDimensions;
uniform vec2 u_gridPixelDimensions;

uniform float u_pixelRatio; // Added uniform for pixel ratio

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
    vec2 adjustedCoord = (logicalFragCoord) / u_gridPixelDimensions;

    // Calculate the grid coordinate
    vec2 gridCoord = adjustedCoord * u_gridCellDimensions;
    vec2 cellCoord = floor(gridCoord);

    // Texture coordinate for sampling character indices
    vec2 charIndexTexCoord = (cellCoord + vec2(0.5)) / u_gridCellDimensions;

    // Sample primary color (foreground color)
    vec4 primaryColor = texture2D(u_primaryColorTexture, charIndexTexCoord);

    // Sample secondary color (background color)
    vec4 secondaryColor = texture2D(u_secondaryColorTexture, charIndexTexCoord);

    // Sample inversion texture
    vec4 inversionColor = texture2D(u_inversionTexture, charIndexTexCoord);
    bool isInverted = inversionColor == vec4(1.0);

    // Sample the character index from the ASCII character texture
    vec4 encodedIndexVec = texture2D(u_asciiCharacterTexture, charIndexTexCoord);

    if(encodedIndexVec.r < 0.01 && encodedIndexVec.g < 0.01) {
        gl_FragColor = vec4(0.0);
        return;
    }

    // Decode the bestCharIndex from red and green channels
    int charIndex = int(encodedIndexVec.r * 255.0 + 0.5) + int(encodedIndexVec.g * 255.0 + 0.5) * 256;

    // Calculate the column and row of the character in the charset texture
    int charCol = charIndex - (charIndex / int(u_charsetDimensions.x)) * int(u_charsetDimensions.x);
    int charRow = charIndex / int(u_charsetDimensions.x);

    // Calculate the texture coordinate of the character in the charset texture
    vec2 charCoord = vec2(float(charCol) / u_charsetDimensions.x, float(charRow) / u_charsetDimensions.y);

    // Sample rotation texture and decode angle
    vec4 rotationColor = texture2D(u_rotationTexture, charIndexTexCoord);

    // Direct mapping: red = base degrees (0-255)
    // green = additional degrees (0-105)
    float degrees = rotationColor.r * 255.0 + rotationColor.g * 255.0;
    float rotationAngle = radians(degrees);

    // Sample flip texture to get horizontal and vertical flip values
    vec4 flipColor = texture2D(u_flipTexture, charIndexTexCoord);
    bool flipHorizontal = flipColor.r > 0.5;
    bool flipVertical = flipColor.g > 0.5;

    // Calculate fractional part and apply rotation
    vec2 fractionalPart = fract(gridCoord) - 0.5;
    
    // Apply horizontal and vertical flipping before rotation
    if (flipHorizontal) {
        fractionalPart.x = -fractionalPart.x;
    }
    if (flipVertical) {
        fractionalPart.y = -fractionalPart.y;
    }
    
    // Apply rotation after flipping
    fractionalPart = rotate2D(rotationAngle) * fractionalPart;
    fractionalPart += 0.5;

    // Calculate the texture coordinates
    vec2 cellMin = charCoord;
    vec2 cellMax = charCoord + vec2(1.0 / u_charsetDimensions.x, 1.0 / u_charsetDimensions.y);
    vec2 texCoord = charCoord + fractionalPart * vec2(1.0 / u_charsetDimensions.x, 1.0 / u_charsetDimensions.y);

    // Determine if the texture coordinate is within the cell boundaries
    bool outsideBounds = any(lessThan(texCoord, cellMin)) || any(greaterThan(texCoord, cellMax));
    
    if (outsideBounds) {
        // For out-of-bounds pixels, use the appropriate color based on inversion mode
        gl_FragColor = isInverted ? primaryColor : secondaryColor;
        return;
    }
    
    // Sample the character texture
    vec4 charTexel = texture2D(u_characterTexture, texCoord);
    
    // Check if pixel is fully white (considering minor precision issues)
    bool isFullyWhite = all(greaterThanEqual(charTexel.rgb, vec3(0.99)));
    
    // Handle normal and inverted modes
    if (isInverted) {
        // In inverted mode, non-white pixels get primary color, white pixels get secondary color
        gl_FragColor = isFullyWhite ? secondaryColor : primaryColor;
    } else {
        // In normal mode, white pixels get primary color, non-white pixels get secondary color
        gl_FragColor = isFullyWhite ? primaryColor : secondaryColor;
    }
}