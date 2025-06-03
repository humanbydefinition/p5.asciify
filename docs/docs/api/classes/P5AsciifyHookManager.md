# Class: P5AsciifyHookManager

Defined in: [HookManager.ts:19](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L19)

Manages `p5.js` lifecycle hooks for both `1.x.x` and `2.x.x` versions.
Handles automatic registration with `p5.js` and provides unified hook management

## Methods

### activateHook()

> **activateHook**(`hookType`): `void`

Defined in: [HookManager.ts:249](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L249)

Register the proxy function with p5.js (one-time registration)

#### Parameters

| Parameter  | Type                                      | Description                  |
| ---------- | ----------------------------------------- | ---------------------------- |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to activate |

#### Returns

`void`

---

### deactivateHook()

> **deactivateHook**(`hookType`): `void`

Defined in: [HookManager.ts:269](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L269)

Deactivate a hook by setting its proxy to inactive (without unregistering from p5.js)

#### Parameters

| Parameter  | Type                                      | Description                    |
| ---------- | ----------------------------------------- | ------------------------------ |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to deactivate |

#### Returns

`void`

---

### getAddonConfig()

> **getAddonConfig**(): `object`

Defined in: [HookManager.ts:310](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L310)

**`Internal`**

Get the addon configuration for p5.js 2.x.x (used by AsciifierManager)

#### Returns

`object`

| Name          | Type                            | Defined in                                                                                                                                      |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `postdraw()`  | (`this`) => `void`              | [HookManager.ts:333](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L333) |
| `postsetup()` | (`this`) => `Promise`\<`void`\> | [HookManager.ts:319](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L319) |
| `predraw()`   | (`this`) => `void`              | [HookManager.ts:326](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L326) |
| `presetup()`  | (`this`) => `Promise`\<`void`\> | [HookManager.ts:312](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L312) |

---

### getHooks()

> **getHooks**(`hookType`): `object`[]

Defined in: [HookManager.ts:298](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L298)

Get all hooks for a specific type (used internally by addon system)

#### Parameters

| Parameter  | Type                                      | Description                   |
| ---------- | ----------------------------------------- | ----------------------------- |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hooks to retrieve |

#### Returns

`object`[]

Array of active hook functions

---

### initialize()

> **initialize**(`asciifierManager`): `void`

Defined in: [HookManager.ts:48](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L48)

Initialize the hook manager and register with p5.js

#### Parameters

| Parameter          | Type  | Description                                     |
| ------------------ | ----- | ----------------------------------------------- |
| `asciifierManager` | `any` | Reference to the manager for core functionality |

#### Returns

`void`

---

### isHookActive()

> **isHookActive**(`hookType`): `boolean`

Defined in: [HookManager.ts:288](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L288)

Check if a hook is currently active

#### Parameters

| Parameter  | Type                                      | Description               |
| ---------- | ----------------------------------------- | ------------------------- |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to check |

#### Returns

`boolean`

Whether the hook is active

---

### registerHook()

> **registerHook**(`hookType`, `fn`, `isCore`): `void`

Defined in: [HookManager.ts:215](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L215)

Register a hook function with proxy-based activation control

#### Parameters

| Parameter  | Type                                      | Default value | Description                                               |
| ---------- | ----------------------------------------- | ------------- | --------------------------------------------------------- |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | `undefined`   | The type of hook to register                              |
| `fn`       | (`this`) => `void` \| `Promise`\<`void`\> | `undefined`   | The function to execute                                   |
| `isCore`   | `boolean`                                 | `false`       | Whether this is a core hook (protected from deactivation) |

#### Returns

`void`

---

### getInstance()

> `static` **getInstance**(): `P5AsciifyHookManager`

Defined in: [HookManager.ts:30](https://github.com/humanbydefinition/p5.asciify/blob/72207d8315478089a23608e608f38532d78edede/src/lib/HookManager.ts#L30)

#### Returns

`P5AsciifyHookManager`
