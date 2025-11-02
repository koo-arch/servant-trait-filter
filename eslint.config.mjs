import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...storybook.configs["flat/recommended"],
  {
    ignores: [
      '.next/**',
      'out/**',
      'dist/**',
      'coverage/**',
      'src/stories/**',
      '**/*.stories.@(ts|tsx|js|jsx|mdx)',
      '**/__tests__/**',
      '**/*.test.@(ts|tsx|js|jsx)',
      '**/generated/**',
    ],
  }
];

export default eslintConfig;
