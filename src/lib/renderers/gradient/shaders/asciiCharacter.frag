precision mediump float;

// Uniforms
uniform sampler2D u_prevAsciiCharacterTexture;
uniform sampler2D u_prevGradientTexture;
uniform sampler2D u_nextGradientTexture;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    
    vec4 prevAscii = texture2D(u_prevAsciiCharacterTexture, uv);
    vec4 prevGradient = texture2D(u_prevGradientTexture, uv);
    vec4 nextGradient = texture2D(u_nextGradientTexture, uv);
    
    // Direct equality comparison between gradients
    bool colorsMatch = prevGradient == nextGradient;
    
    gl_FragColor = colorsMatch ? prevAscii : nextGradient;
}