module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    browser: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12
  },
  rules: {
    'prettier/prettier': 0,
    indent: 0,
    'no-const-assign': 2,
    'no-constant-condition': 2,
    'no-delete-var': 2,
    'no-dupe-keys': 2,
    'no-dupe-args': 2,
    'no-duplicate-case': 2,
    'no-else-return': 2,
    'no-empty': [2, { allowEmptyCatch: true }],
    'no-eq-null': 2,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-parens': 0,
    'no-extra-semi': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-irregular-whitespace': 2,
    'no-multiple-empty-lines': [1, { max: 3 }],
    'no-native-reassign': 2,
    'no-nested-ternary': 0,
    'no-new-object': 0,
    'no-new-wrappers': 2,
    'no-param-reassign': 2,
    'no-plusplus': 0,
    'no-process-env': 0,
    'no-prototype-builtins': 0,
    'no-redeclare': 2,
    'no-script-url': 2,
    'no-self-compare': 2,
    'no-sequences': 0,
    'no-shadow': 0,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-ternary': 0,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-unneeded-ternary': 2,
    'no-unused-vars': [2, { vars: 'all', args: 'after-used' }],
    'no-use-before-define': [
      0
      // interface存在互相引用问题，暂时无法解决，设置不报警
      // 2,
      // { functions: false, classes: false, variables: false }
    ],
    'no-var': 2,
    'arrow-parens': 0,
    'arrow-spacing': 2,
    'accessor-pairs': 0,
    'block-scoped-var': 2,
    'comma-dangle': [2, 'never'],
    'comma-spacing': 0,
    'comma-style': [2, 'last'],
    'consistent-return': 0,
    curly: [2, 'all'],
    'default-case': 2,
    'dot-notation': [2, { allowKeywords: true }],
    eqeqeq: 2,
    'func-names': [2, 'never'],
    'id-length': 0,
    'init-declarations': 0,
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    'lines-around-comment': 0,
    'object-curly-spacing': [2, 'always'],
    'operator-assignment': [0, 'always'],
    'operator-linebreak': [
      2,
      'after',
      { overrides: { '?': 'before', ':': 'before' } }
    ],
    'prefer-const': 0,
    quotes: [2, 'single'],
    'quote-props': [0, 'always'],
    semi: [2, 'never'],
    'semi-spacing': [2, { before: false, after: true }],
    'space-before-function-paren': [0, 'always'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, { words: true, nonwords: false }],
    'spaced-comment': 2,
    strict: 2,
    'use-isnan': 2,
    'valid-typeof': 2,
    'vars-on-top': 2,
    'wrap-iife': [2, 'inside'],
    yoda: [2, 'never'],
    // vue项目添加规则
    'vue/multi-word-component-names': [
      0,
      {
        ignore: ['index']
      }
    ]
  }
}
