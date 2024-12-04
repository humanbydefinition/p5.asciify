#version 100
precision mediump float;

// Varyings
varying vec2 v_texCoord;

// Uniforms
uniform sampler2D textureID;             // Original texture
uniform sampler2D originalTextureID;     // Unmodified version of the original texture
uniform sampler2D gradientTexture;       // 2D texture for gradient colors
uniform int frameCount;
uniform float u_gradientDirection;       // Direction for the gradient shift (+1 for up, -1 for down)
uniform float u_speed;                   // Control the speed of the gradient movement
uniform float u_angle;                   // Angle in degrees for the gradient
uniform vec2 gradientTextureDimensions;  // Dimensions of the gradient texture
uniform vec2 u_brightnessRange;          // Range of brightness values

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);

    // Sample the original and unmodified textures using the provided texture coordinates
    vec4 texColor = texture2D(textureID, v_texCoord);
    vec4 originalTexColor = texture2D(originalTextureID, v_texCoord);

    // Check if the grayscale value is within the specified brightness range
    // and if the pixel hasn't been modified yet
    if (texColor.r >= u_brightnessRange.x && texColor.r <= u_brightnessRange.y && texColor == originalTexColor) {

        // Calculate position based on the adjusted fragment coordinates and angle
        float position = logicalFragCoord.x * cos(u_angle) + logicalFragCoord.y * sin(u_angle);

        // Calculate the gradient index with wrapping using modulus
        float index = mod(position + float(frameCount) * u_gradientDirection * u_speed, gradientTextureDimensions.x);
        index = floor(index);

        // Calculate the normalized texel position for sampling the gradient texture
        float texelPosition = (index + 0.5) / gradientTextureDimensions.x;

        // Sample the gradient color from the gradient texture
        vec4 gradientColor = texture2D(gradientTexture, vec2(texelPosition, 0.0));

        // Output the gradient color with the original alpha value
        gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
        // If conditions are not met, output the original texture color
        gl_FragColor = texColor;
    }
}
