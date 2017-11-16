  const path = require('path');
  const express = require('express');

  //To not use ../ to go to public/index.html
  const publicPath = path.join(__dirname, '../public');
  const port = process.env.PORT || 3000;
  var app = express();

  app.use(express.static(publicPath));

  app.listen(port, () => {

    console.log(`Server is up on ${{port}}`);

  });
