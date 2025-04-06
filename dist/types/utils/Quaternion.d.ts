/**
 * Minimal Quaternion helper class.
 * @ignore
 */
export declare class Quaternion {
    w: number;
    x: number;
    y: number;
    z: number;
    constructor(w: number, x: number, y: number, z: number);
    static angleAxis(angle: number, axis: number[]): Quaternion;
    multiply(q: Quaternion): Quaternion;
    normalize(): Quaternion;
}
