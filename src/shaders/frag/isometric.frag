#version 300 es
precision highp float;

uniform sampler2D u_asciiTexture;
uniform vec2 u_resolution;
uniform float u_tileWidth;
uniform float u_tileHeight;

out vec4 fragColor;

// Improved sampling with anti-aliasing
vec4 sampleAsciiTexture(vec2 uv) {
    vec2 texSize = u_resolution;
    vec2 texelCoords = uv * texSize;
    
    // Get integer and fractional parts of texture coordinates
    vec2 texelFloor = floor(texelCoords);
    vec2 texelFrac = fract(texelCoords);
    
    // Get neighboring texel colors using texelFetch for precise sampling
    vec4 c00 = texelFetch(u_asciiTexture, ivec2(texelFloor), 0);
    vec4 c10 = texelFetch(u_asciiTexture, ivec2(texelFloor) + ivec2(1, 0), 0);
    vec4 c01 = texelFetch(u_asciiTexture, ivec2(texelFloor) + ivec2(0, 1), 0);
    vec4 c11 = texelFetch(u_asciiTexture, ivec2(texelFloor) + ivec2(1, 1), 0);
    
    // Perform bilinear interpolation
    vec4 i1 = mix(c00, c10, texelFrac.x);
    vec4 i2 = mix(c01, c11, texelFrac.x);
    return mix(i1, i2, texelFrac.y);
}

void main() {
    // Calculate normalized device coordinates
    vec2 ndc = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
    
    // Calculate aspect ratio correction
    float aspectRatio = u_resolution.x / u_resolution.y;
    float tileAspectRatio = u_tileWidth / u_tileHeight;

    // Calculate scale to ensure the isometric tiles fill the screen properly
    float scale = min(
        u_resolution.x / (u_tileWidth + u_tileHeight * aspectRatio), 
        u_resolution.y / (u_tileHeight + u_tileWidth * aspectRatio)
    );

    // Transform to isometric space
    vec2 isoUV;
    isoUV.x = (ndc.x + ndc.y) * 0.5 * u_tileWidth; // Change sign here
    isoUV.y = (ndc.y - ndc.x) * 0.25 * u_tileHeight * aspectRatio; // Change sign here

    // Adjust for tile aspect ratio
    isoUV.y *= tileAspectRatio;

    // Convert from isometric UV to texture space
    isoUV = isoUV / scale + 0.5;

    // Check if the UV coordinates are within the bounds of the texture
    if (isoUV.x >= 0.0 && isoUV.x <= 1.0 && isoUV.y >= 0.0 && isoUV.y <= 1.0) {
        // Sample the texture using high-quality interpolation
        vec4 sampledColor = sampleAsciiTexture(isoUV);

        // Use a sharpening kernel to enhance character crispness
        float sharpness = 2.0; // Adjustable sharpness factor
        vec4 blurred = (
            sampleAsciiTexture(isoUV + vec2(1.0 / u_resolution.x, 0.0)) +
            sampleAsciiTexture(isoUV - vec2(1.0 / u_resolution.x, 0.0)) +
            sampleAsciiTexture(isoUV + vec2(0.0, 1.0 / u_resolution.y)) +
            sampleAsciiTexture(isoUV - vec2(0.0, 1.0 / u_resolution.y))
        ) * 0.25;
        vec4 sharpened = mix(blurred, sampledColor, sharpness);

        // Output the final color
        fragColor = vec4(sharpened.rgb, 1.0);
    } else {
        // Out of bounds, set to transparent or background color
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}
