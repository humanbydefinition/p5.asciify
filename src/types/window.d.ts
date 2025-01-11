import { P5Asciifier } from '../Asciifier';

declare global {
    interface Window {
        p5asciify?: P5Asciifier;
        preload?: () => void;
    }
}