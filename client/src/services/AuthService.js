import instance from "../api"

export default class AuthService {
    static async signIn(email, password) {
        return instance.post('/sign-in', {
            email,
            password
        })
    }

    static async signUp(firstName, lastName, email, password) {
        return instance.post('/sign-up', {
            firstName,
            lastName,
            email,
            password
        })
    }

    static async signOut() {
        return instance.post('/sign-out')
    }
}