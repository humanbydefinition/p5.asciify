precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 2D texture for gradient colors
uniform int frameCount;
uniform float u_gradientDirection; // Direction for the gradient shift (+1 for up, -1 for down)
uniform float u_centerX;
uniform float u_centerY;
uniform float u_speed; // Controls how tightly the spiral winds
uniform float u_density; // Controls the spacing between the spirals
uniform vec2 gradientTextureDimensions; // Dimensions of the gradient texture
uniform vec2 u_brightnessRange; // Range of brightness values

void main() {
    vec4 texColor = texture2D(textureID, v_texCoord);
    vec4 originalTexColor = texture2D(originalTextureID, v_texCoord);

    if(originalTexColor.a >= 0.01 &&
        originalTexColor.r >= u_brightnessRange[0] &&
        originalTexColor.r <= u_brightnessRange[1]) {

        vec2 relativePosition = v_texCoord - vec2(u_centerX, u_centerY);
        float distance = length(relativePosition);
        float angle = atan(relativePosition.y, relativePosition.x);
        float adjustedAngle = angle + float(frameCount) * u_gradientDirection * u_speed;

        // Adjust index calculation for a smoother transition
        float index = mod((distance + adjustedAngle * u_density) * gradientTextureDimensions.x, gradientTextureDimensions.x);

        // Directly calculate the normalized index with half-texel offset for accurate color fetching
        float normalizedIndex = (floor(index) + 0.5) / gradientTextureDimensions.x;

        // Fetch the gradient color based on the calculated index
        vec4 gradientColor = texture2D(gradientTexture, vec2(normalizedIndex, 0));

        // Combine gradient color with the original alpha
        gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
        gl_FragColor = texColor;
    }
}