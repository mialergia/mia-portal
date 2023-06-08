import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from '../components/navigator';
// import Content from './Content';
import Header from '../components/header';
import theme from '../components/theme';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            <Link color="inherit" href="/">
                MIA Portal
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

const drawerWidth = 256;

export default function MainTheme({ children, onChangeMenuSelection, title, userAuth, username, selectedReport }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            onChangeMenuSelection={onChangeMenuSelection}
                            userAuth={userAuth}
                            selectedReport={selectedReport}
                        />
                    )}

                    <Navigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        sx={{ display: { sm: 'block', xs: 'none' } }}
                        onChangeMenuSelection={onChangeMenuSelection}
                        userAuth={userAuth}
                        selectedReport={selectedReport}
                    />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header onDrawerToggle={handleDrawerToggle} title={title} username={username}/>
                    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1', padding: '16px' }}>
                        {children}
                    </Box>
                    <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                        <Copyright />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}