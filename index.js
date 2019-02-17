const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('view', {
  autoescape: true,
  express: app,
  watch: true,
});

app.set('view engine', 'njk');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index'));

app.use((req, res, next) => {
  const { age } = req.body;
  if (age === '0' || undefined) {
    res.redirect('/');
  } else {
    next();
  }
});

app.post('/check', (req, res) => {
  const age = req.body.age[0];

  if (age >= 18) {
    res.redirect(`/major?age=${age}`);
  } else {
    res.redirect(`/minor?age=${age}`);
  }
});

app.get('/minor', (req, res) => {
  const idade = req.query.age;
  res.render('minor', { idade });
});

app.get('/major', (req, res) => {
  const idade = req.query.age;
  res.render('major', { idade });
});

app.listen(3000);
