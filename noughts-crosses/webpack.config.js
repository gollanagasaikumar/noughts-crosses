module.exports = {

  module: {

    rules: [
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/ , use: [{loader:'babel-loader',options: {presets: ["@babel/preset-react"]}}] },
      { test: /\.css?$/, use: 'css-loader'},
	 
	  { test: /\.s[ac]ss$/i, exclude: /(node_modules|bower_components)/ , use: 'sass-loader'},
	  {test: /\.(png|svg|jpg|jpeg|gif|json|ico)$/, use: 'file-loader'}
    ]
  }
};