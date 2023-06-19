import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useUserAuth from '../hooks/useUserAuth';
// import Image from 'next/Image';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid, Alert } from '@mui/material'
import Cookies from 'js-cookie';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { userAuth } = useUserAuth();

    useEffect(() => {
        if (userAuth) {
            router.push('/reportes');
        }
    }, [userAuth]);

    const saveUserData = (user, features) => {
        const userInfo = {
            username: user,
            roles: features.toString(),
        };
        Cookies.set('userInfo', JSON.stringify(userInfo),
            { expires: 14 },
        )
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email && password) {
            setIsLoading(true);
            await fetch("https://api.miaportal.fcien.edu.uy/users/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "user": email,
                    "password": password,
                }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.login) {
                    setErrors({ variant: 'success', message: `¡Login exitoso! Redirigiendo...` })
                    saveUserData(email, data.features);
                    window.location.href = '/reportes';
                } else {
                    setErrors({ variant: 'warning', message: 'No se pudo iniciar sesión. Revise el Email y/o la Contraseña' })
                }
            }).catch(error => {
                setErrors({ variant: 'error', message: 'No se pudo iniciar sesión. Intente nuevamente.' })
                console.log('Error en fetch', error)
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            setErrors({ variant: 'warning', message: 'Debe ingresar el Email y la Contraseña' })
        }
    };

    return (
        <>
            <Head>
                <title>MIA Portal | Login</title>
            </Head>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" sx={{
                    backgroundColor: "#fff", borderRadius: "19px", padding: "24px", margin: "32px auto"
                }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '64px',
                            backgroundColor: '#fff',
                            borderRadius: '12px'
                        }}
                    >
                        <img src="https://mialergia.fcien.edu.uy/assets/img/appIcon.png" width="120" height="120" alt="MIA Portal logo" />
                        <Typography component="h1" variant="h5" sx={{marginTop: '12px'}}>
                            MIA Portal
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => {
                                    setErrors({})
                                    setEmail(e.target.value)
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setErrors({})
                                    setPassword(e.target.value)
                                }}
                            />
                            <Grid item xs={12} sx={{ height: '64px', marginTop: "16px" }}>
                                {Object.keys(errors).length > 0 && <Alert sx={{ marginTop: 0 }} severity={errors.variant}>{errors.message}</Alert>}
                            </Grid>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#2e7d32' }}
                                loading={isLoading}
                            >
                                Entrar
                            </LoadingButton>
                        </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
                        <Link color="inherit" href="https://miaportal.fcien.edu.uy">
                            Mia Portal
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </ThemeProvider>
        </>
    );
}