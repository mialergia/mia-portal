import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserAuth from '../hooks/useUserAuth';
import MainTheme from '../components/mainTheme'

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';;
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert } from '@mui/material';

function RegisterUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState('')
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({})

    const router = useRouter();
    const {userAuth, username} = useUserAuth();

    useEffect(() => {
        if (userAuth && !userAuth?.includes('crear_usuario')) {
            router.push('/reports');
        }
    }, [userAuth]);

    useEffect(() => {
        if (password && passwordValidate && (password !== passwordValidate)) {
            setErrors({ variant: 'warning', message: 'Las contraseñas no coinciden' })
        } else {
            setErrors({})
        }
    }, [password, passwordValidate])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email && password && (password === passwordValidate)) {

            setErrors({})
            // setLoading(true);
            await fetch("http://localhost:8080/users/create", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "user": email,
                    "password": password,
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
                // setLoading(false);
            });
        } else {
            setErrors({ variant: 'warning', message: 'Debe ingresar el Email y la Contraseña' })
        }
    }

    return (<MainTheme title="Registrar usuario" userAuth={userAuth} username={username}>
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
                    <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="12" r="8" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M19 39H29" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24 34V44" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>
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
                                    onChange={(e) => {
                                        setErrors({})
                                        setEmail(e.target.value)
                                    }}
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
                                        setPasswordValidate(e.target.value)
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl required fullWidth error={errors.role && "error"} sx={{background: 'white', borderRadius: '8px'}}>
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!(email && password && passwordValidate && role)}
                        >
                            Crear
                        </Button>

                    </Box>
                </Box>

            </Container>
        </div>
    </MainTheme>);
}

export default RegisterUser;



