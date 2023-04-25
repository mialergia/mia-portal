import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Cookies = require('js-cookie');


function Header(props) {
    const { onDrawerToggle, title } = props;
    const router = useRouter();

    const handleLogOut = () => {
        Cookies.remove('userInfo')
        router.push('/login');
    }

    return (

        <AppBar
            component="div"
            color="primary"
            position="static"
            elevation={0}
            sx={{ zIndex: 0, alignItems: "left" }}

        >
            <Toolbar>
                <Grid container spacing={0.5} alignItems="left" width="50px">
                    <Grid xs sx={{ display: { sm: 'none', xs: 'block' } }} item>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={onDrawerToggle}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing="0.5">
                    <Grid item xs align="center">
                        <Typography color="#fff" variant="h5" component="h1" fontWeight="600" margin="8px 0">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" sx={{ p: 0.8, backgroundColor: "inherit" }} onClick={handleLogOut}>
                            <Typography color="inherit" variant="p" component="p" fontSize="14px">
                                Salir
                            </Typography>
                            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>

    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;