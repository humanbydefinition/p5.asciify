/**
 * Used to declare file imports that are not recognized by TypeScript.
 * This way, we can import files like .vert, .frag, and .txt files without any linting errors.
 */
declare module '*.txt?raw' {
    const content: string;
    export default content;
}