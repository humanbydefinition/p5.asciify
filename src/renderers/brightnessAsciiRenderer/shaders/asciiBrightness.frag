precision mediump float;

uniform sampler2D u_characterTexture;
uniform float u_charsetCols;
uniform float u_charsetRows;
uniform int u_totalChars;

uniform sampler2D u_sketchTexture;

uniform vec2 u_gridCellDimensions;
uniform vec2 u_gridPixelDimensions;
uniform vec2 u_gridOffsetDimensions;

uniform vec3 u_characterColor;
uniform int u_characterColorMode;
uniform vec3 u_backgroundColor;
uniform int u_backgroundColorMode;

uniform float u_rotationAngle;

uniform int u_invertMode;

mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 adjustedCoord = (gl_FragCoord.xy - u_gridOffsetDimensions) / u_gridPixelDimensions;

    if(adjustedCoord.x < 0.0 || adjustedCoord.x > 1.0 || adjustedCoord.y < 0.0 || adjustedCoord.y > 1.0) {
        gl_FragColor = vec4(u_backgroundColor, 1.0);
        return;
    }

    // Calculate the grid coordinate
    vec2 gridCoord = adjustedCoord * u_gridCellDimensions;
    vec2 cellCoord = floor(gridCoord);
    vec2 centerCoord = cellCoord + vec2(0.5);
    vec2 baseCoord = centerCoord / u_gridCellDimensions;

    vec4 sketchColor; // Simulation color

    sketchColor = texture2D(u_sketchTexture, baseCoord);

    float brightness = dot(sketchColor.rgb, vec3(0.299, 0.587, 0.114));

    // Map the brightness to a character index
    int charIndex = int(brightness * float(u_totalChars));
    if(charIndex > u_totalChars - 1) {
        charIndex = u_totalChars - 1;
    }

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
    vec4 charColor = outsideBounds ? vec4(u_backgroundColor, 1.0) : texture2D(u_characterTexture, texCoord);

    // If the inversion mode is enabled, invert the character color
    if(u_invertMode == 1) {
        charColor.a = 1.0 - charColor.a;
        charColor.rgb = vec3(1.0);
    }

    // Calculate the final color of the character
    vec4 finalColor = (u_characterColorMode == 0) ? vec4(sketchColor.rgb * charColor.rgb, charColor.a) : vec4(u_characterColor * charColor.rgb, charColor.a);

    // If the background color mode is 0, mix the sketch color and the final color based on the character's alpha value
    // Otherwise, mix the background color and the final color based on the character's alpha value
    if(u_backgroundColorMode == 0) {
        gl_FragColor = mix(vec4(sketchColor.rgb, 1.0), finalColor, charColor.a);
    } else {
        gl_FragColor = mix(vec4(u_backgroundColor, 1.0), finalColor, charColor.a);
    }

    // Override final color with background color for out-of-bounds areas due to rotation
    if(outsideBounds) {
        gl_FragColor = (u_backgroundColorMode == 0) ? (u_invertMode == 1 ? (u_characterColorMode == 0 ? vec4(sketchColor.rgb, 1.0) : vec4(u_characterColor, 1.0)) : vec4(sketchColor.rgb, 1.0)) : (u_invertMode == 1 ? (u_characterColorMode == 0 ? vec4(sketchColor.rgb, 1.0) : vec4(u_characterColor, 1.0)) : vec4(u_backgroundColor, 1.0));
    }
}