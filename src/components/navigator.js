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

import { navigationOptionsList } from './utils'

const item = {
    py: '2px',
    px: 3,
    color: '#c8e6c9',
    '&:hover, &:focus': {
        backgroundColor: '#2e7d32',
        color: '#fff',
    },
    "&.Mui-selected": { backgroundColor: "#43a047", color: "#fff" },
    "&.Mui-selected:hover": { backgroundColor: "#43a047"}

};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
    color: '#c8e6c9'
};

const checkPermissions = (arr1, arr2) => {
    return arr1.some((item) => arr2?.includes(item));
}

export default function Navigator(props) {
    const router = useRouter();
    const { onChangeMenuSelection, userAuth, selectedReport, ...other } = props;
    const [activeItem, setActiveItem] = React.useState(selectedReport || 'reporte_tipo_polen');

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
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff', fontWeight: 600, justifyContent: 'space-evenly', backgroundColor: '#2e7d32' }} className='main_title'>
                    <img src="../../appIcon.png" width="32px"></img>
                    MIA Portal
                </ListItem>

                {
                    navigationOptionsList.map((section) => {
                        return (checkPermissions(section.permissions, userAuth) && <Box sx={{ bgcolor: '#101F33' }} key={section.section_title}>
                            <ListItem sx={{ py: 2, px: 3 }} >
                                <ListItemText sx={{ color: '#c8e6c9' }}>{section.section_title}</ListItemText>
                            </ListItem>
                            {
                                section.children?.map(({ id, title, icon, permission, target }) => {
                                    return userAuth?.includes(permission) && <ListItem disablePadding onClick={() => handleNavigation(target, id)} key={id}>
                                        <ListItemButton className={activeItem === id ? 'selected' : ''} selected={activeItem === id} sx={item}>
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