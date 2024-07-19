class P5AsciifyUtils {

    static hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    static rgbToShaderColor(color) {
        return [color[0] / 255, color[1] / 255, color[2] / 255];
    }

    static hexToShaderColor(hex) {
        return this.rgbToShaderColor(this.hexToRgb(hex));
    }

    static compareVersions(v1, v2) {
        const [v1Parts, v2Parts] = [v1, v2].map(v => v.split('.').map(Number));
    
        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            const [v1Part, v2Part] = [v1Parts[i] ?? 0, v2Parts[i] ?? 0];
            if (v1Part !== v2Part) return v1Part > v2Part ? 1 : -1;
        }
    
        return 0;
    }
}