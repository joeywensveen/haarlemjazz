const express = require("express")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(express.json())
app.use(cors())

var hostname = "9fn.h.filess.io"
var database = "CRUD_waitnumber"
var port = "3307"
var username = "CRUD_waitnumber"
var password = "833bbb44b1eddf4e8ead135e291c764124fbde83"

var db = mysql.createConnection({
    host:hostname,
    user: username,
    password,
    database,
    port,
})

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let day = d.getDay();
today = weekday[day]

console.log(today)



db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
  db.query(`SELECT * FROM tasks WHERE uitvoerdag = "${today}"`).on("result", function (row) {
      console.log(row);
    });

    app.get("/tasks", (req,res)=>{
        
        const sql = `SELECT * FROM tasks WHERE uitvoerdag = "${today}"`
        db.query(sql,(err,data) =>{
            if(err) return res.json(err)
            const result = data
            res.json(result)
        })
    })

    app.get("/users", (req,res)=>{
        const sql = `SELECT * FROM students`
        db.query(sql,(err,data) =>{
            if(err) return res.json(err)
            const result = data
            res.json(result)
        })
    })

app.listen(3000, () => console.log("listening"))