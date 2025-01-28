
precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 2D texture for gradient colors
uniform float u_centerX;
uniform float u_centerY;
uniform int frameCount; // Uniform to animate the gradient based on frame count
uniform float u_speed; // Speed of rotation
uniform vec2 gradientTextureDimensions; // Dimensions of the gradient texture
uniform vec2 u_brightnessRange; // Range of brightness values

void main() {
    // Fetch the original texture color
    vec2 flippedTexCoord = vec2(v_texCoord.x, v_texCoord.y);
    vec4 texColor = texture2D(textureID, flippedTexCoord);
    vec4 originalTexColor = texture2D(originalTextureID, flippedTexCoord);

    if(originalTexColor.a >= 0.01 &&
        originalTexColor.r >= u_brightnessRange[0] &&
        originalTexColor.r <= u_brightnessRange[1]) {

        // Calculate relative position from the gradient center
        vec2 relativePosition = flippedTexCoord - vec2(u_centerX, u_centerY);

        // Calculate the angle in radians from the gradient center
        float angle = atan(relativePosition.y, relativePosition.x);

        // Adjust the angle based on the frame count and rotation speed
        float adjustedAngle = angle + float(frameCount) * u_speed;

        // Normalize the adjusted angle to be between 0 and 1
        float normalizedAngle = mod(adjustedAngle + 3.14159265, 2.0 * 3.14159265) / (2.0 * 3.14159265);

        // Calculate the color index based on the normalized angle
        float index = normalizedAngle * gradientTextureDimensions.x;
        float normalizedIndex = mod(floor(index) + 0.5, gradientTextureDimensions.x) / gradientTextureDimensions.x;

        // Fetch the gradient color from the texture
        vec4 gradientColor = texture2D(gradientTexture, vec2(normalizedIndex, 0));

        // Combine the gradient color with the original texture color's alpha
        gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
        // Retain the original color if not matching the target RGB color
        gl_FragColor = texColor;
    }
}
