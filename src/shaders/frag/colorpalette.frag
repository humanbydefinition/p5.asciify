precision mediump float;

uniform sampler2D u_image; // Original image
uniform sampler2D u_colorPalette; // Color palette image
uniform vec2 u_colorPaletteDimensions; // Dimensions of the color palette texture
uniform int u_colorPaletteRow; // Row index for the color palette texture
uniform float u_colorPaletteLength; // Number of colors in the gradient (length of the texture row)
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec4 texColor = texture2D(u_image, uv); // Color of the current fragment in the original image

    // Convert the original image color to grayscale
    float gray = (texColor.r + texColor.g + texColor.b) / 3.0;

    // Use the grayscale value as the horizontal coordinate in the color palette texture
    float paletteX = gray * (u_colorPaletteLength - 1.0);
    float paletteTexelPosition = (floor(paletteX) + 0.5) / u_colorPaletteDimensions.x;

    // Calculate the correct row position for the color palette texture
    float rowPosition = float(u_colorPaletteRow) + 0.5; // colorPaletteRow is an integer starting from 0
    float rowTexCoord = rowPosition / u_colorPaletteDimensions.y;

    // Fetch the color from the color palette texture
    vec4 paletteColor = texture2D(u_colorPalette, vec2(paletteTexelPosition, rowTexCoord));

    // Set the fragment color to the color from the palette
    gl_FragColor = paletteColor;
}