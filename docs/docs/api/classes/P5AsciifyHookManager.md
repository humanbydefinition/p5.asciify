# Class: P5AsciifyHookManager

Defined in: [HookManager.ts:18](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/HookManager.ts#L18)

Manages `p5.js` lifecycle hooks for both `1.x.x` and `2.x.x` versions.
Handles automatic registration with `p5.js` and provides unified hook management

## Methods

### activateHook()

> **activateHook**(`hookType`): `void`

Defined in: [HookManager.ts:252](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/HookManager.ts#L252)

Activate a hook by setting its proxy to active

#### Parameters

| Parameter  | Type                                      | Description                  |
| ---------- | ----------------------------------------- | ---------------------------- |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to activate |

#### Returns

`void`

---

### deactivateHook()

> **deactivateHook**(`hookType`): `void`

Defined in: [HookManager.ts:266](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/HookManager.ts#L266)

Deactivate a hook by setting its proxy to inactive

#### Parameters

| Parameter  | Type                                      | Description                    |
| ---------- | ----------------------------------------- | ------------------------------ |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to deactivate |

#### Returns

`void`

---

### isHookActive()

> **isHookActive**(`hookType`): `boolean`

Defined in: [HookManager.ts:285](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/HookManager.ts#L285)

Check if a hook is currently active

#### Parameters

| Parameter  | Type                                      | Description               |
| ---------- | ----------------------------------------- | ------------------------- |
| `hookType` | [`HookType`](../type-aliases/HookType.md) | The type of hook to check |

#### Returns

`boolean`

Whether the hook is active

---

### getInstance()

> `static` **getInstance**(): `P5AsciifyHookManager`

Defined in: [HookManager.ts:30](https://github.com/humanbydefinition/p5.asciify/blob/15d65e5de5ef823bac2dd4f184de81e436dbf1d7/src/lib/HookManager.ts#L30)

#### Returns

`P5AsciifyHookManager`
