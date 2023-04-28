import * as React from 'react';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';

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
    const router = useRouter();
    const { onChangeMenuSelection, ...other } = props;

    const handleNavigation = (target, type = '') => {
        const currentPath = router.pathname;
        if (`/${target}` !== currentPath) {
            router.push(`/${target}${type && "?type="}${type ?? ""}`)
        } else {
            onChangeMenuSelection(type)
        }
    }

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff', fontWeight: 600, justifyContent: 'space-evenly' }}>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M12 2L7 6.643S10.042 7 12 7c1.958 0 5-.357 5-.357L12 2zM8.5 7L5 10.94S7.625 12 12 12s7-1.06 7-1.06L15.5 7" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.5 11.5L3 15.523S5.7 18 12 18s9-2.477 9-2.477L17.5 11.5M12 22v-3" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    MIA Portal
                </ListItem>

                <Box sx={{ bgcolor: '#101F33' }}>
                    <ListItem sx={{ py: 2, px: 3, fontWeight: 600 }}>
                        <ListItemText sx={{ color: '#fff' }}>Administrador</ListItemText>
                    </ListItem>

                    <ListItem disablePadding onClick={() => handleNavigation('registerUser')}>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Registrar Usuario</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ mt: 2 }} />
                </Box>


                <Box sx={{ bgcolor: '#101F33' }}>
                    <ListItem sx={{ py: 2, px: 3, fontWeight: 600 }}>
                        <ListItemText sx={{ color: '#fff' }}>Reportes</ListItemText>
                    </ListItem>

                    <ListItem disablePadding onClick={() => handleNavigation('reports','tipo')}>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Por tipo</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleNavigation('reports','diario')}>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Diario</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleNavigation('reports','diario_met')}>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Diario + Meteorológico</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ mt: 2 }} />
                </Box>

                <Box sx={{ bgcolor: '#101F33' }}>
                    <ListItem sx={{ py: 2, px: 3, fontWeight: 600 }}>
                        <ListItemText sx={{ color: '#fff' }}>Pacientes</ListItemText>
                    </ListItem>

                    <ListItem disablePadding onClick={() => handleNavigation('reports','sintomas')}>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Síntomas crónicos</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleNavigation('reports','entrada_diaria')}>
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                            <ListItemText>Entrada diaria</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleNavigation('reports','test_prick')}>
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