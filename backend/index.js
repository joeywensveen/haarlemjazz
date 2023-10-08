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
    host: hostname,
    user: username,
    password,
    database,
    port,
})

// const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dt = new Date();
let day = dt.getDay();
let currentDate = dt.toLocaleDateString()
console.log(currentDate)
// today = weekday[day]





db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

db.query(`SELECT * FROM tasks WHERE uitvoerdag = "${day}"`).on("result", function (row) {
    console.log(row);
});

app.get("/tasks", (req, res) => {

    const sql = `SELECT * FROM tasks WHERE uitvoerdag = "${day}" OR uitvoerdatum ="${currentDate}"`
    console.log("got data")
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        const result = data
        res.json(result)
    })
})

app.get("/users", (req, res) => {
    const sql = `SELECT * FROM students`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        const result = data
        res.json(result)
    })
})

app.put("/updatetask/:taskid/:uitvoerder", (req, res) => {
    let d = new Date();
    let currentTime = (d.getUTCHours() + 2).toString() + ":" + d.getUTCMinutes().toString() + ":" + d.getUTCSeconds().toString()
    let taskId = req.params.taskid
    let uitvoerder = parseInt(req.params.uitvoerder)
    db.query(`UPDATE tasks SET aftekentijd = '${currentTime}', uitvoerder = ${uitvoerder}, uitgevoerd=1 WHERE id = '${taskId}'`, (err, data) => {
        if (err) return res.json(err)
        const result = data
        res.json(result)
    })
})

app.put("/addtask", (req, res) => {
    let taskId = req.params.taskid

    let taak = "Dit is een testtaak"
    let uitvoerder = 1
    let uitvoerdag = "Sunday"
    let uitvoertijd = "20:30"

    db.query(`INSERT INTO tasks(taak, uitvoerdag, uitvoerder, uitvoertijd, uitgevoerd) VALUES("${taak}","${uitvoerdag}", "${uitvoerder}", "${uitvoertijd}", 0)`, (err, data) => {
        if (err) return res.json(err)
        const result = data
        res.json(result)
    })
})

app.listen(3000, () => console.log("listening"))