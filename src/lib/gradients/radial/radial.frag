precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 2D texture for gradient colors
uniform float u_centerX; // X coordinate of the gradient center
uniform float u_centerY; // Y coordinate of the gradient center
uniform float u_radius; // Maximum radius of the radial gradient in texture coordinates
uniform int frameCount; // Uniform to animate the gradient based on frame count
uniform int u_gradientDirection; // Direction of the gradient movement (+1 for outward, -1 for inward)
uniform vec2 gradientTextureDimensions; // Dimensions of the gradient texture
uniform vec2 u_brightnessRange; // Range of brightness values

void main() {
    vec4 texColor = texture2D(textureID, v_texCoord);
    vec4 originalTexColor = texture2D(originalTextureID, v_texCoord);

    if(texColor.r >= u_brightnessRange[0] && texColor.r <= u_brightnessRange[1] && texColor == originalTexColor) {

        // Calculate the relative position and distance from the gradient center
        vec2 relativePosition = v_texCoord - vec2(u_centerX, u_centerY);
        float distance = length(relativePosition);

        // Normalize the distance and map it to the gradient texture
        float normalizedDistance = clamp(distance / u_radius, 0.0, 1.0);
        float index = normalizedDistance * (gradientTextureDimensions.x - 1.0);

        // Adjust animation speed and direction
        // If gradientDirection is +1, index increases over time; if -1, it decreases
        float animatedIndex = mod(index + float(frameCount) * 0.1 * float(-u_gradientDirection), gradientTextureDimensions.x);

        // Directly calculate the normalized index with half-texel offset for accurate color fetching
        float normalizedIndex = (floor(animatedIndex) + 0.5) / gradientTextureDimensions.x;

        // Fetch the gradient color based on the calculated index
        vec4 gradientColor = texture2D(gradientTexture, vec2(normalizedIndex, 0));

        // Combine gradient color with the original alpha
        gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
        gl_FragColor = texColor;
    }
}
