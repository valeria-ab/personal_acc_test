import {AnyAction, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';


import {contactsApi, ContactType} from '../api/api';
import {AppRootStateType} from './store';
import {LoginActions} from './login-reducer';


export type InitialStateType = {
    contacts: Array<ContactType>
    contactName: string //for search
}

const initialState: InitialStateType = {
    contacts: [] as Array<ContactType>,
    contactName: '',
};

export const contactsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CONTACTS/SET-CONTACTS':
            // debugger
            return {...state, contacts: action.payload}

        case 'CONTACTS/SET-SEARCH-CONTACT-NAME':
            return {...state, contactName: action.contactName}

        default:
            return state;
    }
};


export const setContactsAC = (payload: Array<ContactType>) => ({
    type: 'CONTACTS/SET-CONTACTS', payload
} as const);
export const setSearchContactNameAC = (contactName: string) =>
    ({type: 'CONTACTS/SET-SEARCH-CONTACT-NAME', contactName} as const)



type ActionsType =
    | ReturnType<typeof setContactsAC>
    | ReturnType<typeof setSearchContactNameAC>




// thunk
export const getContactsTC = (): any  =>
    // ThunkAction<void, AppRootStateType, unknown, AnyAction>

    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const {contactName} = getState().contacts;

        // dispatch(setAppLoading('loading'))

        contactsApi.getContacts(contactName)
            .then((res) => {
                dispatch(setContactsAC(res.data))
                console.log(res)
            })
            // .catch((err) => {
            //     dispatch(setErrorAC(err.response.data.error))
            //     if (err.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
            //         dispatch(setInitializedAC(false))
            //         dispatch(setUserProfile({
            //             _id: '',
            //             email: '',
            //             name: '',
            //             avatar: '',
            //             publicCardPacksCount: 0,
            //             created: '',
            //             updated: '',
            //             isAdmin: false,
            //             verified: false,
            //             rememberMe: false,
            //             error: '',
            //             token: '',
            //             tokenDeathTime: 0,
            //             __v: 0
            //         }));
            //         dispatch(setCardPacksPageCountAC(10))
            //         dispatch(setCardsPageCountAC(10))
            //         dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
            //         dispatch(redirectToLogin(true))
            //
            //         dispatch(setWithMyIdAC(true))
            //         dispatch(changeLayoutAC('profile'))
            //         dispatch(setSortPacksValueAC(''))
            //     }
            // })
            // .finally(() => dispatch(setAppLoading('idle')))

    }

export const createContactTC = ( payload: ContactType): any    =>
    // ThunkAction<void, AppRootStateType, unknown, AnyAction>
  (dispatch: Dispatch) => {
    // dispatch(setAppLoading('loading'))
    contactsApi.createContact(payload)
        .then((res) => {
            dispatch(getContactsTC())
        })
        // .catch((err) => {
        //     dispatch(setErrorAC(err.response.data.error))
        //     if (err.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
        //         dispatch(setInitializedAC(false))
        //         dispatch(setUserProfile({
        //             _id: '',
        //             email: '',
        //             name: '',
        //             avatar: '',
        //             publicCardPacksCount: 0,
        //             created: '',
        //             updated: '',
        //             isAdmin: false,
        //             verified: false,
        //             rememberMe: false,
        //             error: '',
        //             token: '',
        //             tokenDeathTime: 0,
        //             __v: 0
        //         }));
        //         dispatch(setCardPacksPageCountAC(10))
        //         dispatch(setCardsPageCountAC(10))
        //         dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
        //         dispatch(redirectToLogin(true))
        //
        //         dispatch(setWithMyIdAC(true))
        //         dispatch(changeLayoutAC('profile'))
        //         dispatch(setSortPacksValueAC(''))
        //     }
        // })
        // .finally(() => dispatch(setAppLoading('idle')))
}


export const deleteContactTC = (contactID: string): any=>
// ThunkAction<void, AppRootStateType, unknown, AnyAction>
(dispatch: Dispatch) => {
    // dispatch(setAppLoading('loading'))
    contactsApi.deleteContact(contactID)
        .then((res) => {
            dispatch(getContactsTC())
        })
        // .catch((err) => {
        //     dispatch(setErrorAC(err.response.data.error))
        //     if (err.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
        //         dispatch(setInitializedAC(false))
        //         dispatch(setUserProfile({
        //             _id: '',
        //             email: '',
        //             name: '',
        //             avatar: '',
        //             publicCardPacksCount: 0,
        //             created: '',
        //             updated: '',
        //             isAdmin: false,
        //             verified: false,
        //             rememberMe: false,
        //             error: '',
        //             token: '',
        //             tokenDeathTime: 0,
        //             __v: 0
        //         }));
        //         dispatch(setCardPacksPageCountAC(10))
        //         dispatch(setCardsPageCountAC(10))
        //         dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
        //         dispatch(redirectToLogin(true))
        //
        //         dispatch(setWithMyIdAC(true))
        //         dispatch(changeLayoutAC('profile'))
        //         dispatch(setSortPacksValueAC(''))
        //     }
        // })
        // .finally(() => dispatch(setAppLoading('idle')))
}


export const updateContactTC = (payload: ContactType): any =>
    // ThunkAction<void, AppRootStateType, unknown, AnyAction>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    // dispatch(setAppLoading('loading'))
    contactsApi.updateContact(payload)
        .then((res) => {
            dispatch(getContactsTC())
        })
        // .catch((err) => {
        //     dispatch(setErrorAC(err.response.data.error))
        //     if (err.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
        //         dispatch(setInitializedAC(false))
        //         dispatch(setUserProfile({
        //             _id: '',
        //             email: '',
        //             name: '',
        //             avatar: '',
        //             publicCardPacksCount: 0,
        //             created: '',
        //             updated: '',
        //             isAdmin: false,
        //             verified: false,
        //             rememberMe: false,
        //             error: '',
        //             token: '',
        //             tokenDeathTime: 0,
        //             __v: 0
        //         }));
        //         dispatch(setCardPacksPageCountAC(10))
        //         dispatch(setCardsPageCountAC(10))
        //         dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
        //         dispatch(redirectToLogin(true))
        //
        //         dispatch(setWithMyIdAC(true))
        //         dispatch(changeLayoutAC('profile'))
        //         dispatch(setSortPacksValueAC(''))
        //     }
        // })
        // .finally(() => dispatch(setAppLoading('idle')))
}







