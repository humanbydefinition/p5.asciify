precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 2D texture for gradient colors
uniform int frameCount;
uniform float u_gradientDirection; // Direction for the gradient shift (+1 for up, -1 for down)
uniform float u_speed; // Control the speed of the gradient movement
uniform float u_angle; // Angle in degrees for the gradient
uniform vec2 gradientTextureDimensions; // Dimensions of the gradient texture
uniform vec2 u_brightnessRange; // Range of brightness values

void main() {
    vec4 texColor = texture2D(textureID, v_texCoord);
    vec4 originalTexColor = texture2D(originalTextureID, v_texCoord);

    // Check if the grayscale value is within the specified brightness range and if the pixel hasn't been modified yet
    if(texColor.r >= u_brightnessRange[0] && texColor.r <= u_brightnessRange[1] && texColor == originalTexColor) {

        float positionX = gl_FragCoord.x * cos(u_angle) - gl_FragCoord.y * sin(u_angle);
        float positionY = gl_FragCoord.x * sin(u_angle) + gl_FragCoord.y * cos(u_angle);

        // Determine direction based on zigzag pattern
        float rowIndex = floor(positionY);
        float direction = mod(rowIndex, 2.0) == 0.0 ? 1.0 : -1.0;

        // Calculate the position within the row
        float rowPosition = positionX;

        // Adjust index calculation to incorporate speed and zigzag pattern
        float index = mod(rowPosition + float(frameCount) * u_speed * direction * u_gradientDirection, gradientTextureDimensions.x);
        index = floor(index);

        float texelPosition = (index + 0.5) / gradientTextureDimensions.x;

        // Fetch the gradient color based on the calculated index
        vec4 gradientColor = texture2D(gradientTexture, vec2(texelPosition, 0));
        gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
        gl_FragColor = texColor;
    }
}