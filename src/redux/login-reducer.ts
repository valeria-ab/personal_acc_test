import {AnyAction, Dispatch} from 'redux';
import {authApi} from '../api/api';
import {ThunkAction} from 'redux-thunk'


export type LoginState = {
    isLoggedIn: boolean
    error: string | null
    // redirectToLogin: boolean
};

export const loginInitialState: LoginState = {
    isLoggedIn: false,
    error: null,
    // redirectToLogin: false,
};

export const loginReducer = (
    state: LoginState = loginInitialState,
    action: LoginActions
) => {
    switch (action.type) {
        case 'LOGIN/ERROR': {
            return {...state, error: action.error};
        }
        case 'LOGIN/REDIRECT-TO-LOGIN': {
            return {...state, redirectToLogin: action.value};
        }
        case 'LOGIN/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value};
        }
        default: {
            return state;
        }
    }
};

export const loginError = (error: string | null) => ({type: 'LOGIN/ERROR', error} as const);
export const redirectToLogin = (value: boolean) => ({type: 'LOGIN/REDIRECT-TO-LOGIN', value} as const);
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)

export type LoginActions =
    | ReturnType<typeof loginError>
    | ReturnType<typeof redirectToLogin>
    | ReturnType<typeof setIsLoggedInAC>

type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export const loginTC = (data: LoginDataType): any => (dispatch: Dispatch) => {

    authApi.login()
        .then(res => {
            const userData = res.data.find(obj => obj.login === data.email)
            if (userData) {
                if (userData.login === data.email && userData.password === data.password) {
                    dispatch(setIsLoggedInAC(true))
                } else {
                    dispatch(loginError("Incorrect login or password"))
                }

            } else {
                dispatch(loginError("User is not found"))
            }


        })
        .catch((error) => {
            // handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            // dispatch(setAppStatusAC("idle")));
        })
}


// export const checkAuthMe = () => (dispatch: Dispatch) => {
//     dispatch(setAppLoading("loading"))
//     authApi.me()
//         .then((res) => {
//             // dispatch(setAppLoading(false))
//             dispatch(setInitializedAC(true));
//             dispatch(setUserProfile(res.data))
//             dispatch(redirectToLogin(false))
//             dispatch(setErrorAC(null))
//         })
//         .catch((err) => {
//             console.log(err.response.data.error)
//             dispatch(redirectToLogin(true))
//         })
//         .finally(() => dispatch(setAppLoading("idle")))
// }



