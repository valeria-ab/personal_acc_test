import {AnyAction} from 'redux';
import {contactsApi, ContactType} from '../api/api';
import {AppRootStateType} from './store';
import {setError} from './login-reducer';
import {ThunkAction} from 'redux-thunk';


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
    | ReturnType<typeof setError>


// thunk
export const getContactsTC = (): ThunkAction<void, AppRootStateType, unknown, AnyAction> =>

    (dispatch, getState: () => AppRootStateType) => {
        const {contactName} = getState().contacts;
        contactsApi.getContacts(contactName)
            .then((res) => {
                dispatch(setContactsAC(res.data))
            })
            .catch((err) => {
                dispatch(setError('Some error occurred'))
            })
    }

export const createContactTC = (payload: ContactType): ThunkAction<void, AppRootStateType, unknown, AnyAction> =>
    (dispatch) => {
        contactsApi.createContact(payload)
            .then((res) => {
                dispatch(getContactsTC())
            })
            .catch((err) => {
                dispatch(setError('Some error occurred'))
            })
    }


export const deleteContactTC = (contactID: string): ThunkAction<void, AppRootStateType, unknown, AnyAction> =>
    (dispatch) => {
        contactsApi.deleteContact(contactID)
            .then((res) => {
                dispatch(getContactsTC())
            })
            .catch((err) => {
                dispatch(setError('Some error occurred'))
            })
    }


export const updateContactTC = (payload: ContactType): ThunkAction<void, AppRootStateType, unknown, AnyAction> =>

    (dispatch, getState: () => AppRootStateType) => {
        contactsApi.updateContact(payload)
            .then((res) => {
                dispatch(getContactsTC())
            })
            .catch((err) => {
                dispatch(setError('Some error occurred'))
            })
    }







