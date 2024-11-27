#version 100

precision lowp float;

uniform sampler2D u_shiftMapTexture; // Texture containing the shift values
uniform sampler2D u_noiseTexture;   // Texture containing the noise values
uniform sampler2D u_previousFrameTexture; // Texture containing the previous frame to apply the pixel shift/push on
uniform vec2 u_resolution;         // Resolution of the texture

varying vec2 v_texCoord;

// Updated getShift function
vec2 getShift(ivec2 coord) {
    vec2 texCoord = (vec2(coord) + 0.5) / u_resolution;
    vec4 shiftColor = texture2D(u_shiftMapTexture, texCoord);

    // Decode shifts: -1, 0, or 1
    float shiftX = (shiftColor.r * 2.0) - 1.0;
    float shiftY = (shiftColor.g * 2.0) - 1.0;

    // Round to nearest integer
    float shiftXRounded = floor(shiftX + 0.5);
    float shiftYRounded = floor(shiftY + 0.5);

    return vec2(clamp(shiftXRounded, -1.0, 1.0), clamp(shiftYRounded, -1.0, 1.0));
}

void main() {
    ivec2 pixelCoord = ivec2(floor(v_texCoord * u_resolution));

    vec2 shift = getShift(pixelCoord);
    ivec2 shiftInt = ivec2(shift);
    ivec2 shiftedCoord = pixelCoord + shiftInt;

    // Bounds checking for shifted coordinates
    if(shiftedCoord.x < 0 || shiftedCoord.x >= int(u_resolution.x) ||
        shiftedCoord.y < 0 || shiftedCoord.y >= int(u_resolution.y)) {
        gl_FragColor = texture2D(u_noiseTexture, v_texCoord);
    } else {
        vec2 shiftedTexCoord = (vec2(shiftedCoord) + 0.5) / u_resolution;
        vec4 color = texture2D(u_previousFrameTexture, shiftedTexCoord);
        gl_FragColor = color;
    }
}
