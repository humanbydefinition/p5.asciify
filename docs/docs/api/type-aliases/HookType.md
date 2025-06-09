# Type Alias: HookType

> **HookType** = `"init"` \| `"afterSetup"` \| `"pre"` \| `"post"`

Defined in: [types.ts:37](https://github.com/humanbydefinition/p5.asciify/blob/37a23a9df59fc8f52f53b0eee3428530adf8d119/src/lib/types.ts#L37)

Hook types supported by the p5.asciify hook manager.

These hooks integrate with p5.js lifecycle methods to automatically handle
ASCII conversion setup and rendering without requiring manual intervention.

By default, all hooks are activated, but you can selectively activate or deactivate them.

- `'init'`: Called once after p5.js is initialized to initialize p5.asciify.
  Sets up the core library components and prepares for ASCII conversion.
- `'afterSetup'`: Called once after the p5.js `setup()` function is complete.
  Initializes asciifier instances and calls user's `setupAsciify()` if defined.
- `'pre'`: Called before each p5.js `draw()` function execution.
  Starts capturing the canvas content for ASCII conversion.
- `'post'`: Called after each p5.js `draw()` function execution.
  Performs ASCII conversion, renders output to canvas, and calls user's `drawAsciify()` if defined.

## Example

```typescript
// Activate specific hooks
p5asciify.activateHook("init");
p5asciify.activateHook("post");

// Deactivate a hook
p5asciify.deactivateHook("pre");
```
