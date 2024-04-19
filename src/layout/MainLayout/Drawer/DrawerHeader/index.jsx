import PropTypes from 'prop-types';

// material-ui
import { Stack, Chip } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
    return (
        // only available in paid version
        <DrawerHeaderStyled
            open={open}
            style={{ borderRight: "none !important" }}
        >
            <div>
                <Logo />
            </div>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;