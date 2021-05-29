const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())

app.get("/", (req, res) => {
    console.log("App Started")
})

//Create random number
var getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post("/authenticate", (req, res) => {
    console.log("Hit: Authentication")
    let db = [
        ["meiy", "passmeiy"],
        ["bharath", "bharath"],
        ["suganes", "suganes"]
    ]
    let username = req.body.username,
        password = req.body.password
    for (i = 0; i < db.length; i++) {
        if (db[i][0] == username) {
            if (db[i][1] == password) {
                res.json({
                    "Message": "Success"
                })
                break
            } else {
                res.json({
                    "Message": "Invalid Password"
                })
                break
            }
        } else {
            res.json({
                "Message": "No Such User"
            })
            break
        }
    }
})


app.get("/requestProblems", (req, res) => {
    console.log("Hit: Request Problems")
    var min = 0,
        max = 100,
        addition = [],
        subtraction = []
    for (i = 1; i <= 50; i++) {
        var num1 = getRandom(min, max),
            num2 = getRandom(min, max),
            add = num1 + num2,
            sub = num1 - num2
        //addition.push([num1 + " + " + num2, add])
        addition.push([num1 + " - " + num2, sub])
            //subtraction.push([num1 + " - " + num2, sub])
    }
    res.json({
        "Mentor": "Meiy",
        "Student": ["Bharath", "Suganes"],
        "Addition": addition,
        "Subtraction": subtraction
    })
})
let port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("App runs at ", port)
})
