import { P5Asciifier } from '../lib/Asciifier';

declare global {
    interface Window {
        p5asciify?: P5Asciifier;
        preload?: () => void;
    }
}