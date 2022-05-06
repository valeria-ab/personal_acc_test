import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:3000',
});


export type LoginDomainDataType = {
    login: string;
    password: string;
    rememberMe: boolean;
};


export type ContactType = {
    id: string
    name: string
    isFollowed: boolean
}


export const authApi = {
    login() {
        return instance.get<Array<LoginDomainDataType>>('/authorization');
    }
};


export const contactsApi = {
    getContacts(searchValue: string) {
        const url = searchValue ? `contacts?q=${searchValue}` : 'contacts'
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
