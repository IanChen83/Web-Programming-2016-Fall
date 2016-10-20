const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    entry: {
        index           : APP_DIR + '/TodoApp.jsx'
    },
    output: {
        path            : BUILD_DIR,
        filename        : '[name].entry.js',
        chunkFilename   : '[id].chunk.js',
    },
    module: {
        loaders: [
            {
                test    : /.jsx|.js/,
                include : APP_DIR,
                exclude : /node_modules/,
                loader  : 'babel-loader',
                query   : {
                    presets : ['latest', 'react'],
                    plugins : ['transform-object-rest-spread'],
                },
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    watch: true
};

module.exports = config;

