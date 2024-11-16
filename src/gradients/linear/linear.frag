precision highp float;

varying vec2 v_texCoord;

uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 2D texture for gradient colors
uniform int frameCount;
uniform float gradientTextureLength; // Number of colors in the current row of the gradient
uniform float u_gradientDirection; // Direction for the gradient shift (+1 for up, -1 for down)
uniform float u_speed; // Control the speed of the gradient movement
uniform float u_angle; // Angle in degrees for the gradient
uniform int gradientTextureRow; // Index of the row in the 2D gradient texture to use
uniform vec2 gradientTextureDimensions; // Dimensions of the gradient texture
uniform vec2 u_brightnessRange; // Range of brightness values

void main() {
    vec4 texColor = texture2D(textureID, v_texCoord);
    vec4 originalTexColor = texture2D(originalTextureID, v_texCoord);

    // Check if the grayscale value is within the specified brightness range and if the pixel hasn't been modified yet
    if(texColor.r >= u_brightnessRange[0] && texColor.r <= u_brightnessRange[1] && texColor == originalTexColor) {

        float position = gl_FragCoord.x * cos(u_angle) + gl_FragCoord.y * sin(u_angle);
        float index = mod(position + float(frameCount) * u_gradientDirection * u_speed, gradientTextureLength);
        index = floor(index);
        float texelPosition = (index + 0.5) / gradientTextureDimensions.x;

        // Calculate the correct row position for the gradient texture
        float rowPosition = float(gradientTextureRow) + 0.5; // rowIndex is an integer starting from 0
        float rowTexCoord = rowPosition / gradientTextureDimensions.y;

        vec4 gradientColor = texture2D(gradientTexture, vec2(texelPosition, rowTexCoord));
        gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
        gl_FragColor = texColor;
    }
}