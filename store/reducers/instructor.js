
const INITIAL_STATE = {
    successfullyRegistered: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'REGISTRATION_REQUEST': {
            return {
                ...state,
                successfullyRegistered: action.payload
            }
        }
        default:
            return state;
    }
}