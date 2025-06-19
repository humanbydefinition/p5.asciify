precision mediump float;

// Uniforms
uniform sampler2D u_characterTexture;
uniform vec2 u_charsetDimensions;

uniform sampler2D u_primaryColorTexture;
uniform sampler2D u_secondaryColorTexture;
uniform sampler2D u_transformTexture;
uniform sampler2D u_asciiCharacterTexture;
uniform sampler2D u_rotationTexture;

uniform sampler2D u_captureTexture;
uniform vec2 u_captureDimensions;
uniform int u_backgroundMode; // 0 for transparent, 1 for sample from capture texture

uniform vec2 u_gridCellDimensions;
uniform vec2 u_gridPixelDimensions;

uniform float u_pixelRatio;

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

    // Sample transform texture for inversion and flips
    vec4 transformColor = texture2D(u_transformTexture, charIndexTexCoord);
    bool isInverted = transformColor.r > 0.5; // Inversion in red channel
    bool flipHorizontal = transformColor.g > 0.5; // Horizontal flip in green channel
    bool flipVertical = transformColor.b > 0.5;   // Vertical flip in blue channel

    // Sample the character index from the ASCII character texture
    vec4 encodedIndexVec = texture2D(u_asciiCharacterTexture, charIndexTexCoord);

    if(encodedIndexVec.a < 0.01) {
        if(u_backgroundMode == 0) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        } else if(u_backgroundMode == 1) {
            vec2 captureTexCoord = logicalFragCoord / u_captureDimensions;
            gl_FragColor = texture2D(u_captureTexture, captureTexCoord);
        }
        return;
    }

    // Decode the bestCharIndex from red and green channels
    int charIndex = int(encodedIndexVec.r * 255.0 + 0.5) + int(encodedIndexVec.g * 255.0 + 0.5) * 256;

    // Calculate the column and row of the character in the charset texture
    int charCol = charIndex - (charIndex / int(u_charsetDimensions.x)) * int(u_charsetDimensions.x);
    int charRow = charIndex / int(u_charsetDimensions.x);

    // Calculate the texture coordinate of the character in the charset texture
    vec2 charCoord = vec2(float(charCol) / u_charsetDimensions.x, float(charRow) / u_charsetDimensions.y);

    // Sample rotation texture and decode angle with two-channel precision
    vec4 rotationColor = texture2D(u_rotationTexture, charIndexTexCoord);
    
    // Decode using two-channel precision
    // Red channel: integer part of (angle * 255 / 360)
    // Green channel: fractional part scaled to 0-255
    float redValue = rotationColor.r * 255.0;
    float greenValue = rotationColor.g * 255.0;
    
    // Reconstruct the scaled angle
    float scaledAngle = redValue + (greenValue / 255.0);
    
    // Convert back to degrees
    float angleDegrees = (scaledAngle * 360.0) / 255.0;
    
    // Convert to radians for rotation matrix
    float rotationAngle = angleDegrees * 3.14159265359 / 180.0;

    // Calculate fractional part and apply rotation
    vec2 fractionalPart = fract(gridCoord) - 0.5;

    // Apply horizontal and vertical flipping before rotation
    if(flipHorizontal) {
        fractionalPart.x = -fractionalPart.x;
    }
    if(flipVertical) {
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

    if(outsideBounds) {
        // For out-of-bounds pixels, use the appropriate color based on inversion mode
        gl_FragColor = isInverted ? primaryColor : secondaryColor;
        return;
    }

    // Sample the character texture
    vec4 charTexel = texture2D(u_characterTexture, texCoord);

    // Apply inversion using mix
    float inv = isInverted ? 1.0 : 0.0;
    charTexel.rgb = mix(charTexel.rgb, 1.0 - charTexel.rgb, inv);

    // Use mix to blend between background and foreground based on character color
    gl_FragColor = mix(secondaryColor, primaryColor, charTexel);
}