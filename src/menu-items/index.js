// project import
import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import { HomeIconv2 } from 'components/icons';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    // items: [dashboard, pages, utilities, support]
    items: [
        {
            id: 'group-home',
            type: 'group',
            children: [
                {
                    id: 'home',
                    title: 'Home',
                    type: 'item',
                    url: '/',
                    icon: HomeIconv2,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default menuItems;
