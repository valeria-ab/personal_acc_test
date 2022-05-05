import {useDispatch, useSelector} from 'react-redux';
import s from './Search.module.css';
import Search from './Search';
import React, {useEffect} from 'react';
import {AppRootStateType} from '../../redux/store';
import {setSearchContactNameAC} from '../../redux/contacts-reducer';


const SearchContainer = React.memo(() => {
    const contactName = useSelector<AppRootStateType, string>(state => state.contacts.contactName)
    const dispatch = useDispatch();
    const onKeyUpHandler = (value: string) => dispatch(setSearchContactNameAC(value))

    // useEffect(() => {
    //     return () => {
    //         dispatch(setSearchContactNameAC(""))
    //     }
    // }, [])

    return <div className={s.search}>
        <Search
            value={contactName}
            onKeyUpHandler={onKeyUpHandler}
        />
    </div>
})

export default SearchContainer;
