import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ForestIcon from '@mui/icons-material/Forest';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const navigationOptionsList = [
    {
        section_title: 'Administrador',
        permissions: ['crear_usuario'],
        children: [
            {
                id: 'crear_usuario',
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
                id: 'reporte_tipo_polen',
                title: 'Por tipo',
                permission: 'reporte_tipo_polen',
                target: 'reports',
                icon: <ForestIcon />
            },
            {
                id: 'reporte_diario',
                title: 'Diario',
                permission: 'reporte_diario',
                target: 'reports',
                icon: <CalendarMonthIcon />
            },
            {
                id: 'reporte_diario_meteorologico',
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
                id: 'reporte_paciente_sintomas_cronicos',
                title: 'Síntomas crónicos',
                permission: 'reporte_paciente_sintomas_cronicos',
                target: 'reports',
                icon: <MedicalInformationIcon />
            },
            {
                id: 'reporte_paciente_entrada_diaria',
                title: 'Entrada diaria',
                permission: 'reporte_paciente_entrada_diaria',
                target: 'reports',
                icon: <MonitorHeartIcon />
            },
            {
                id: 'reporte_paciente_test_prick',
                title: 'Test Prick',
                permission: 'reporte_paciente_test_prick',
                target: 'reports',
                icon: <LocalHospitalIcon />
            },
        ]
    },
]

const reports_dictionary = {
    reporte_tipo_polen: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_3yy9piaryc',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_5jryigxq1c'
    },
    reporte_diario: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_v1pwonityc',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_w40ygyrq3c'
    },
    reporte_diario_meteorologico: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_z0rfvkkuyc',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_rvydwyrq3c'
    },
    reporte_paciente_sintomas_cronicos: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_3pj70dpp0c',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_kxvz4mtq3c' // AJUSTAR
    },
    reporte_paciente_entrada_diaria: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_qhjuzrqp0c',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_wy8wgntq3c'
    },
    reporte_paciente_test_prick: {
        desktop: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_zo0iy9ur0c',
        mobile: 'https://lookerstudio.google.com/embed/reporting/ef03f072-bf57-4097-8c3c-b8b5e74fb2ac/page/p_bos5mntq3c'
    },
}

const getIframeSrc = (permissions, type, device) => {
    if (permissions && permissions.includes(type)) {
        return reports_dictionary[type][device]
    }
    return ''
}

export { navigationOptionsList, reports_dictionary, getIframeSrc }