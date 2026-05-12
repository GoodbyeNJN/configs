# @goodbyenjn/configs

A personal configuration set that includes Oxlint, Oxfmt, TypeScript, and other configurations.

## Usage

### Installation

```bash
npm install --save-dev @goodbyenjn/configs
# or
pnpm add -D @goodbyenjn/configs
# or
yarn add -D @goodbyenjn/configs
```

### Oxlint

This configuration provides a set of linting rules for [Oxlint](https://oxc.rs/), supporting JavaScript, TypeScript, React, and import configurations.

```bash
npm install --save-dev oxlint
# or
pnpm add -D oxlint
# or
yarn add -D oxlint
```

Create an `oxlint.config.ts` file in your project root and copy the following content into it:

```ts
import { withConfig } from "@goodbyenjn/configs/oxlint";

export default withConfig();
```

This configuration automatically enables corresponding rules based on whether `react` and `typescript` dependencies exist in your `package.json` file.

You can also manually override the configuration, for example:

```ts
import { withConfig } from "@goodbyenjn/configs/oxlint";

export default withConfig({
    // Disable TypeScript-related rules
    typescript: false,

    // Enable React-related rules
    react: true,
});
```

This configuration includes type definitions, providing intelligent prompts during configuration.

### Oxfmt

This configuration provides a set of formatting configurations for [Oxfmt](https://oxc.rs/), supporting JavaScript, TypeScript, JSX, JSON, JSONC, YAML, and other file formats.

```bash
npm install --save-dev oxfmt
# or
pnpm add -D oxfmt
# or
yarn add -D oxfmt
```

Create an `oxfmt.config.ts` file in your project root and copy the following content into it:

```ts
import { withConfig } from "@goodbyenjn/configs/oxfmt";

export default withConfig();
```

This configuration includes the following preset configurations:

- **defaults**: Default formatting options
- **imports**: Formatting rules for import statements
- **jsdoc**: Formatting rules for JSDoc comments
- **jsonc**: Formatting rules for JSONC files
- **pkg**: Formatting rules for package.json files
- **tailwind**: Sorting rules for Tailwind CSS class names
- **yaml**: Formatting rules for YAML files

You can also manually override the configuration, for example:

```ts
import { withConfig } from "@goodbyenjn/configs/oxfmt";

export default withConfig(
    {
        // Disable tailwind configuration
        tailwind: false,
    },
    {
        // Directly override oxfmt configuration
        lineWidth: 100,
    },
);
```

This configuration includes type definitions, providing intelligent prompts during configuration.

### TypeScript

```bash
npm install --save-dev typescript
# or
pnpm add -D typescript
# or
yarn add -D typescript
```

Create a `tsconfig.json` file in your project root and copy the following content into it:

```json
{
    "extends": "@goodbyenjn/configs/tsconfigs/<name>"
}
```

Where `<name>` can be one of the following values:

- `base`: Base configuration with most common configuration options.
- `react`: Extends `base` with React-related configurations, including `jsx` configuration and DOM-related libraries.
- `decorator`: Extends `base` with decorator-related configurations, including `emitDecoratorMetadata` and `experimentalDecorators` options.

## Versioning

**Note:** This project does **not** follow Semantic Versioning (semver). Instead, it uses a calendar-based versioning scheme:

**Version Format:** `v<YY>.<M>.<PATCH>`

- `<YY>` - Release year (e.g., 26 for 2026)
- `<M>` - Release month (1-12)
- `<PATCH>` - Patch/revision number within the same month (starting from 0)

**Example versions:**

- `v26.1.0` - First release in January 2026
- `v26.1.1` - Second release in January 2026
- `v26.2.0` - First release in February 2026

This scheme provides clarity on when features were released while allowing multiple updates within the same month.
