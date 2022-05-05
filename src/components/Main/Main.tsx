import React, {FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {ContactType} from '../../api/api';
import {createContactTC, deleteContactTC, getContactsTC, updateContactTC} from '../../redux/contacts-reducer';
import {Button, Checkbox, dividerClasses, Grid, IconButton, Paper} from '@mui/material';
import {AddContact} from '../Modals/AddContact';
import {EditContact} from '../Modals/EditContact';
import {DeleteContact} from '../Modals/DeleteContact';
import SearchContainer from '../Search/SearchContainer';
import {Navigate} from 'react-router-dom';
import {Delete} from '@mui/icons-material';


const Main = React.memo(() => {
    const [modalModeOn, setModalModeOn] = useState(false)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn);


    const contacts = useSelector<AppRootStateType, Array<ContactType>>(state => state.contacts.contacts)
    const contactName = useSelector<AppRootStateType, string>(state => state.contacts.contactName)
    const dispatch = useDispatch()

    const onAddContactHandler = () => {
        setModalModeOn(true)
        // dispatch(createContactTC({id: "10", name: "Zina", isFriend: true}))
    }

    useEffect(() => {
        // isLoggedIn &&
        dispatch(getContactsTC())
    }, [contactName])


    // if (!isLoggedIn) {
    //     return <Navigate to={'/login'}/>;
    // }

    return (
        <>
            <SearchContainer/>
            <button onClick={onAddContactHandler}>+ add contact</button>
            {modalModeOn && <AddContact setAddMode={setModalModeOn}/>}

            <Grid container spacing={3} style={{padding: '20px'}}>

            </Grid>
            <Grid container spacing={3}>
                {
                    contacts.map(c => {

                        return <Grid item key={c.id}>
                            <Paper style={{padding: '10px'}}>
                                <Contact contact={c}/>

                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
});

export default Main;

export const Contact = (props: { contact: ContactType }) => {
    const [editModeOn, setEditModeOn] = useState(false)
    const [deleteModeOn, setDeleteModeOn] = useState(false)

    const onChangeContactHandler = () => {
        setEditModeOn(true)
    }

    const onDeleteContactHandler = () => {
        setDeleteModeOn(true)
    }

    return <div>
        {editModeOn && <EditContact setEditMode={setEditModeOn} contact={props.contact}/>}
        {deleteModeOn && <DeleteContact setDeleteMode={setDeleteModeOn} contact={props.contact}/>}
        <div>Name: {props.contact.name} </div>
        <div>Followed: {props.contact.isFollowed
            ? <Checkbox color={'secondary'}checked={true}/>
            : <Checkbox color={'secondary'}checked={false}/>
        } </div>
        <div>
            <Button onClick={onChangeContactHandler}>change</Button>
            <Button onClick={onDeleteContactHandler}>delete</Button>
            <IconButton onClick={onDeleteContactHandler}>
                <Delete/>
            </IconButton>
        </div>

    </div>

}