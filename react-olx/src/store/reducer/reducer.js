const INITIAL_STATES = {
    username: '',
    email: '',
    uid: '',
    errorMessage: '',
    loader: false,
    showError: false,
}




export default (state = INITIAL_STATES, action) => {
    switch (action.type) {

        case 'CHANGE_USERNAME':
            return ({
                ...state,
                username: action.payload,
            })

        case 'STOP_LOADER':
            return ({
                ...state,
                loader: !state.loader
            })

        case "CHANGE_LOADER":
            return ({
                ...state,
                loader: !state.loader
            })

        case "LOGGEDIN_USER":
            return ({
                ...state,
                email: action.payload.email,
                uid: action.payload.uid,
            })
        case "SHOW_ERROR":
            return ({
                ...state,
                showError: true,
                errorMessage: action.payload
            })
        case "REMOVE_ERROR":
            return ({
                ...state,
                showError: false,
                errorMessage: ''
            })

        default:
            return state;
    }
}