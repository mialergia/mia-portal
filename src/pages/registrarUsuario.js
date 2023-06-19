import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useUserAuth from '../hooks/useUserAuth';
import MainTheme from '../components/mainTheme'

import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';;
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, Typography } from '@mui/material';

function RegistrarUsuario() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState('')
    const [passwordError, setPasswordError] = useState(false);
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { userAuth, username } = useUserAuth();

    useEffect(() => {
        if (userAuth && !userAuth?.includes('crear_usuario')) {
            router.push('/reportes');
        }
    }, [userAuth]);

    const validatePasswordConfirmation = (passwordConfirmation) => {
        return password && passwordConfirmation && (password === passwordConfirmation)
    }

    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email && password && (password === passwordValidate)) {
            setIsLoading(true);
            setErrors({})
            // setLoading(true);
            await fetch("https://api.miaportal.fcien.edu.uy/users/create", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "user": email,
                    "password": password,
                    "creator": username,
                    "role": role
                }),
            }).then((response) => {
                return response
            }).then((data) => {
                if (data.status === 400) {
                    setErrors({ variant: 'error', message: "El usuario ya existe" })
                    return false;
                }
                setErrors({ variant: 'success', message: `¡Usuario creado exitosamente!` })
            }).catch(error => {
                setErrors({ variant: 'error', message: 'No se pudo crear el usuario. Intente nuevamente.' })
                console.log('Error en fetch', error)
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            setErrors({ variant: 'warning', message: 'Debe ingresar el Email y la Contraseña' })
        }
    }

    return (
        <>
            <Head>
                <title>MIA Portal | Registrar usuario</title>
            </Head>
            <MainTheme userAuth={userAuth} username={username} selectedReport="crear_usuario">
                <div className="main-section reports">
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="12" r="8" fill="none" stroke="#2e7d32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" stroke="#2e7d32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M19 39H29" stroke="#2e7d32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24 34V44" stroke="#2e7d32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>
                            <Typography color="black" variant="h5" component="h5" fontSize="24px" marginTop="24px">
                                Registrar usuario
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            type='email'
                                            onChange={(e) => {
                                                setErrors({});
                                                setEmail(e.target.value);
                                                validateEmail(e.target.value) ? setEmailError(false) : setEmailError(true)
                                            }}
                                            error={emailError}
                                            helperText={emailError ? 'Ingrese un correo electrónico válido' : ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Contraseña"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirmar contraseña"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="confirm-password"
                                            onChange={(e) => {
                                                setPasswordValidate(e.target.value);
                                                validatePasswordConfirmation(e.target.value) ? setPasswordError(false) : setPasswordError(true);
                                            }}
                                            helperText={passwordError ? 'Las contraseñas no coinciden' : ''}
                                            error={passwordError}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl required fullWidth error={errors.role && "error"} sx={{ background: 'white', borderRadius: '8px' }}>
                                            <InputLabel id="demo-simple-select-error-label">Rol</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-error-label"
                                                id="demo-simple-select-error"
                                                value={role}
                                                label="Rol"
                                                onChange={e => setRole(e.target.value)}
                                                renderValue={(value) => value}
                                            >
                                                <MenuItem value="Investigador">Investigador</MenuItem>
                                                <MenuItem value="Medico">Medico</MenuItem>
                                                <MenuItem value="Administrador">Administrador</MenuItem>
                                            </Select>
                                            {errors.role && <FormHelperText>Error</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sx={{ height: '74px' }}>
                                        {Object.keys(errors).length > 0 && <Alert sx={{ marginTop: 0 }} severity={errors.variant}>{errors.message}</Alert>}
                                    </Grid>

                                </Grid>

                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={!(email && validateEmail(email) && password && passwordValidate && role && (password === passwordValidate))}
                                    loading={isLoading}
                                >
                                    Crear
                                </LoadingButton>

                            </Box>
                        </Box>

                    </Container>
                </div>
            </MainTheme></>);
}

export default RegistrarUsuario;



