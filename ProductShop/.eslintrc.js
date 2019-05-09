var OFF = 0, WARN = 1, ERROR = 2;

module.exports = { 
    "extends": "airbnb-base",
    "rules": {
        "linebreak-style": [ ERROR, "windows" ],
        "indent": [ ERROR, 4 ],
        "no-unused-vars": [ERROR, {"args": "after-used", "argsIgnorePattern": "^_"}],
        "no-underscore-dangle": [ERROR, { "allowAfterThis": true }],
        "func-names": [OFF],
    }
};