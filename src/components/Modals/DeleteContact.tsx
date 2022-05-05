import React from 'react';
import s from './ModalsCommonStyles.module.css';
import {useDispatch} from 'react-redux';
import {ContactType} from '../../api/api';
import {deleteContactTC} from '../../redux/contacts-reducer';


type  DeletePackPropsType = {
    setDeleteMode: (value: boolean) => void
    contact: ContactType
}


export const DeleteContact = React.memo((props: DeletePackPropsType) => {


    // const [name, setName] = useState<string>(props.pack.name);

    const dispatch = useDispatch()

    // const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    //     setName(e.currentTarget.value)
    // }


    const onSaveClick = () => {
        dispatch(deleteContactTC(props.contact.id))
        props.setDeleteMode(false)
    }

    return (
        <div className={s.modal}>
            <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={s.wrap}>
                    <div className={s.header}>
                        <h2 className={s.title}>Delete contact</h2>
                    </div>
                    <p className={s.deleteItemText}>Do you really want to remove the contact <b>"{props.contact.name}"</b> ?</p>
                    <div className={s.wrapBtn}>
                        <button className={s.btnCancel} onClick={() => props.setDeleteMode(false)}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick} className={s.deleteButton}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

