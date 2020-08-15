var createError = require('http-errors');
var express = require('express');
bodyParser = require('body-parser');

var app = express();


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header('Access-Control-Allow-Headers: X-Requested-With');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//PROCESO DE LOGIN
app.post('/login', async (req, res, err) => {

  var username = req.body.username;
  var password = req.body.password;


  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'JAtj2711@',
    database: "schema_test"
  });
  connection.connect();
  let user_query = `SELECT email FROM usuarios WHERE email='${username}';`
  connection.query(user_query, function (err, rows) {
    
    if (err) {
      console.log(err);
    }


    if (rows.length > 0) {

      let sql_query = `SELECT * FROM usuarios WHERE email='${username}' AND password='${password}';`

      connection.query(sql_query, function (err, rowses) {
        if (err) {
          console.log(err);
        }

        if (rowses.length > 0) {
          return res.status(200).send(
            rowses
          )
        } else {
          return res.status(401).send({
            message: 'La contraseña no es la correcta!'
          })
        }
      })
      connection.end();

    } else {
      return res.status(402).send({
        message: 'El usuario no existe!'
      })


    }

  });



})


//PROCESO DE REGISTRO
app.post('/register', async (req, res, err) => {

      var username = req.body.username;
      var password = req.body.password;


      var mysql = require('mysql');
      var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'JAtj2711@',
        database: "schema_test"
      });
      connection.connect();
      let user_query = `SELECT email FROM usuarios WHERE email='${username}';`
      connection.query(user_query, function (err, rows) {
          if (err) {
            console.log(err);
          }


          if (rows.length == 0) {

            let sql_query = `INSERT INTO  usuarios (iduser, email, password, username) VALUES (NULL, '${username}', '${password}', NULL);`

            connection.query(sql_query, function (err, rowses) {
              if (err) {

                return res.status(401).send({
                  message: 'Ya existe un usuario con ese email!'
                })

              } else {
                return res.status(200).send({
                  message: 'Usuario registrado'
                })
              }
            })
            connection.end(); 
          }
          });
      })

// PORCESO DE LISTAR LOS DATOS DE USUARIOS

      app.get('/getuser', async (req, res, err) => {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'JAtj2711@',
          database: "schema_test"
        });
        connection.connect();
        let user_query = `SELECT * FROM usuarios;`
        connection.query(user_query, function (err, rows) {
            if (err) {
              console.log(err);
            }
            
            return res.status(200).send(
              rows
            )
            
          });
          connection.end(); 
        })

//PROCESO DE BORRADO DE DATOS
        app.post('/deleteUser', async (req, res, err) => {

          var idDelete = req.body.iduser;

          var mysql = require('mysql');
          var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'JAtj2711@',
            database: "schema_test"
          });

          connection.connect();

          let Duser_query = `DELETE FROM usuarios WHERE iduser=${idDelete};`
          connection.query(Duser_query, function (err, rows) {
            if (err) {
              console.log(err);
            }
        
            return res.status(200).send({
              message: 'epale mano'
            })    
            
          })
          connection.end(); 
        })


//PROCESO DE ACTUALIZACION A BASE DE DATOS
        app.post('/updateUser', async (req, res, err) => {

          var idDelete = req.body.iduser;
          var emailToUpdate = req.body.contEmailUpdate;
          var userToUpdate = req.body.contUserUpdate;

          var mysql = require('mysql');
          var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'JAtj2711@',
            database: "schema_test"
          });

          connection.connect();
          

          let Duser_query = `UPDATE usuarios SET email='${emailToUpdate}', username='${userToUpdate}' WHERE iduser=${idDelete};`
          connection.query(Duser_query, function (err, rows) {
            if (err) {
              console.log(err);
            }
        
            return res.status(200).send({
              message: 'epale mano'
            })    
            
          })
          connection.end(); 
        })

    module.exports = app;
