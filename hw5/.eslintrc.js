module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "indent": ["error", 4],
        "keyword-spacing": "off",
        "func-names": "off",
        "object-shorthand": "off",
        "react/jsx-indent": [2, 4],
        "space-before-function-paren": "off"
    },
    "env": {
        "browser": true
    }
};
