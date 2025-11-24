const initState = {
    user: null,
}

export default function authenticationReducer(state = initState, authAction) {
    switch (authAction.type) {
        case "SIGNIN_USER":
            return { ...state, user: authAction.payload};
        case "LOG_OUT":
            return { 
                user: null,
            };
        default:
            return state;
    }
}