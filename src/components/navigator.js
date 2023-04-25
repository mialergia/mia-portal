import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

const categories = [
    {
        id: 'Build',
        children: [
            {
                id: 'Authentication',
                icon: <PeopleIcon />,
                active: true,
            },
            { id: 'Database', icon: <DnsRoundedIcon /> },
            { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
            { id: 'Hosting', icon: <PublicIcon /> },
            { id: 'Functions', icon: <SettingsEthernetIcon /> },
            {
                id: 'Machine learning',
                icon: <SettingsInputComponentIcon />,
            },
        ],
    },
    {
        id: 'Quality',
        children: [
            { id: 'Analytics', icon: <SettingsIcon /> },
            { id: 'Performance', icon: <TimerIcon /> },
            { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { onChangeMenuSelection, ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    MIA Portal
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Inicio</ListItemText>
                </ListItem>

                <Box sx={{ bgcolor: '#101F33' }}>
                    <ListItem sx={{ py: 2, px: 3 }}>
                        <ListItemText sx={{ color: '#fff' }}>Reportes</ListItemText>
                    </ListItem>

                    <ListItem disablePadding onClick={() => onChangeMenuSelection('tipo')}>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Por tipo</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => onChangeMenuSelection('diario')}>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Diario</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => onChangeMenuSelection('diario_met')}>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Diario + Meteorológico</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ mt: 2 }} />
                </Box>

                <Box sx={{ bgcolor: '#101F33' }}>
                    <ListItem sx={{ py: 2, px: 3 }}>
                        <ListItemText sx={{ color: '#fff' }}>Pacientes</ListItemText>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Síntomas crónicos</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Entrada diaria</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Test Prick</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ mt: 2 }} />
                </Box>

            </List>
        </Drawer>
    );
}