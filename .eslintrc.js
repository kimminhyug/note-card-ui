module.exports = {
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/order': [
          'error',
          {
            groups: [
              ['use client', 'builtin', 'external'], // `use client` 맨 위에
              ['internal'],
              ['parent', 'sibling', 'index'],
            ],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
      },
    },
  ],
};
