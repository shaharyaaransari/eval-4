const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../model/userModel");
const blacklistModel = require("../model/blacklistModel");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, password, city, age, gender ,is_married} = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).send({ "msg": "User already exist" })
        }else{
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(400).send({ "msg": err })
            } else {
                const user = new UserModel({ name, email, password: hash, city, age, gender ,is_married})
                await user.save()
                 res.status(200).send({ "msg": "User Added Successfully!", user })
            }
        });
    }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    var token = jwt.sign({ userID: user._id, user: user.name }, 'naruto', { expiresIn: "7d" });
                    res.status(200).send({ "msg": "logged in Successfully!", token })
                } else {
                    res.status(400).send({ "msg": "wrong crendentails" })
                }
            });
        } else {
            res.status(400).send({ "msg": "please provide valid email" })
        }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})



userRouter.get("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
        if (token) {
            await blacklistModel.create({ blacklist: token })
        }
        res.status(200).send({ "msg": 'user Logged out!' })
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})



module.exports = userRouter