precision mediump float;

uniform sampler2D u_image; // The image to apply the effect to
uniform float u_aberrationAmount; // The amount of chromatic aberration
uniform float u_aberrationAngle; // The angle of chromatic aberration

varying vec2 v_texCoord; // Texture coordinates from vertex shader

void main() {
    // Calculate the offsets for each color channel
    vec2 redOffset = vec2(u_aberrationAmount * cos(u_aberrationAngle), u_aberrationAmount * sin(u_aberrationAngle));
    vec2 greenOffset = vec2(0.0, 0.0); // Green channel remains at the center
    vec2 blueOffset = vec2(-u_aberrationAmount * cos(u_aberrationAngle), -u_aberrationAmount * sin(u_aberrationAngle));

    // Sample the color for each channel with the offset
    float red = texture2D(u_image, v_texCoord + redOffset).r;
    float green = texture2D(u_image, v_texCoord + greenOffset).g;
    float blue = texture2D(u_image, v_texCoord + blueOffset).b;

    // Combine the colors back together
    vec4 color = vec4(red, green, blue, 1.0);

    // Output the color with chromatic aberration
    gl_FragColor = color;
}