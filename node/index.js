const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

app.use(express.json());

const mysql = require('mysql')
const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
  const sql = `delete from people`;
  connection.query(sql);
  const sql2 = `INSERT INTO people(name) values('Igor')`;
  connection.query(sql2);
  const sql3 = `INSERT INTO people(name) values('Minoru')`;
  connection.query(sql3);
  const sql4 = `INSERT INTO people(name) values('Tamura')`;
  connection.query(sql4);
  const query = 'SELECT * FROM people';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar itens:', err);
      res.status(500).json({ error: 'Erro ao buscar itens' });
    } else {
      const response = {
        message: '<h1>Full Cycle Rocks!</h1>',
        names: results
      };
      res.setHeader('Content-Type', 'text/html');
      res.json(response);
    }
  });
  connection.end();
}); 

app.listen(port, () => {
    console.log('Running on ' + port);
})