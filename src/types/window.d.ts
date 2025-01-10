import { Asciifier } from '../Asciifier';

declare global {
    interface Window {
        p5asciify?: Asciifier;
        preload?: () => void;
    }
}