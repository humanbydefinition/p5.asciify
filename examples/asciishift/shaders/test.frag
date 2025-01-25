precision lowp float;

// === Uniforms ===
uniform vec2 u_resolution;

// Define 16 rectangle uniforms (x, y, width, height)
uniform vec4 u_rect0;
uniform vec4 u_rect1;
uniform vec4 u_rect2;
uniform vec4 u_rect3;
uniform vec4 u_rect4;
uniform vec4 u_rect5;
uniform vec4 u_rect6;
uniform vec4 u_rect7;
uniform vec4 u_rect8;
uniform vec4 u_rect9;
uniform vec4 u_rect10;
uniform vec4 u_rect11;
uniform vec4 u_rect12;
uniform vec4 u_rect13;
uniform vec4 u_rect14;
uniform vec4 u_rect15;

// === Varying ===
varying vec2 v_texCoord;

// === Helper Function ===
// Checks if a point is inside a rectangle defined by bottom-left and top-right corners
bool insideBox(vec2 point, vec2 bottomLeft, vec2 topRight) {
    return all(greaterThanEqual(point, bottomLeft)) && all(lessThan(point, topRight));
}

void main() {
    // === Normalize Texture Coordinates ===
    vec2 normalizedCoord = v_texCoord;

    // === Array of Rectangles ===
    // Store all rectangle uniforms in an array for easier access
    vec4 rects[16];
    rects[0]  = u_rect0;
    rects[1]  = u_rect1;
    rects[2]  = u_rect2;
    rects[3]  = u_rect3;
    rects[4]  = u_rect4;
    rects[5]  = u_rect5;
    rects[6]  = u_rect6;
    rects[7]  = u_rect7;
    rects[8]  = u_rect8;
    rects[9]  = u_rect9;
    rects[10] = u_rect10;
    rects[11] = u_rect11;
    rects[12] = u_rect12;
    rects[13] = u_rect13;
    rects[14] = u_rect14;
    rects[15] = u_rect15;

    // === Define Colors for Each Rectangle ===
    // 16 distinct colors (you can adjust these as needed)
    vec3 colors[16];
    colors[0]  = vec3(1.0, 0.0, 0.0); // Red
    colors[1]  = vec3(0.0, 1.0, 0.0); // Green
    colors[2]  = vec3(0.0, 0.0, 1.0); // Blue
    colors[3]  = vec3(1.0, 1.0, 0.0); // Yellow
    colors[4]  = vec3(1.0, 0.0, 1.0); // Magenta
    colors[5]  = vec3(0.0, 1.0, 1.0); // Cyan
    colors[6]  = vec3(0.5, 0.5, 0.5); // Gray
    colors[7]  = vec3(1.0, 0.5, 0.0); // Orange
    colors[8]  = vec3(0.5, 0.0, 0.5); // Purple
    colors[9]  = vec3(0.5, 0.5, 0.0); // Olive
    colors[10] = vec3(0.0, 0.5, 0.5); // Teal
    colors[11] = vec3(0.5, 0.0, 0.0); // Maroon
    colors[12] = vec3(0.0, 0.5, 0.0); // Dark Green
    colors[13] = vec3(0.0, 0.0, 0.5); // Navy
    colors[14] = vec3(0.5, 0.5, 1.0); // Light Blue
    colors[15] = vec3(1.0, 0.5, 0.5); // Light Red

    // === Check Each Rectangle and Assign Color ===
    // Iterate through each rectangle and check if the current fragment is inside it
    // Assign the corresponding color if it is
    // If multiple rectangles overlap, the first one in order will take precedence
    for(int i = 0; i < 16; i++) {
        vec2 bottomLeft = rects[i].xy / u_resolution;
        vec2 topRight = (rects[i].xy + rects[i].zw) / u_resolution;

        if (insideBox(normalizedCoord, bottomLeft, topRight)) {
            gl_FragColor = vec4(colors[i], 1.0);
            return; // Exit early once a matching rectangle is found
        }
    }

    // === Default Color ===
    // If the fragment is not inside any rectangle, set it to black
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
