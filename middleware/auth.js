const jwt = require("jsonwebtoken")
const blacklistModel = require("../model/blacklistModel")
const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const existingToken = await blacklistModel.findOne({ blacklist: [token] })
        if (existingToken) {
            return res.status(400).send({ "msg": "please Login again!" })
        }
        if (token) {
            var decoded = jwt.verify(token, 'naruto');
            if (decoded) {
                req.body.userID = decoded.userID;
                req.body.user = decoded.user;
                next()
            } else {
                res.status(400).send({ "msg": " Aceess Denied please Login!" })
            }
        } else {
            res.status(400).send({ "msg": "please Login!" })
        }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }





}


module.exports = auth;