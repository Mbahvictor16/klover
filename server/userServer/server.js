const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const users = require("./db/db")

const app = express()

mongoose.connect("mongodb://127.0.0.1/KloverAnalytics")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.post('/register', async (req, res) => {
    const {fullname, email, password} = req.body
    const lowerCaseEmail = email.toLowerCase()
    const trimFullName = fullname.trim()
    const findUserByEmail = await users.findOne({ email: lowerCaseEmail})
    const hashpscd = await bcrypt.hash(password, 10)

    if (findUserByEmail) {
        return res.json({status: "failed"})
    }
    const newUser = new users({name: trimFullName, email: lowerCaseEmail, password: hashpscd})
    await newUser.save()
    res.json({status: "ok"})
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    const lowerCaseEmail = email.toLowerCase()
    const findUserByEmail = await users.findOne({ email: lowerCaseEmail })

    if(findUserByEmail) {
        const checkPassword = await bcrypt.compare(password, findUserByEmail.password)

        if (checkPassword) {
            return res.json({status: "ok", id: findUserByEmail.id})
        }

        return res.json({status: "failed"})
    }

    return res.json({status: "failed"})
})


app.listen(8000)


