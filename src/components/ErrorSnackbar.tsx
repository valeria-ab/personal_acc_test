import React, {SyntheticEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import MuiAlert from '@mui/material/Alert';
import {AlertProps, Snackbar, SnackbarCloseReason} from '@mui/material';
import {setError} from '../redux/login-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {

    const error = useSelector<AppRootStateType, string | null>(state => state.login.error)
    const dispatch = useDispatch()

    const handleClose = (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setError(null))
    };

    const handleAlertClose = (event: SyntheticEvent<Element, Event>) => {
        dispatch(setError(null))
    }


    const isOpen = error !== null

    return (

        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleAlertClose} severity="error">
                {error}
            </Alert>
        </Snackbar>

    );
}
