precision mediump float;
varying vec2 v_texCoord;

uniform bool u_zigzag;
uniform sampler2D textureID;
uniform sampler2D originalTextureID;
uniform sampler2D gradientTexture;
uniform int frameCount;
uniform float u_gradientDirection;
uniform float u_speed;
uniform float u_angle;
uniform vec2 gradientTextureDimensions;
uniform vec2 u_brightnessRange;

void main() {
    vec4 texColor = texture2D(textureID, v_texCoord);
    vec4 originalTexColor = texture2D(originalTextureID, v_texCoord);
    if (!(originalTexColor.r >= u_brightnessRange[0] && originalTexColor.r <= u_brightnessRange[1])) {
        gl_FragColor = texColor;
        return;
    }

    float index;
    if (u_zigzag) {
        vec2 coord = gl_FragCoord.xy;
        float posX = coord.x * cos(u_angle) - coord.y * sin(u_angle);
        float posY = coord.x * sin(u_angle) + coord.y * cos(u_angle);
        float direction = mod(floor(posY), 2.0) == 0.0 ? 1.0 : -1.0;
        index = mod(posX + float(frameCount) * u_speed * direction * u_gradientDirection, gradientTextureDimensions.x);
    } else {
        vec2 coord = floor(gl_FragCoord.xy);
        float pos = coord.x * cos(u_angle) + coord.y * sin(u_angle);
        index = mod(pos + float(frameCount) * u_gradientDirection * u_speed, gradientTextureDimensions.x);
    }

    index = floor(index);
    float texelPos = (index + 0.5) / gradientTextureDimensions.x;
    vec4 gradientColor = texture2D(gradientTexture, vec2(texelPos, 0.0));
    gl_FragColor = vec4(gradientColor.rgb, texColor.a);
}
