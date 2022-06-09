const Users = require('../schema/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { jwtConstants } = require('../common/constants');

const signup = async (req, res) => {

    try {
        const { userName, email, phoneNumber, password } = req.body;
        let emailExists = await Users.findOne({ email })
        let userNameExists = await Users.findOne({ userName })
        let phoneNumberExists = await Users.findOne({ phoneNumber })
        if (userNameExists) {
            return res.json({
                status: 400,
                message: "Username Already Exists!"
            })
        }
        if (emailExists) {
            return res.json({
                status: 400,
                message: "Email Already Exists!"
            })
        }
        if (phoneNumberExists) {
            return res.json({
                status: 400,
                message: "Phonenumber Already Exists!"
            })
        }
        const users = new Users({
            ...req.body, password: await bcrypt.hash(password, saltRounds)
        })

        await users.save();

        return res.status(200).json({
            status: 200,
            data: users
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        let userExists = await Users.findOne({ $or: [{ email }, { userName: email }] })
        if (!userExists) {
            return res.json({ message: "User not found!" })
        }

        if (userExists) {
            let pwdCheck = bcrypt.compare(password, userExists.password);
            if (!pwdCheck) {
                return res.json({ message: "Password is invalid!" })
            }
            let userToken = jwt.sign({ _id: userExists._id }, jwtConstants.secretKey, { expiresIn: jwtConstants.exp_time })

            let userData = {
                userName: userExists.userName,
                email: userExists.email,
                phoneNumber: userExists.phoneNumber,
                userToken
            }   
            return res.status(200).json({
                status: 200,
                userData
            })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = { signup, signin }