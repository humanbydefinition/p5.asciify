precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 2D texture for gradient colors
uniform int frameCount; // Uniform to animate the gradient based on frame count
uniform float noiseScale; // Scale of the Perlin Noise
uniform float u_speed; // Speed of the animation
uniform float direction; // Direction of the animation in degrees
uniform vec2 gradientTextureDimensions; // Dimensions of the gradient texture
uniform vec2 u_brightnessRange; // Range of brightness values

vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec4 texColor = texture2D(textureID, v_texCoord);
    vec4 originalTexColor = texture2D(originalTextureID, v_texCoord);

    // Check if the pixel color in the original texture matches the target color within the tolerance
    if(originalTexColor.r >= u_brightnessRange[0] && originalTexColor.r <= u_brightnessRange[1]) {

        // Generate Perlin noise value based on texture coordinates and frame count
        vec2 directionVec = vec2(cos(radians(direction)), sin(radians(direction)));
        vec2 uv = v_texCoord * noiseScale + directionVec * float(frameCount) * u_speed * 0.01;
        float noiseValue = snoise(uv);

        // Normalize noise value to the [0, 1] range
        float normalizedNoiseValue = (noiseValue + 1.0) / 2.0;

        // Compute normalized index for accurate color fetching
        float index = normalizedNoiseValue * (gradientTextureDimensions.x - 1.0);
        float texelPosition = (floor(index) + 0.5) / gradientTextureDimensions.x;

        // Fetch the gradient color
        vec4 gradientColor = texture2D(gradientTexture, vec2(texelPosition, 0));

        // Combine gradient color with original alpha
        gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
        gl_FragColor = texColor;
    }
}