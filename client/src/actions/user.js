import AuthService from "../services/AuthService";
import {
    setUser,
    setAuth,
    setLoading
} from '../redusers/userReducer'
import axios from 'axios';

export const signIn = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const response = await AuthService.signIn(
                email,
                password,
            );
            localStorage.setItem("token", response.data.accessToken);
            dispatch(setUser(response.data.user));
            dispatch(setAuth(true));
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e.response.data.message);
        }
    };
};

export const signUp = (firstName, lastName, email, password) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const response = await AuthService.signUp(
                firstName,
                lastName,
                email,
                password,
            );
            localStorage.setItem("token", response.data.accessToken);
            dispatch(setUser(response.data.user));
            dispatch(setAuth(true));
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e.response.data.message);
        }
    };
};

export const signOut = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const response = await AuthService.signOut();
            console.log('response-signOut', response)
            localStorage.removeItem("token");
            dispatch(setAuth(false));
            dispatch(setUser({}));
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e.response.data.message);
        }
    };
};

export const checkAuth = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/refresh`, {
                withCredentials: true
            });
            console.log('response', response)
            localStorage.setItem("token", response.data.accessToken);
            dispatch(setUser(response.data.user));
            dispatch(setAuth(true));
        } catch (e) {
            console.log(e.response.data.message);
        }
    };
};