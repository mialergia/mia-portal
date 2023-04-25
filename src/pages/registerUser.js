import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserAuth from '../hooks/useUserAuth';
import MainTheme from '../components/mainTheme'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';

function RegisterUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const router = useRouter();
    const userAuth = useUserAuth();

    useEffect(() => {
        // if (userAuth && !userAuth?.includes('register_user')) {
        //     router.push('/reports');
        // }
    }, [userAuth]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/registerUser', {
            method: 'POST',
            body: JSON.stringify({ username, password, email })
        });
        if (response.ok) {
            alert('User registered successfully!');
        } else {
            alert('Error registering user');
        }
    };

    return <MainTheme title="Registrar usuario">
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
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar contraseña"
                                    type="confirmPassword"
                                    id="confirmPassword"
                                    autoComplete="confirm-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Crear
                        </Button>

                    </Box>
                </Box>

            </Container>
        </div>
    </MainTheme>;
}

export default RegisterUser;



