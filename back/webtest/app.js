const express = require('express');
const app = express();
bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(fileUpload())


//PROCESO DE LOGIN
app.post('/login', async (req, res, err) => {

  var username = req.body.username;
  var password = req.body.password;

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'JAtj2711@',
    database: "database_ambit_pap"
  });
  connection.connect();
  let user_query = `SELECT email FROM user WHERE email='${username}';`
  connection.query(user_query, function (err, rows) {
    if (err) {
      console.log(err);
    }
    console.log("fila: ", rows);

    console.log("Objeto:", req.body);

    if (rows.length > 0) {

      let sql_query = `SELECT * FROM user WHERE email='${username}' AND password='${password}';`

      connection.query(sql_query, function (err, rowses) {
        if (err) {
          console.log(err);
        }
        console.log("fila de datos completos: ", rowses);

        if(rowses.length > 0){
          return res.status(200).send({
            message: 'Inicio de sesion exitoso!'
          })
        }else{
          return res.status(401).send({
            message: 'La contraseña no es la correcta!'
          })
        }

        connection.end();

      })



    } else {
      return res.status(402).send({
        message: 'El usuario no existe!'
      })


    }

  });
 


})


var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false
}

app.use(express.static('public', options));

app.listen(3000, () => console.log('Corriendo en el 3000'))

