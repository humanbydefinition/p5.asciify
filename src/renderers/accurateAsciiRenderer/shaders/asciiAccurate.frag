// Rendering Shader

precision highp float;

// Uniforms for character texture and its grid dimensions
uniform sampler2D u_characterTexture;
uniform float u_charsetCols;
uniform float u_charsetRows;

// Uniforms for primary and secondary color textures
uniform sampler2D u_primaryColorTexture;
uniform sampler2D u_secondaryColorTexture;

// Character index texture from the first shader
uniform sampler2D u_charIndexTexture;

// Simulation texture and grid configurations
uniform vec2 u_gridOffsetDimensions; // Should be zero unless there's an offset
uniform vec2 u_gridPixelDimensions;  // Size of the grid in pixels
uniform vec2 u_gridCellDimensions;   // Number of cells in the grid (columns, rows)

// Color and mode uniforms
uniform vec3 u_characterColor;
uniform int u_characterColorMode;
uniform vec3 u_backgroundColor;
uniform int u_backgroundColorMode;
uniform int u_invertMode;

void main() {
    // Map fragment coordinates to adjusted coordinates (relative to grid)
    vec2 adjustedCoord = (gl_FragCoord.xy - u_gridOffsetDimensions) / u_gridPixelDimensions;

    if(adjustedCoord.x < 0.0 || adjustedCoord.x > 1.0 || adjustedCoord.y < 0.0 || adjustedCoord.y > 1.0) {
        //vec4 bgColor = (u_backgroundColorMode == 0) ? texture2D(u_secondaryColorTexture, adjustedCoord) : vec4(u_backgroundColor, 1.0);
        gl_FragColor = vec4(u_backgroundColor, 1.0);
        return;
    }

    // Calculate grid coordinates
    vec2 gridCoord = adjustedCoord * u_gridCellDimensions;
    vec2 cellCoord = floor(gridCoord);

    // Compute the texture coordinate to sample the character index
    vec2 charIndexTexCoord = (cellCoord + vec2(0.5)) / u_gridCellDimensions;
    vec2 encodedIndexVec = texture2D(u_charIndexTexture, charIndexTexCoord).rg;

    // Decode the bestCharIndex from red and green channels
    int bestCharIndex = int(encodedIndexVec.r * 255.0 + 0.5) + int(encodedIndexVec.g * 255.0 + 0.5) * 256;

    // Compute character row and column
    int bestCharRow = bestCharIndex / int(u_charsetCols);
    int bestCharCol = bestCharIndex - int(u_charsetCols) * bestCharRow;
    vec2 bestCharBaseCoord = vec2(float(bestCharCol) / u_charsetCols, float(bestCharRow) / u_charsetRows);
    vec2 bestCharSize = vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);

    // Compute texture coordinate within the character
    vec2 texCoord = bestCharBaseCoord + fract(gridCoord) * bestCharSize;
    vec4 charColor = texture2D(u_characterTexture, texCoord);

    if(u_invertMode == 1) {
        charColor.rgb = vec3(1.0) - charColor.rgb;
        charColor.a = 1.0 - charColor.a;
    }

    vec2 primaryTexCoord = (cellCoord + vec2(0.5)) / u_gridCellDimensions;
    vec4 primaryColor = texture2D(u_primaryColorTexture, primaryTexCoord);
    vec4 secondaryColor = texture2D(u_secondaryColorTexture, primaryTexCoord);

    vec4 finalColor = (u_characterColorMode == 0) ? vec4(primaryColor.rgb * charColor.rgb, charColor.a) : vec4(u_characterColor * charColor.rgb, charColor.a);

    vec4 backgroundColorFinal = (u_backgroundColorMode == 0) ? secondaryColor : vec4(u_backgroundColor, 1.0);
    gl_FragColor = mix(backgroundColorFinal, finalColor, charColor.a);
}
