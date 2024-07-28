#version 300 es
precision highp float;

layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec2 aTexCoord;

out vec2 v_texCoord;

void main() {
    vec4 positionVec4 = vec4(aPosition, 1.0f);

    positionVec4.xy = positionVec4.xy * 2.0f - 1.0f;

    gl_Position = positionVec4;

    v_texCoord = aTexCoord;
}