import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../redux/store';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
// import {signIn} from '../redux/login/login-reducer';
// import {NavLink} from 'react-router-dom';
// import {Navigate} from 'react-router-dom';
// import {IAppStore} from '../../../BLL/store/store';
// import {FORGOT_PATH, REGISTER_PATH} from '../../Routes';
// import s from './LogIn.module.scss';
// import style from '../InitCommonStyles.module.css';
// import {Alert} from '@mui/material';
// import {ErrorSnackbar} from '../../common/Error/ErrorSnackbar';

const Login = React.memo(() => {
    const [email, setEmail] = useState('test1test@test.com');
    const [password, setPassword] = useState('freetest');
    const [rememberMe, setRememberMe] = useState(false);

    // const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);
    const error = useSelector<IAppStore, string>((state) => state.login.error);
    const dispatch = useDispatch();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // dispatch(signIn({email, password, rememberMe}));
    };

    // if (isInitialized) {
    //     return <Navigate to={'/profile'}/>
    // }

    return (
        // <div>
        //     <h2>Personal area</h2>
        //     <h3>Sign In</h3>
        //     <form onSubmit={handleSubmit}>
        //
        //
        //         <div>
        //
        //             <label>Email
        //                 <input
        //                     value={email}
        //                     type="email"
        //                     name="email"
        //                     onChange={(e) => setEmail(e.currentTarget.value)}
        //                 />
        //             </label>
        //
        //             <label>Password
        //                 <input
        //                     value={password}
        //                     type="password"
        //                     name="password"
        //                     onChange={(e) => setPassword(e.currentTarget.value)}
        //                 />
        //             </label>
        //
        //             {error && (
        //                 <span>
        //     {/*<Alert severity="error">{error}</Alert>*/}
        //   </span>
        //             )}
        //             <div>
        //                 <div>
        //                     <label>
        //                         <input
        //                             type="checkbox"
        //                             name="rememberMe"
        //                             onChange={(e) => setRememberMe(e.currentTarget.checked)}
        //                         />
        //                         Remember me
        //                     </label>
        //                 </div>
        //             </div>
        //         </div>
        //         <div>
        //             {/*<NavLink className={s.linkTransparent} to={FORGOT_PATH}>*/}
        //                 Forgot password
        //             {/*</NavLink>*/}
        //         </div>
        //         <div>
        //             <button>Login</button>
        //         </div>
        //     </form>
        //     <p>Don't have an account?</p>
        //     <div>
        //         {/*<NavLink className={style.linkBlue} to={REGISTER_PATH}>*/}
        //             Sign Up
        //         {/*</NavLink>*/}
        //     </div>
        //     {/*<ErrorSnackbar/>*/}
        // </div>

        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <form
                    // onSubmit={formik.handleSubmit}
                >
                    <FormControl>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"

                            />
                            {/*{formik.touched.email && formik.errors.email && (*/}
                            {/*    <div style={{ color: "red" }}>{formik.errors.email}</div>*/}
                            {/*)}*/}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"

                            />
                            {/*{formik.touched.password && formik.errors.password && (*/}
                            {/*    <div style={{ color: "red" }}>{formik.errors.password}</div>*/}
                            {/*)}*/}
                            <FormControlLabel
                                label={"Remember me"}
                                control={<Checkbox />}

                            />
                            <Button type={"submit"} variant={"contained"} color={"primary"}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
});

export default Login;
