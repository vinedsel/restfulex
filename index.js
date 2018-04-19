const cors = require("cors");
const express = require('express');
const Sequelize = require("Sequelize");
const sqlite3 = require('sqlite3').verbose();
const handlebars = require("express-handlebars").create({
  defaultLayout: 'main'
});

const sequelize = new Sequelize('database', 'username', null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: "./Chinook_Sqlite_AutoIncrementPKs.sqlite"
});

const app = express();

const db = new sqlite3.Database("./Chinook_Sqlite_AutoIncrementPKs.sqlite");

app.use(require("body-parser")());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// app.get('/view', cors(), function (req, res) {
//   res.send("This route is CORS enabled!");
// });


// CODE BLOCKS

// // Get all artists
// app.get("/api/v1/artists", (req, res) => {
//   req.getConnection((err, connection) => {
//     const query = connection.query("SELECT * FROM Artist", (err, rows) => {
//       if (err) return res.send(500, "Error occurred: database error.");
//       res.json(
//         rows.map(artist => {
//           return {
//             ArtistId: artist.ArtistId,
//             Name: artist.Name
//           };
//         })
//       );
//     });
//   });
// });
//
// // Get single Artist by Id
// app.get("/api/v1/artists/:id", (req, res) => {
//   req.getConnection((err, connection) => {
//     const query = connection.query(
//       "SELECT * FROM Artist WHERE ArtistId=1",
//       (err, artist) => {
//         if (err) return res.send(500, "Error occurred: database error.");
//         res.json({
//           ArtistId: artist.ArtistId,
//           Name: artist.Name
//         });
//       }
//     );
//   });
// });


const Artist = sequelize.define(
  "Artist", {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: Sequelize.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });

const Album = sequelize.define(
  "Album", {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Title: Sequelize.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });

  Artist.hasMany(Album, {foreignKey: 'ArtistId'});
  Album.belongsTo(Artist, {foreignKey: 'ArtistId'});
    app.get('/', (req, res) => {
      Album.findAll({
          include: [
              {
                  model: Artist
              }
          ]
      }).then(albums => {
          res.render('view', {results: albums})
      });
  });




app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
