const express = require('express');
const handlebars = require("express-handlebars").create({
  defaultLayout: 'main'
});

const db = new sqlite3.Database("./Chinook_Sqlite_AutoIncrementPKs.sqlite");
