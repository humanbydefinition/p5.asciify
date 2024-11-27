precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D u_texture;
uniform vec2 u_textureSize;
uniform float u_threshold;

void main() {
    vec2 texelSize = 1.0 / u_textureSize;

    float kernelX[9];
    float kernelY[9];

    kernelX[0] = -1.0;
    kernelX[1] = 0.0;
    kernelX[2] = 1.0;
    kernelX[3] = -2.0;
    kernelX[4] = 0.0;
    kernelX[5] = 2.0;
    kernelX[6] = -1.0;
    kernelX[7] = 0.0;
    kernelX[8] = 1.0;

    kernelY[0] = -1.0;
    kernelY[1] = -2.0;
    kernelY[2] = -1.0;
    kernelY[3] = 0.0;
    kernelY[4] = 0.0;
    kernelY[5] = 0.0;
    kernelY[6] = 1.0;
    kernelY[7] = 2.0;
    kernelY[8] = 1.0;

    // Retrieve the color values from the 3x3 neighborhood
    vec3 texColor[9];
    for(int i = 0; i < 3; i++) {
        for(int j = 0; j < 3; j++) {
            texColor[i * 3 + j] = texture2D(u_texture, v_texCoord + vec2(float(i - 1), float(j - 1)) * texelSize).rgb;
        }
    }

    vec3 sobelX = vec3(0.0);
    vec3 sobelY = vec3(0.0);
    for(int i = 0; i < 9; i++) {
        sobelX += kernelX[i] * texColor[i];
        sobelY += kernelY[i] * texColor[i];
    }

    vec3 sobel = sqrt(sobelX * sobelX + sobelY * sobelY);
    float intensity = length(sobel) / sqrt(3.0);

    float angleDeg = degrees(atan(sobelY.r, sobelX.r));
    vec3 edgeColor = vec3(0.0);

    if(intensity > u_threshold) {
        if(angleDeg >= -22.5 && angleDeg < 22.5) {
            edgeColor = vec3(0.1); // "-"
        } else if(angleDeg >= 22.5 && angleDeg < 67.5) {
            edgeColor = vec3(0.2); // "/"
        } else if(angleDeg >= 67.5 && angleDeg < 112.5) {
            edgeColor = vec3(0.3); // "|"
        } else if(angleDeg >= 112.5 && angleDeg < 157.5) {
            edgeColor = vec3(0.4); // "\"
        } else if(angleDeg >= 157.5 || angleDeg < -157.5) {
            edgeColor = vec3(0.6); // "-"
        } else if(angleDeg >= -157.5 && angleDeg < -112.5) {
            edgeColor = vec3(0.7); // "/"
        } else if(angleDeg >= -112.5 && angleDeg < -67.5) {
            edgeColor = vec3(0.8); // "|"
        } else if(angleDeg >= -67.5 && angleDeg < -22.5) {
            edgeColor = vec3(0.9); // "\"
        }
    }

    gl_FragColor = vec4(edgeColor, 1.0);
}
