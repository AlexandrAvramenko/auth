const userService = require('../services/user-service');
const {
    validationResult
} = require('express-validator');

class authController {
    async signUp(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json(e)
            }
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body
            const userData = await userService.signUp(firstName, lastName, email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    async signIn(req, res) {
        try {
            const {
                email,
                password
            } = req.body
            const userData = await userService.signIn(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    async signOut(req, res) {
        try {
            const {
                refreshToken
            } = req.cookies;
            const token = await userService.signOut(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    async refresh(req, res) {
        try {
            const {
                refreshToken
            } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData);
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }
}

module.exports = new authController()