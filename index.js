const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
  })
);

app.use(express.static('public'));

app.get('/', (req, res) => {
  const buttons = [
    {
      label: 'Youtube'
    },
    {
      label: 'Facebook'
    }
  ];
  res.render('main', {
    layout: 'index',
    buttons,
    listExists: true
  });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
