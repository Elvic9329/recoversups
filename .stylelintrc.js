module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order'
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order'
  ],
  rules: {
    // SCSS specific rules
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/no-duplicate-dollar-variables': true,
    'scss/dollar-variable-pattern': '^rs-[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/percent-placeholder-pattern': '^rs-[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    
    // General CSS rules
    'indentation': 2,
    'max-nesting-depth': 4,
    'selector-max-compound-selectors': 4,
    'selector-max-id': 1,
    'selector-max-specificity': '0,3,2',
    'selector-max-universal': 1,
    'selector-no-qualifying-type': [true, { ignore: ['attribute'] }],
    
    // Property rules
    'property-no-unknown': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    
    // Color rules
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    
    // Font rules
    'font-family-name-quotes': 'always-where-recommended',
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    
    // Function rules
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-url-quotes': 'always',
    
    // String rules
    'string-no-newline': true,
    'string-quotes': 'single',
    
    // Length rules
    'length-zero-no-unit': true,
    
    // Unit rules
    'unit-case': 'lower',
    'unit-no-unknown': true,
    
    // Value rules
    'value-keyword-case': 'lower',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
    
    // Custom property rules
    'custom-property-pattern': '^rs-[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    
    // Shorthand property rules
    'shorthand-property-no-redundant-values': true,
    
    // Property order
    'order/properties-alphabetical-order': null,
    'order/order': [
      'custom-properties',
      'declarations'
    ]
  },
  ignoreFiles: [
    'node_modules/**',
    'dist/**',
    'build/**',
    '**/*.js',
    '**/*.liquid'
  ]
};