const autoprefixer = require('autoprefixer');
const path = require('path');

const webpackConfig = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: 'dist',
        publicPath: '',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    },
    toolbox: {
        theme: 'style/toolbox-theme.scss'
    }//,
    //postcss: [autoprefixer]
};

const PATHS_TO_TREAT_AS_CSS_MODULES = [
    'react-toolbox'
];

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`);

// Loaders for styles that need to be treated as CSS modules.
if (isUsingCSSModules) {
    const cssModulesLoader = [
        'css?sourceMap&-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'modules',
        'importLoaders=1',
        'localIdentName=[name]__[local]___[hash:base64:5]'
    ].join('&');

    webpackConfig.module.loaders.push({
        test: /\.scss$/,
        include: cssModulesRegex,
        loaders: [
            'style',
            cssModulesLoader,
            'postcss',
            'sass?sourceMap',
            'toolbox'
        ]
    });

    webpackConfig.module.loaders.push({
        test: /\.css$/,
        include: cssModulesRegex,
        loaders: [
            'style',
            cssModulesLoader,
            'postcss'
        ]
    })
}

// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false;
webpackConfig.module.loaders.push({
    test: /\.scss$/,
    exclude: excludeCSSModules,
    loaders: [
        'style',
        'css?sourceMap&-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
        'sass?sourceMap'
    ]
});
webpackConfig.module.loaders.push({
    test: /\.css$/,
    exclude: excludeCSSModules,
    loaders: [
        'style',
        'css?sourceMap&-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss'
    ]
});

webpackConfig.sassLoader = {
    includePaths: 'src/style'
};

module.exports = webpackConfig;