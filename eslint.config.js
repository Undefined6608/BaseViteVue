import globals from "globals";
import parser from "@typescript-eslint/parser";
import pluginTs from "@typescript-eslint/eslint-plugin";
import pluginVue from "eslint-plugin-vue";
import pluginImport from "eslint-plugin-import";
import unicorn from "eslint-plugin-unicorn";
import eslintComments from "eslint-plugin-eslint-comments";
import tailwindcss from "eslint-plugin-tailwindcss";
import vueParser from "vue-eslint-parser";

export default [
  { ignores: ["dist/**", "node_modules/**", "*.config.js"] },
  {
    files: ["**/*.{ts,tsx}"],
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: new URL(".", import.meta.url),
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": pluginTs,
      import: pluginImport,
      tailwindcss,
      unicorn,
      "eslint-comments": eslintComments,
    },
    rules: {
      // -------------------- 基础语法和风格 --------------------

      // 强制使用双引号，允许转义避免冲突
      quotes: ["error", "double", { avoidEscape: true }],

      // 语句末尾必须有分号
      semi: ["error", "always"],

      // -------------------- TypeScript 相关规则 --------------------

      // 要求函数必须显式声明返回值类型，防止隐式 any
      "@typescript-eslint/explicit-function-return-type": ["error"],

      // 禁止使用 any 类型，提升类型安全
      "@typescript-eslint/no-explicit-any": "error",

      // 禁止未处理的 Promise（忘写 await 或 .then）
      "@typescript-eslint/no-floating-promises": "error",

      // 禁止错误使用 async 函数（如 if 判断中）
      "@typescript-eslint/no-misused-promises": "error",

      // 统一使用 `import type` 导入类型，优化性能
      "@typescript-eslint/consistent-type-imports": "error",

      // 建议将不变的变量或属性声明为 readonly，提升不可变性
      "@typescript-eslint/prefer-readonly": "warn",

      // -------------------- JavaScript 基础规则 --------------------
      // 禁止使用 console.log，警告提示避免遗留调试代码
      "no-console": "warn",

      // 禁止 debugger，避免调试遗留
      "no-debugger": "error",

      // 空函数警告，防止代码未完成或冗余
      "no-empty-function": "warn",

      // 优先使用 const 声明不会被重新赋值的变量
      "prefer-const": "error",

      // 强制使用严格相等 ===，避免隐式类型转换
      eqeqeq: ["error", "always"],

      // 警告禁止隐式类型转换，如 !!foo、+value
      "no-implicit-coercion": "warn",

      // 最大嵌套深度限制，防止函数过于复杂
      "max-depth": ["warn", 4],

      // 函数复杂度限制，控制圈复杂度不超过 10
      complexity: ["warn", 10],

      // 禁止魔法数字，建议使用具名常量，忽略 0 和 1，数组索引除外
      // "no-magic-numbers": [
      //   "warn",
      //   {
      //     ignore: [0, 1],
      //     ignoreArrayIndexes: true,
      //     enforceConst: true,
      //   },
      // ],

      // 禁止未使用变量，参数名前缀为 _ 的忽略警告
      "no-unused-vars": "off", // 关闭原生规则
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // 用 ts 规则替代

      // -------------------- Tailwind CSS --------------------

      // 检查 Tailwind CSS 类名排序，保持统一风格
      "tailwindcss/classnames-order": "warn",

      // -------------------- import 相关规则 --------------------
      // import 排序规则，分组且字母序
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // 规范导入
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],

      // 确保导入的模块路径存在，防止拼写错误
      "import/no-unresolved": "error",

      // 禁止重复导入模块
      "import/no-duplicates": "error",

      // -------------------- ESLint 注释规则 --------------------

      // 禁止无用的 eslint-disable 注释，避免滥用
      "eslint-comments/no-unused-disable": "error",

      // -------------------- unicorn 插件最佳实践 --------------------

      // 建议用三元表达式简化条件赋值
      "unicorn/prefer-ternary": "warn",

      // 建议避免使用 reduce，改用更易读的循环或 map/forEach
      "unicorn/no-array-reduce": "warn",

      // 尽量避免使用 null，推荐使用 undefined 或空对象
      "unicorn/no-null": "warn",

      // 文件命名规则，支持 kebab-case、camelCase、PascalCase
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/*.vue"],
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: parser,
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      vue: pluginVue,
      import: pluginImport,
      tailwindcss,
      unicorn,
      "eslint-comments": eslintComments,
    },
    rules: {
      // Vue 组件命名风格（按需开启）
      "vue/multi-word-component-names": "error",

      // -------------------- 基础语法和风格 --------------------

      // 强制使用双引号，允许转义避免冲突
      quotes: ["error", "double", { avoidEscape: true }],

      // 语句末尾必须有分号
      semi: ["error", "always"],

      // -------------------- JavaScript 基础规则 --------------------
      // 禁止使用 console.log，警告提示避免遗留调试代码
      "no-console": "warn",

      // 禁止 debugger，避免调试遗留
      "no-debugger": "error",

      // 空函数警告，防止代码未完成或冗余
      "no-empty-function": "warn",

      // 优先使用 const 声明不会被重新赋值的变量
      "prefer-const": "error",

      // 强制使用严格相等 ===，避免隐式类型转换
      eqeqeq: ["error", "always"],

      // 警告禁止隐式类型转换，如 !!foo、+value
      "no-implicit-coercion": "warn",

      // 最大嵌套深度限制，防止函数过于复杂
      "max-depth": ["warn", 4],

      // 函数复杂度限制，控制圈复杂度不超过 10
      complexity: ["warn", 10],

      // 禁止魔法数字，建议使用具名常量，忽略 0 和 1，数组索引除外
      // "no-magic-numbers": [
      //   "warn",
      //   {
      //     ignore: [0, 1],
      //     ignoreArrayIndexes: true,
      //     enforceConst: true,
      //   },
      // ],

      // 禁止未使用变量，参数名前缀为 _ 的忽略警告
      "no-unused-vars": "off", // 关闭原生规则

      // -------------------- Tailwind CSS --------------------

      // 检查 Tailwind CSS 类名排序，保持统一风格
      "tailwindcss/classnames-order": "warn",

      // -------------------- import 相关规则 --------------------
      // import 排序规则，分组且字母序
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // 规范导入
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],

      // 确保导入的模块路径存在，防止拼写错误
      "import/no-unresolved": "error",

      // 禁止重复导入模块
      "import/no-duplicates": "error",

      // -------------------- ESLint 注释规则 --------------------

      // 禁止无用的 eslint-disable 注释，避免滥用
      "eslint-comments/no-unused-disable": "error",

      // -------------------- unicorn 插件最佳实践 --------------------

      // 建议用三元表达式简化条件赋值
      "unicorn/prefer-ternary": "warn",

      // 建议避免使用 reduce，改用更易读的循环或 map/forEach
      "unicorn/no-array-reduce": "warn",

      // 尽量避免使用 null，推荐使用 undefined 或空对象
      "unicorn/no-null": "warn",

      // 文件命名规则，支持 kebab-case、camelCase、PascalCase
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
    },
  },
];
