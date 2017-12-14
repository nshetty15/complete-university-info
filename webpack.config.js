module.exports ={
  entry : {
    common: './public/js/main.js',
    home: './public/js/page/home.js',
    about: './public/js/page/about.js'
  },
  output: {
    filename: './public/js/dist/[name].bundle.js'
  }
};