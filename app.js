const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const handlebars = require('express-handlebars');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

const app = express();
const PORT = 3000;

app.use(connectLiveReload());

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
  let xPos = 1.5;

  const buttons = [
    {
      label: 'Youtube'
    },
    {
      label: 'Facebook'
    },
    {
      label: 'Instagram'
    },
    {
      label: 'Twitter'
    },
    {
      label: 'Patreon'
    }
  ].map((button) => {
    xPos += 0.6;

    return {
      ...button,
      position: `${xPos} 1 1`
    };
  });

  res.render('main', {
    layout: 'index',
    buttons,
    names: ['Joe', 'Lisa', 'Bob']
  });
});

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
