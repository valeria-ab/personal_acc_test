import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {loginTC} from '../../redux/login-reducer';
import {AppRootStateType} from '../../redux/store';
import {Navigate} from 'react-router-dom';



type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};


const Login = React.memo(() => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn);


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: (values) => {
            //   if (!values.email) {
            //     return {
            //       email: "Email is required",
            //     };
            //   }
            //   if (!values.password) {
            //     return {
            //       password: "Password is required",
            //     };
            //   }

            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }

            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length < 3) {
                errors.password = "Password must be longer than 3 characters";
            }

            return errors;
        },
        onSubmit: (values) => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    });


    // const isInitialized = useSelector<IAppStore, boolean>((state) => state.app.isInitialized);


    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     dispatch(signIn({email, password, rememberMe}));
    // };

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (


        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                                // value="test@test.com"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                            )}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                                // value="test@test.com"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div style={{ color: "red" }}>{formik.errors.password}</div>
                            )}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox/>}
                                {...formik.getFieldProps("rememberMe")}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
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
