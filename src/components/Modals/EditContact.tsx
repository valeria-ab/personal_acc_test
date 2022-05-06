import React, {ChangeEvent, useState} from 'react';
import s from './ModalsCommonStyles.module.css';
import {useDispatch} from 'react-redux';
import {updateContactTC} from '../../redux/contacts-reducer';
import {ContactType} from '../../api/api';


type  EditContactPropsType = {
    setEditMode: (value: boolean) => void
    contact: ContactType
}


export const EditContact = (props: EditContactPropsType) => {

    const [name, setname] = useState<string>(props.contact.name);
    const [isFollowed, setIsFollowed] = useState<boolean>(props.contact.isFollowed);

    const dispatch = useDispatch()

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setname(e.currentTarget.value)
    }

    const onSaveClick = () => {
        dispatch(updateContactTC({
            name: name,
            id: props.contact.id,
            isFollowed: isFollowed
        }))
        props.setEditMode(false)
    }


    return (
        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={s.header}>
                        <h2 className={s.title}>Edit contact</h2>
                    </div>
                    <p className={s.text}>Contact name:</p>
                    <input
                        type="text"
                        className={s.input}
                        value={name}
                        onChange={onChangeName}
                    />
                    <label className={s.text}>Followed:
                        <input
                            type="checkbox"
                            value={"checkbox"}
                            checked={isFollowed}
                            onChange={(e) => setIsFollowed(e.currentTarget.checked)}
                        />
                    </label>
                    <div className={s.wrapBtn}>
                        <button className={s.btnCancel}
                                onClick={() => props.setEditMode(false)}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick}
                                className={s.mainButton}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

