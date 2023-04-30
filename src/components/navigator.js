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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ForestIcon from '@mui/icons-material/Forest';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

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

const navigationOptionsList = [
    {
        section_title: 'Administrador',
        permissions: ['crear_usuario'],
        children: [
            {
                id: 'registerUser',
                title: 'Registrar usuario',
                permission: 'crear_usuario',
                target: 'registerUser',
                icon: <PersonAddIcon />
            }
        ]
    },
    {
        section_title: 'Reportes',
        permissions: ['reporte_tipo_polen', 'reporte_diario', 'reporte_diario_meteorologico'],
        children: [
            {
                id: 'tipo',
                title: 'Por tipo',
                permission: 'reporte_tipo_polen',
                target: 'reports',
                icon: <ForestIcon />
            },
            {
                id: 'diario',
                title: 'Diario',
                permission: 'reporte_diario',
                target: 'reports',
                icon: <CalendarMonthIcon />
            },
            {
                id: 'diario_met',
                title: 'Diario + Meteorológico',
                permission: 'reporte_diario_meteorologico',
                target: 'reports',
                icon: <ThermostatIcon />
            },
        ]
    },
    {
        section_title: 'Pacientes',
        permissions: ['reporte_paciente_sintomas_cronicos', 'reporte_paciente_entrada_diaria', 'reporte_paciente_test_prick'],
        children: [
            {
                id: 'sintomas',
                title: 'Síntomas crónicos',
                permission: 'reporte_paciente_sintomas_cronicos',
                target: 'reports',
                icon: <MedicalInformationIcon />
            },
            {
                id: 'entrada_diaria',
                title: 'Entrada diaria',
                permission: 'reporte_paciente_entrada_diaria',
                target: 'reports',
                icon: <MonitorHeartIcon />
            },
            {
                id: 'test_prick',
                title: 'Test Prick',
                permission: 'reporte_paciente_test_prick',
                target: 'reports',
                icon: <LocalHospitalIcon />
            },
        ]
    },

]

const checkPermissions = (arr1, arr2) => {
    return arr1.some((item) => arr2?.includes(item));
}

export default function Navigator(props) {
    const router = useRouter();
    const { onChangeMenuSelection, userAuth, ...other } = props;
    const [activeItem, setActiveItem] = React.useState('');

    const handleNavigation = (target, type = '') => {
        setActiveItem(type);
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

                {
                    navigationOptionsList.map((section) => {
                        return (checkPermissions(section.permissions, userAuth) && <Box sx={{ bgcolor: '#101F33' }} key={section.section_title}>
                            <ListItem sx={{ py: 2, px: 3, fontWeight: 600 }} >
                                <ListItemText sx={{ color: '#fff' }}>{section.section_title}</ListItemText>
                            </ListItem>
                            {
                                section.children?.map(({ id, title, icon, permission, target }) => {
                                    return userAuth?.includes(permission) && <ListItem disablePadding onClick={() => handleNavigation(target, id)} key={id}>
                                        <ListItemButton selected={activeItem === id} sx={item}>
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText>{title}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                })
                            }
                            <Divider sx={{ mt: 2 }} />
                        </Box>
                        )
                    })
                }
            </List>
        </Drawer>
    );
}