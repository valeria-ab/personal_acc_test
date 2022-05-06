import {ContactType} from '../api/api';
import React, {useState} from 'react';
import {EditContact} from './Modals/EditContact';
import {DeleteContact} from './Modals/DeleteContact';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

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
            ? "✅"
            : "❌"
        } </div>
        <div style={{marginTop: "20px"}}>
            <Button variant="outlined" onClick={onChangeContactHandler}>change</Button>
            <IconButton onClick={onDeleteContactHandler}>
                <Delete/>
            </IconButton>
        </div>

    </div>

}