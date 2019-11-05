
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
        case 'UPDATE_USER_PROFILE_PICS': {
            return {
                ...state,
                profile_pic: action.payload
            }
        }
        case 'UPDATE_USER': {
            return {
                ...state,
                ...action.payload
            }
        }
    }
    return state
}

export const getUserDetails = (state) => {
    return state.user;
    // const details = state.user.userable
    // const social_links = details.social_links
    // return {
    //     ...state.user,
    //     userable: {
    //         ...details,
    //         [social_links]: JSON.parse(social_links),
    //     }
    // };
}