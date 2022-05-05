import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // withCredentials: true,
});


export type LoginDomainDataType = {
    login: string;
    password: string;
    rememberMe: boolean;
};

export type UserDataDomainType = {
    id: string;
    login: string;
};
export type LogOutType = {
    info: string;
    error: string;
};
export type ContactType = {
    id: string
    name: string
    isFollowed: boolean
}

//request to server
export type PacksType = {
    contactName: string
}
// response form server
export type PacksResponseType = {
    cardPacks: ContactType[]
    cardPacksTotalCount: number
}
export type UpdatePacksResponseType = {
    updatedCardsPack: {}
}
export type CreatePacksResponseType = {
    newCardsPack: {}
}
export type UpdatePacksType = {
    _id: string
    name: string
}


export const authApi = {
    login() {
        return instance.get<Array<LoginDomainDataType>>('/authorization');
    },
    logOut() {
        return instance.delete<LogOutType>('/authorization');
    },
    me() {
        return instance.post<UserDataDomainType>('/authorization', {});
    },

};


export const contactsApi = {
    getContacts(searchValue: string) { // промис со всеми паками
        const url = searchValue? `contacts?q=${searchValue}` : 'contacts'
        return instance.get<Array<ContactType>>(url);
    },
    createContact(payload: ContactType) {
        return instance.post<ContactType>('contacts', payload);
    },
    deleteContact(contactID: string) {
        return instance.delete(`contacts/${contactID}`,
        );
    },
    updateContact(payload: ContactType) {
        return instance.put(`contacts/${payload.id}`, payload);
    },
};
