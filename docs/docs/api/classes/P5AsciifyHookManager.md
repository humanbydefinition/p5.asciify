# Class: P5AsciifyHookManager

Defined in: [HookManager.ts:18](https://github.com/humanbydefinition/p5.asciify/blob/a53da6374bc6fdee57adbabf14b68a3386934b61/src/lib/HookManager.ts#L18)

Manages `p5.js` lifecycle hooks for both `1.x.x` and `2.x.x` versions.
Handles automatic registration with `p5.js` and provides unified hook management

## Methods

### activateHook()

> **activateHook**(`hookType`): `void`

Defined in: [HookManager.ts:249](https://github.com/humanbydefinition/p5.asciify/blob/a53da6374bc6fdee57adbabf14b68a3386934b61/src/lib/HookManager.ts#L249)

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

Defined in: [HookManager.ts:263](https://github.com/humanbydefinition/p5.asciify/blob/a53da6374bc6fdee57adbabf14b68a3386934b61/src/lib/HookManager.ts#L263)

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

Defined in: [HookManager.ts:282](https://github.com/humanbydefinition/p5.asciify/blob/a53da6374bc6fdee57adbabf14b68a3386934b61/src/lib/HookManager.ts#L282)

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

Defined in: [HookManager.ts:30](https://github.com/humanbydefinition/p5.asciify/blob/a53da6374bc6fdee57adbabf14b68a3386934b61/src/lib/HookManager.ts#L30)

#### Returns

`P5AsciifyHookManager`
