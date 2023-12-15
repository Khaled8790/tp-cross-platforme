const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'iset',
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connexion à la base de données réussie!');
  }
});

app.post('/connexion', (req, res) => {
  const { login, password } = req.body;

  const query = `SELECT * FROM user WHERE login = ? AND mot_de_passe = ?`;

  db.query(query, [login, password], (err, results) => {
    if (err) {
      console.error('Erreur de requête:', err);
      res.status(500).send('Erreur de serveur');
    } else {
      if (results.length > 0) {
        res.status(200).send('Connexion réussie!');
      } else {
        res.status(401).send('Identifiants incorrects');
      }
    }
  });
});


// New endpoint to get the list of students
app.get('/etudiant', (req, res) => {
  const query = 'SELECT * FROM etudiant';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur de requête:', err);
      res.status(500).send('Erreur de serveur');
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
