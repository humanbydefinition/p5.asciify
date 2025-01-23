/**
 * This file is used to declare types for assets that are not recognized by TypeScript.
 * For example, if you have a file with a .txt extension, you can declare it here so that TypeScript knows how to handle it.
 */
declare module "*?raw"
{
    const content: string;
    export default content;
}