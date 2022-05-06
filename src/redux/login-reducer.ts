import {Dispatch} from 'redux';
import {authApi} from '../api/api';


export type LoginState = {
    isLoggedIn: boolean
    error: string | null
};

export const loginInitialState: LoginState = {
    isLoggedIn: false,
    error: null,
};

export const loginReducer = (
    state: LoginState = loginInitialState,
    action: LoginActions
) => {
    switch (action.type) {
        case 'LOGIN/ERROR': {
            return {...state, error: action.error};
        }
        case 'LOGIN/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value};
        }
        default: {
            return state;
        }
    }
};

export const setError = (error: string | null) => ({type: 'LOGIN/ERROR', error} as const);
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)

export type LoginActions =
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsLoggedInAC>

type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<LoginActions>) => {

    authApi.login()
        .then(res => {
            const userData = res.data.find(obj => obj.login === data.email)
            if (userData) {
                if (userData.login === data.email && userData.password === data.password) {
                    dispatch(setIsLoggedInAC(true))
                } else {
                    dispatch(setError('Incorrect login or password'))
                }
            } else {
                dispatch(setError('User is not found'))
            }
        })
        .catch((err) => {
            dispatch(setError('Some error occurred'))
        })
}




