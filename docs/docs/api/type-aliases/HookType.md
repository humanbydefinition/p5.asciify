# Type Alias: HookType

> **HookType** = `"init"` \| `"afterSetup"` \| `"pre"` \| `"post"`

Defined in: [types.ts:38](https://github.com/humanbydefinition/p5.asciify/blob/fec90c4382e90afa818d1e2d47829d9ca98f5310/src/lib/types.ts#L38)

Hook types supported by the p5.asciify hook manager.

These hooks integrate with p5.js lifecycle methods to automatically handle
ASCII conversion setup and rendering without requiring manual intervention.

By default, all hooks are activated, but you can selectively deactivate or re-activate them.

- `'init'`: Called once after p5.js is initialized to initialize p5.asciify.
  Initializes the core library components.
- `'afterSetup'`: Called once after the p5.js `setup()` function is complete.
  Fully sets up the library for use and calls user's `setupAsciify()` if defined.
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
