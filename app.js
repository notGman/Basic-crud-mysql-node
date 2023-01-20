const express = require("express");
const mysql = require("mysql2");
require("dotenv").config

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM Books";
  db.query(q, (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO Books(title,description,cover)VALUES(?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json("Inserted into table");
  });
});

app.delete("/books/:id", (req, res) => {
  const q = "DELETE FROM Books WHERE id=?";
  const value = req.params.id;
  db.query(q, [value], (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json("Deleted from table");
  });
});

app.put("/books/:id",(req,res)=>{
  const q = "UPDATE Books SET title=?, description=?, cover=? WHERE id=?"
  const bookId = req.params.id
  const values = [req.body.title,req.body.desc,req.body.cover]
  db.query(q,[...values,bookId],(err,data)=>{
    if (err) return res.status(404).json(err);
    return res.status(200).json("Updated book data");
  })
})

app.listen(3000, () => console.log("Listening to http://localhost:3000"));
