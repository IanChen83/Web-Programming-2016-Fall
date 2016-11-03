module.exports = {
    'extends': 'airbnb',
    'plugins': [
        'react',
        'jsx-a11y',
        'import',
    ],
    'rules': {
        'react/jsx-filename-extension': "off",
        'react/jsx-no-bind': "off",
        'no-mixed-operators': "off",
        "indent": ["error", 4],
        "keyword-spacing": "off",
        "func-names": "off",
        "object-shorthand": "off",
        "react/jsx-indent": [2, 4],
        "space-before-function-paren": "off",
        "object-curly-spacing": "off",
    },
    'env': {
        browser: true, // let 'window', 'document' defined
        jest: true,
    }
};
