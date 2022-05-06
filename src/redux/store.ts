import {applyMiddleware, combineReducers, createStore} from 'redux';
import {loginReducer} from './login-reducer';
import thunkMiddleware from 'redux-thunk';
import {contactsReducer} from './contacts-reducer';



const rootReducer = combineReducers({
    login: loginReducer,
    contacts: contactsReducer
});


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
