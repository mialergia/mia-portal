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
    color: '#c8e6c9',
    fontSize: '15px',
    '&:hover, &:focus': {
        color: '#fff',
        backgroundColor: '#2e7d32'
    },
    "&.Mui-selected": { 
        backgroundColor: "#43a047", 
        color: "#fff" 
    },
    "&.Mui-selected:hover": {
        backgroundColor: "#43a047",
    }
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
    color: '#c8e6c9',
    fontSize: '15px'
};

const navigationOptionsList = [
    {
        section_title: 'Administrador',
        permissions: ['crear_usuario'],
        children: [
            {
                id: 'crear_usuario',
                title: 'Registrar usuario',
                permission: 'crear_usuario',
                target: 'registrarUsuario',
                icon: <PersonAddIcon />
            }
        ]
    },
    {
        section_title: 'Reportes',
        permissions: ['reporte_tipo_polen', 'reporte_diario', 'reporte_diario_meteorologico'],
        children: [
            {
                id: 'reporte_tipo_polen',
                title: 'Por tipo',
                permission: 'reporte_tipo_polen',
                target: 'reportes',
                icon: <ForestIcon />
            },
            {
                id: 'reporte_diario',
                title: 'Diario',
                permission: 'reporte_diario',
                target: 'reportes',
                icon: <CalendarMonthIcon />
            },
            {
                id: 'reporte_diario_meteorologico',
                title: 'Diario + Meteorológico',
                permission: 'reporte_diario_meteorologico',
                target: 'reportes',
                icon: <ThermostatIcon />
            },
        ]
    },
    {
        section_title: 'Pacientes',
        permissions: ['reporte_paciente_sintomas_cronicos', 'reporte_paciente_entrada_diaria', 'reporte_paciente_test_prick'],
        children: [
            {
                id: 'reporte_paciente_sintomas_cronicos',
                title: 'Síntomas crónicos',
                permission: 'reporte_paciente_sintomas_cronicos',
                target: 'reportes',
                icon: <MedicalInformationIcon />
            },
            {
                id: 'reporte_paciente_entrada_diaria',
                title: 'Entrada diaria',
                permission: 'reporte_paciente_entrada_diaria',
                target: 'reportes',
                icon: <MonitorHeartIcon />
            },
            {
                id: 'reporte_paciente_test_prick',
                title: 'Test Prick',
                permission: 'reporte_paciente_test_prick',
                target: 'reportes',
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
    const { onChangeMenuSelection, userAuth, selectedReport, ...other } = props;
    const [activeItem, setActiveItem] = React.useState(selectedReport);

    const handleNavigation = (target, type = '') => {
        setActiveItem(type);
        const currentPath = router.pathname;
        if (`/${target}` !== currentPath) {
            router.push(`/${target}${type && "?tipo="}${type ?? ""}`)
        } else {
            onChangeMenuSelection(type)
        }
    }

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 23, color: '#fff', fontWeight: 600, justifyContent: 'space-evenly' }}>
                    <img src='../appIcon.png' width="32px"/>
                    MIA Portal
                </ListItem>

                {
                    navigationOptionsList.map((section) => {
                        return (checkPermissions(section.permissions, userAuth) && <Box sx={{ bgcolor: '#101F33' }} key={section.section_title}>
                            <ListItem sx={{ py: 2, px: 3, fontWeight: 600 }} >
                                <ListItemText sx={{ color: '#c8e6c9' }}>{section.section_title}</ListItemText>
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