# Interface: P5AsciifyHookHandlers

Defined in: [types.ts:17](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/types.ts#L17)

Interface for core hook handlers

## Properties

| Property                                     | Type                                   | Defined in                                                                                                                        |
| -------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <a id="handleinit"></a> `handleInit`         | (`p`) => `void` \| `Promise`\<`void`\> | [types.ts:18](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/types.ts#L18) |
| <a id="handlepostdraw"></a> `handlePostDraw` | (`p`) => `void`                        | [types.ts:21](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/types.ts#L21) |
| <a id="handlepredraw"></a> `handlePreDraw`   | (`p`) => `void`                        | [types.ts:20](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/types.ts#L20) |
| <a id="handlesetup"></a> `handleSetup`       | (`p`) => `void` \| `Promise`\<`void`\> | [types.ts:19](https://github.com/humanbydefinition/p5.asciify/blob/cb82d4feac3bb434663d7aed2c64e2c64f0b3409/src/lib/types.ts#L19) |
