precision mediump float;

uniform sampler2D u_sketchTexture;
uniform sampler2D u_previousAsciiCharacterTexture;
uniform vec2 u_gridCellDimensions; // Number of cells (columns, rows)
uniform int u_totalChars;

void main() {
    // Get the cell coordinate (integer)
    vec2 cellCoord = floor(gl_FragCoord.xy);

    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;

    // Compute the center coordinate of the cell in texture coordinates
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;

    if(texture2D(u_sketchTexture, cellCenterTexCoord) == vec4(vec3(0.0), 1.0)) {
        gl_FragColor = texture2D(u_previousAsciiCharacterTexture, cellCenterTexCoord);
        return;
    }

    // Sample the sketch texture at the center of the cell
    vec4 sketchColor = texture2D(u_sketchTexture, cellCenterTexCoord);

    // Compute brightness
    float brightness = dot(sketchColor.rgb, vec3(0.299, 0.587, 0.114));

    // Map brightness to character index
    int charIndex = int(brightness * float(u_totalChars));

    // Clamp the character index to valid range
    if(charIndex > u_totalChars - 1) {
        charIndex = u_totalChars - 1;
    }

    // Encode the character index into color channels
    float lowerByte = mod(float(charIndex), 256.0);
    float upperByte = floor(float(charIndex) / 256.0);

    float encodedR = lowerByte / 255.0;
    float encodedG = upperByte / 255.0;

    gl_FragColor = vec4(encodedR, encodedG, 0.0, 1.0);
}
