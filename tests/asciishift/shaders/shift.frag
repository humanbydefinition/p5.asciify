#version 100

precision mediump float;

uniform vec2 u_resolution;
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


varying vec2 v_texCoord;

bool insideBox(vec2 v, vec2 bottomLeft, vec2 topRight) {
    return all(greaterThanEqual(v, bottomLeft)) && all(lessThan(v, topRight));
}

void main() {

    vec2 invDims = 1.0 / u_resolution;
    vec2 offset = vec2(0.0);

    // Precompute normalized rectangle coordinates
    vec2 rect_bl[16];
    vec2 rect_tr[16];

    // Assign rectangles to an array
    vec4 rects[16];
    rects[0] = u_rect0;
    rects[1] = u_rect1;
    rects[2] = u_rect2;
    rects[3] = u_rect3;
    rects[4] = u_rect4;
    rects[5] = u_rect5;
    rects[6] = u_rect6;
    rects[7] = u_rect7;
    rects[8] = u_rect8;
    rects[9] = u_rect9;
    rects[10] = u_rect10;
    rects[11] = u_rect11;
    rects[12] = u_rect12;
    rects[13] = u_rect13;
    rects[14] = u_rect14;
    rects[15] = u_rect15;

    for(int i = 0; i < 16; i++) {
        rect_bl[i] = rects[i].xy / u_resolution;
        rect_tr[i] = (rects[i].xy + rects[i].zw) / u_resolution;
    }

    // Precompute pixel coordinates
    float texCoordX_pixels = v_texCoord.x * u_resolution.x;
    float texCoordY_pixels = v_texCoord.y * u_resolution.y;

    // Rectangles with specific shifts
    if(insideBox(v_texCoord, rect_bl[0], rect_tr[0])) {
        offset = invDims;
    } else if(insideBox(v_texCoord, rect_bl[1], rect_tr[1])) {
        offset = vec2(invDims.x, -invDims.y);
    } else if(insideBox(v_texCoord, rect_bl[2], rect_tr[2])) {
        offset = vec2(-invDims.x, invDims.y);
    } else if(insideBox(v_texCoord, rect_bl[3], rect_tr[3])) {
        offset = -invDims;
    } else if(insideBox(v_texCoord, rect_bl[4], rect_tr[4])) {
        offset = vec2(invDims.x, 0.0);
    } else if(insideBox(v_texCoord, rect_bl[5], rect_tr[5])) {
        offset = vec2(-invDims.x, 0.0);
    } else if(insideBox(v_texCoord, rect_bl[6], rect_tr[6])) {
        offset = vec2(0.0, invDims.y);
    } else if(insideBox(v_texCoord, rect_bl[7], rect_tr[7])) {
        offset = vec2(0.0, -invDims.y);
    // Horizontal zig-zag for rectangle 8
    } else if(insideBox(v_texCoord, rect_bl[8], rect_tr[8])) {
        float adjustedY = texCoordY_pixels - rects[8].y;
        float row = mod(floor(adjustedY), 2.0);
        if(row < 1.0) {
            offset = vec2(invDims.x, 0.0);
        } else {
            offset = vec2(-invDims.x, 0.0);
        }
    }
    // Vertical zig-zag for rectangle 9
    else if(insideBox(v_texCoord, rect_bl[9], rect_tr[9])) {
        float adjustedX = texCoordX_pixels - rects[9].x;
        float column = mod(floor(adjustedX), 2.0);
        if(column < 1.0) {
            offset = vec2(0.0, invDims.y);
        } else {
            offset = vec2(0.0, -invDims.y);
        }
    } else if(insideBox(v_texCoord, rect_bl[10], rect_tr[10])) {
        float centerY = rects[10].y + rects[10].w * 0.5;
        if(texCoordY_pixels > centerY) {
            offset.x += invDims.x;
        } else {
            offset.x -= invDims.x;
        }
    } else if(insideBox(v_texCoord, rect_bl[11], rect_tr[11])) {
        float centerX = rects[11].x + rects[11].z * 0.5;
        if(texCoordX_pixels > centerX) {
            offset.y += invDims.y;
        } else {
            offset.y -= invDims.y;
        }
    } else if(insideBox(v_texCoord, rect_bl[12], rect_tr[12])) {
        float shearFactor = 0.5; // Adjust for more or less shear
        float offsetX = mod(floor(texCoordY_pixels * shearFactor), 2.0) * invDims.x;
        offset.x += offsetX;
    } else if(insideBox(v_texCoord, rect_bl[13], rect_tr[13])) {
        float shearFactor = 0.5;
        float offsetY = mod(floor(texCoordX_pixels * shearFactor), 2.0) * invDims.y;
        offset.y += offsetY;
    } else if(insideBox(v_texCoord, rect_bl[14], rect_tr[14])) {
        float shearFactor = 0.5;
        float offsetX = mod(floor(texCoordY_pixels * shearFactor), 2.0) * invDims.x;
        offset.x -= offsetX;
    } else if(insideBox(v_texCoord, rect_bl[15], rect_tr[15])) {
        float shearFactor = 0.5;
        float offsetY = mod(floor(texCoordX_pixels * shearFactor), 2.0) * invDims.y;
        offset.y -= offsetY;
    } else {
        offset = vec2(0.0);
    }

    // Compute the offset in pixels
    vec2 offsetInPixels = offset * u_resolution;
    offsetInPixels = floor(offsetInPixels + 0.5); // Round to nearest integer
    offsetInPixels = clamp(offsetInPixels, -1.0, 1.0); // Limit to -1, 0, or 1

    // Map -1 to 0.0, 0 to 0.5, 1 to 1.0
    float shiftXColor = (offsetInPixels.x + 1.0) * 0.5;
    float shiftYColor = (offsetInPixels.y + 1.0) * 0.5;
    gl_FragColor = vec4(shiftXColor, shiftYColor, 0.0, 1.0);

}
