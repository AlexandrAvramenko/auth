const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error(`The user is not authorized-1`);
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            throw new Error(`The user is not authorized-2`);
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            throw new Error(`The user is not authorized-3`);
        }

        req.user = userData;
        next();
    } catch (e) {
        throw new Error(`The user is not authorized-4`);
    }
};