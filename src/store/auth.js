export const auth = {
    state: {
        password: 0,
        loginState: false,
        userName: '',
        userId: 0,
    },
    getters: {
        GET_PASSWORD: (state) => {
            return state.password;
        },
        GET_LOGIN_STATE: (state) => {
            return state.loginState;
        },
        GET_USERNAME: (state) => {
            return state.userName;
        },
        GET_USERID: (state) => {
            return state.userId;
        },
    },
    actions: {
    },
    mutations: {
        SET_PASSWORD(state, value) {
            state.password = value;
        },
        SET_LOGIN_STATE(state, value) {
            state.loginState = value;
        },
        SET_USER_NAME(state, value) {
            state.userName = value;
        },
        SET_USER_ID(state, value) {
            state.userId = value;
        },
    },
    modules: {}
}