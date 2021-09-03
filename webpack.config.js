const path = require( 'path' );

module.exports = {
    // bundling mode
    mode: 'production',
    // entry files
    entry: path.resolve(__dirname, 'src') + '/index.ts',
    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.js',
    },
    // file resolutions
    resolve: {
        extensions: [ '.html', '.ts', '.js', '.png', '.mp3' ],
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.ts?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { 
                test: /\.js$/, 
                loader: "source-map-loader"
            },
            {
                test: /\.(png|jpg|gif|mp3)$/,
                use: 'file-loader',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },

    stats: { 
        errorDetails: true
    }
};
