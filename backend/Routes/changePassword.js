const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { authorizer } = require("../utils/auth");

const User = require("../Models/userModel");
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const { sendEmail } = require("../utils/utils");

const nodemailer = require('nodemailer')


router.post('/forgot-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ message: "User dont exists with that email" })
                }
                user.resetToken = token
                user.tokenExpireTime = Date.now() + 3600000  //3600000= 1hr
                user.save().then((result) => {
                    // transporter.sendMail({
                    //     to: user.email,
                    //     from: "no-replay@insta.com",
                    //     subject: "password reset",
                    //     html: `
                    //     <p>You requested for password reset</p>
                    //     <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    //     `
                    // })
                    res.json({ message: "check your email" })

                    sendEmail(req.body.email, token);
                })

            })
    })
})


router.post('/reset-password/:token', (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.params.token
    User.findOne({ resetToken: sentToken, tokenExpireTime: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "Try again session expired" })
            }
            bcrypt.hash(newPassword, 9).then(hashedpassword => {
                user.password = hashedpassword
                user.resetToken = undefined
                user.tokenExpireTime = undefined
                user.save().then((saveduser) => {
                    res.json({ message: "password updated success" })
                })
            })
        }).catch(err => {
            console.log(err)
        })
})
router.post('/change-password', authorizer, (req, res) => {
    const currentPassword = req.body.currentPassword
    const newPassword = req.body.newPassword
    const _id = req.body._id
    User.findOne({ _id: _id })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "User dont exists with that email" })
            }
            bcrypt.compare(currentPassword, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        bcrypt.hash(newPassword, 9).then(hashedpassword => {
                            user.password = hashedpassword
                            user.save().then((saveduser) => {
                                res.json({ message: "password updated success" })
                            })
                        })
                    } else {
                        return res.status(422).json({ message: "Old password is incorrect" })
                    }
                })
        })
})

module.exports = router