import React, {ChangeEvent, useState} from 'react';
import s from './ModalsCommonStyles.module.css';
import {useDispatch} from 'react-redux';
import {v1} from 'uuid';
import {createContactTC} from '../../redux/contacts-reducer';


type  AddPackPropsType = {
    setAddMode: (value: boolean) => void
}


export const AddContact = React.memo((props: AddPackPropsType) => {

    const [name, setName] = useState<string>("");
    const dispatch = useDispatch()

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onSaveClick = () => {
        dispatch(createContactTC({id: v1(), name: name, isFollowed: false}))
        props.setAddMode(false)
    }

    return (
        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={s.header}>
                        <h2 className={s.title}>Add new contact</h2>
                    </div>
                    <p className={s.text}>Name</p>
                    <input
                        type='text'
                        className={s.input}
                        value={name}
                        onChange={onChangeName}
                    />
                    <div className={s.wrapBtn}>
                        <button className={s.btnCancel} onClick={() => props.setAddMode(false)}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick}
                                className={s.mainButton}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

