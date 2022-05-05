import React, {useCallback} from 'react';
import './App.css';
import Login from './components/Login/Login';
import {Route, Routes} from 'react-router-dom';
// import {Menu}  from "@material-ui/icons";
import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material';
import Main from './components/Main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './redux/store';
import {ErrorSnackbar} from './components/ErrorSnackbar';
import {setIsLoggedInAC} from './redux/login-reducer';

function App() {


    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();


    const logoutHandler = useCallback(() => {
        dispatch(setIsLoggedInAC(false))
    }, []);


    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        {/*<Menu />*/}
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    {isLoggedIn && (
                        <Button color="inherit"
                            onClick={logoutHandler}
                        >
                            Log out
                        </Button>
                    )}
                </Toolbar>

            </AppBar>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/'} element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default App;
