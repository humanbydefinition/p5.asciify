#version 100

precision highp float;

uniform sampler2D u_shiftMapTexture;
uniform vec2 u_resolution;

varying vec2 v_texCoord;

// Function to decode the shift from the shift map texture
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
    // Convert texture coordinates to integer pixel coordinates
    ivec2 pixelCoord = ivec2(floor(v_texCoord * u_resolution));

    // Get the intended shift for this pixel
    vec2 shift = getShift(pixelCoord);
    ivec2 shiftInt = ivec2(shift);

    ivec2 targetCoord = pixelCoord + shiftInt;

    // Initialize final shift
    ivec2 finalShift = shiftInt;

    // Conflict detection with unrolled loops
    bool conflictFound = false;

    // Offsets for neighboring pixels (dx, dy)
    ivec2 offsets[9];
    offsets[0] = ivec2(-1, -1);
    offsets[1] = ivec2(0, -1);
    offsets[2] = ivec2(1, -1);
    offsets[3] = ivec2(-1, 0);
    offsets[4] = ivec2(0, 0);
    offsets[5] = ivec2(1, 0);
    offsets[6] = ivec2(-1, 1);
    offsets[7] = ivec2(0, 1);
    offsets[8] = ivec2(1, 1);

    // Unroll the conflict detection loop
    for(int i = 0; i < 9; i++) {
        if(conflictFound)
            break;

        ivec2 neighborOffset = offsets[i];
        // Corrected neighborCoord calculation
        ivec2 neighborCoord = targetCoord - neighborOffset;

        // Check bounds
        if(neighborCoord.x >= 0 && neighborCoord.x < int(u_resolution.x) &&
            neighborCoord.y >= 0 && neighborCoord.y < int(u_resolution.y)) {

            // Get neighbor's shift
            vec2 neighborShift = getShift(neighborCoord);
            ivec2 neighborShiftInt = ivec2(neighborShift);
            ivec2 neighborTargetCoord = neighborCoord + neighborShiftInt;

            // Inside the conflict detection loop
            if(all(equal(neighborTargetCoord, targetCoord))) {
                // Determine priority based on pixel coordinates to make decisions more deterministic
                int currentPriority = pixelCoord.y * int(u_resolution.x) + pixelCoord.x;
                int neighborPriority = neighborCoord.y * int(u_resolution.x) + neighborCoord.x;

                // Compare priorities to resolve conflicts, preferring lower priority values
                if(neighborPriority < currentPriority) {
                    finalShift = ivec2(0); // Neighbor wins the conflict
                    conflictFound = true;
                    break;
                }
            }
        }
    }

    // Output the final shift
    // Map -1 to 0.0, 0 to 0.5, 1 to 1.0
    float shiftXColor = (float(finalShift.x) + 1.0) * 0.5;
    float shiftYColor = (float(finalShift.y) + 1.0) * 0.5;

    gl_FragColor = vec4(shiftXColor, shiftYColor, 0.0, 1.0);
}
