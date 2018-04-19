const express = require('express');
const Sequelize = require("Sequelize");
const sqlite3 = require('sqlite3').verbose();
const handlebars = require("express-handlebars").create({
  defaultLayout: 'main'
});

const db = new sqlite3.Database("./Chinook_Sqlite_AutoIncrementPKs.sqlite");
