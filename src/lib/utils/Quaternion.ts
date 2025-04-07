/**
 * Minimal Quaternion helper class.
 * @ignore
 */
export class Quaternion {
    w: number;
    x: number;
    y: number;
    z: number;

    constructor(w: number, x: number, y: number, z: number) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static angleAxis(angle: number, axis: number[]) {
        const halfAngle = angle / 2;
        const s = Math.sin(halfAngle);
        return new Quaternion(Math.cos(halfAngle), axis[0] * s, axis[1] * s, axis[2] * s).normalize();
    }

    multiply(q: Quaternion) {
        const w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z;
        const x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
        const y = this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x;
        const z = this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w;
        return new Quaternion(w, x, y, z);
    }

    normalize() {
        const mag = Math.hypot(this.w, this.x, this.y, this.z);
        if (mag === 0) return new Quaternion(1, 0, 0, 0);
        return new Quaternion(this.w / mag, this.x / mag, this.y / mag, this.z / mag);
    }
}