module.exports ={
  entry : {
    common: './public/js/common.js',
    home: './public/js/home.js',
    about: './public/js/about.js'
  },
  output: {
    filename: './public/dist/js/[name].bundle.js'
  }
  // entry: './public/js/common.js',
  // output: {
  //   filename: './public/dist/js/commons.bundle.js',
  // }
};