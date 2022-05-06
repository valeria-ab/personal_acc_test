import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import {ContactType} from '../api/api';
import {getContactsTC} from '../redux/contacts-reducer';
import {Button, Grid, Paper} from '@mui/material';
import {AddContact} from './Modals/AddContact';
import SearchContainer from './Search/SearchContainer';
import {Navigate, useNavigate} from 'react-router-dom';
import {Contact} from './Contact';


const Main = React.memo(() => {
    const [modalModeOn, setModalModeOn] = useState(false)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn);


    const contacts = useSelector<AppRootStateType, Array<ContactType>>(state => state.contacts.contacts)
    const contactName = useSelector<AppRootStateType, string>(state => state.contacts.contactName)
    const dispatch = useDispatch()

    const onAddContactHandler = () => {
        setModalModeOn(true)
    }

    useEffect(() => {
        isLoggedIn && dispatch(getContactsTC())
    }, [contactName])


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <SearchContainer/>
            <Button variant="contained" onClick={onAddContactHandler}>Add contact</Button>
            {modalModeOn && <AddContact setAddMode={setModalModeOn}/>}

            <Grid container spacing={3} style={{margin: "10px auto"}}>
                {
                    contacts.map(c => {

                        return <Grid item key={c.id}>
                            <Paper style={{padding: '10px', width: "200px", height: "120px", paddingTop: "50px"}}>
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
