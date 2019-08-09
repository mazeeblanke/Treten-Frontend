
const INITIAL_STATE = {
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_AUTH': {
            return {
                ...state,
                ...action.payload.user
            }
        }
    }
    return state
}