#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform sampler2D u_texture;
uniform vec2 u_textureSize;
uniform float u_threshold;

void main() {
    vec2 texelSize = 1.0f / u_textureSize;

    float kernelX[9];
    float kernelY[9];

    kernelX[0] = -1.0f;
    kernelX[1] = 0.0f;
    kernelX[2] = 1.0f;
    kernelX[3] = -2.0f;
    kernelX[4] = 0.0f;
    kernelX[5] = 2.0f;
    kernelX[6] = -1.0f;
    kernelX[7] = 0.0f;
    kernelX[8] = 1.0f;

    kernelY[0] = -1.0f;
    kernelY[1] = -2.0f;
    kernelY[2] = -1.0f;
    kernelY[3] = 0.0f;
    kernelY[4] = 0.0f;
    kernelY[5] = 0.0f;
    kernelY[6] = 1.0f;
    kernelY[7] = 2.0f;
    kernelY[8] = 1.0f;

    vec3 texColor[9];
    for(int i = 0; i < 3; i++) {
        for(int j = 0; j < 3; j++) {
            texColor[i * 3 + j] = texture(u_texture, v_texCoord + vec2(i - 1, j - 1) * texelSize).rgb;
        }
    }

    vec3 sobelX = vec3(0.0f);
    vec3 sobelY = vec3(0.0f);
    for(int i = 0; i < 9; i++) {
        sobelX += kernelX[i] * texColor[i];
        sobelY += kernelY[i] * texColor[i];
    }

    vec3 sobel = sqrt(sobelX * sobelX + sobelY * sobelY);
    float intensity = length(sobel) / sqrt(3.0f);

    float angleDeg = degrees(atan(sobelY.r, sobelX.r));
    vec3 edgeColor = vec3(0.0f);

    if(intensity > u_threshold) {
        if(angleDeg >= -22.5f && angleDeg < 22.5f) {
            edgeColor = vec3(0.1f); // "-"
        } else if(angleDeg >= 22.5f && angleDeg < 67.5f) {
            edgeColor = vec3(0.2f); // "/"
        } else if(angleDeg >= 67.5f && angleDeg < 112.5f) {
            edgeColor = vec3(0.3f); // "|"
        } else if(angleDeg >= 112.5f && angleDeg < 157.5f) {
            edgeColor = vec3(0.4f); // "\"
        } else if(angleDeg >= 157.5f || angleDeg < -157.5f) {
            edgeColor = vec3(0.6f); // "-"
        } else if(angleDeg >= -157.5f && angleDeg < -112.5f) {
            edgeColor = vec3(0.7f); // "/"
        } else if(angleDeg >= -112.5f && angleDeg < -67.5f) {
            edgeColor = vec3(0.8f); // "|"
        } else if(angleDeg >= -67.5f && angleDeg < -22.5f) {
            edgeColor = vec3(0.9f); // "\"
        }
    }

    fragColor = vec4(edgeColor, 1.0f);
}