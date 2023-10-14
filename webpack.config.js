const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true
}

const path2 = require('path')

module.exports = {
    mode: 'development',
    entry: './src/teams.js',
    output: {
        path: path2.resolve(__dirname, 'dist'),
        filename: 'bundleTeams.js'
    },
    watch: true
}