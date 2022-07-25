const UserModel = require("../models/user-model")
const bcrypt = require("bcryptjs")
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
    async signUp(firstName, lastName, email, password) {
        const candidate = await UserModel.findOne({
            email
        })
        if (candidate) {
            throw new Error(`User with email address ${email} already exists`);
        }
        const hashPassword = bcrypt.hashSync(password, 3);
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword
        })
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({
            ...userDto
        });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        await user.save()
        return {
            ...tokens,
            user: userDto
        }

    }

    async signIn(email, password) {
        const user = await UserModel.findOne({
            email
        })
        if (!user) {
            throw new Error(`User ${email} is not defined`);
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            throw new Error(`Wrong password entered`);
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({
            ...userDto
        });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async signOut(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error(`The user is not authorized`);
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new Error(`The user is not authorized`);
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({
            ...userDto
        });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();