const path = require( 'path' );

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src') + '/index.ts',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [ '.html', '.ts', '.js', '.png', '.mp3' ],
    },
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
