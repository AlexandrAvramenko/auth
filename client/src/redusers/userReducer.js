const SET_USER = "SET_USER";
const SET_AUTH = "SET_AUTH";
const SET_LOADING = "ET_LOADING";

const defaultState = {
    user: {},
    isAuth: false,
    isLoading: false,
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state, user: action.payload

            };
        case SET_AUTH:
            return {
                ...state, isAuth: action.payload

            };
        case SET_LOADING:
            return {
                ...state, isLoading: action.payload
            };
        default:
            return state
    }
}

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});
export const setAuth = (isAuth) => ({
    type: SET_AUTH,
    payload: isAuth
});
export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading
});

export default userReducer