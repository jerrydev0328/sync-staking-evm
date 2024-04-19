// assets
import { DashboardOutlined } from '@ant-design/icons';
import { HomeIconv2 } from '../components/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: HomeIconv2,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
