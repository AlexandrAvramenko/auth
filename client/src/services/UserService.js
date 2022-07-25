import instance from "../api"

export default class UserService {

    static async fetchUsers() {
        return instance.get('/users')
    }
}