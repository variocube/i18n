# i18n

Typescript library for internationalization.

It supports declaring messages in code referred to as internal messages. Translations to additional languages can be
provided in separate CSV files, referred to as external messages.

## Usage

### 1. Installation

```shell
npm install --save @variocube/i18n
```

### 2. Add configuration

Add the following items to the `package.json` of your project:

- An `i18n` configuration that supports the following properties:
    - `messages` *required*: The path to the source of the internal messages.
    - `languages` *optional*: Array of languages that the project wants to support (default: `["en", "de"]`)
- An invocation of the `i18n-sync` script that syncs external translation files.

```json
{
  "scripts": {
    "prebuild": "i18n-sync",
    "build": "tsc || webpack"
  },
  "i18n": {
    "messages": "./src/messages.ts",
    "languages": [
      "en",
      "de"
    ]
  }
}
```

### 3. Add messages

The source file declaring the internal messages must have a named export `messages` or a default export that provides an
instance of `Messages`.

```typescript
import {Messages} from "@variocube/i18n";

export const messages = new Messages("en", {
    hello: {
        en: "Hello world!",
    },
});
```

### 4. Initial sync

When the `i18n-sync` script is invoked (as part of the build), translation files are automatically generated in
the `i18n` directory as well a typescript source file `i18n/import.ts` that contains all translations as a typescript
module.

```shell
npx i18n-sync
```

### 5. Import translations

Once the file `i18n/import.ts` exists, you have to import it and pass its contents to the `Messages` constructor:

```typescript
import {Messages} from "@variocube/i18n";
import external from "./i18n/import.js"; // <-- import

export const messages = new Messages("en", {
  hello: {
    en: "Hello world!",
  },
}, external); // <-- pass it in
```

### 6. Translate and/or add new messages

Any new messages will automatically appear in the CSV files. Any translations added to CSV files will automatically
be available in source.

## Example

An example project can be found in [example](example) in this repository