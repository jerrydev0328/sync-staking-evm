import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const iconBackColor = '';
    const iconBackColorOpen = '';

    // common header
    const mainHeader = (
        <Toolbar sx={{ paddingTop: '22px', paddingBottom: '22px', backgroundColor: "#050505" }}>
            <IconButton
                disableRipple
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                color="white"
                sx={{
                    color: 'text.primary',
                    bgcolor: open ? iconBackColorOpen : iconBackColor,
                    ml: "0.2rem"
                }}
            >
                {!open ?
                    <MenuUnfoldOutlined style={{ color: "white", fontWeight: "600" }} />
                    : <MenuFoldOutlined style={{ color: "white", fontWeight: "600" }} />}
            </IconButton>
            <HeaderContent />
        </Toolbar>
    );

    // app-bar params
    const appBar = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        backgroundColor: "#03031b",
    };

    return (
        <>
            {!matchDownMD ? (
                <AppBarStyled open={open} {...appBar}>
                    {mainHeader}
                </AppBarStyled>
            ) : (
                <AppBar {...appBar}>{mainHeader}</AppBar>
            )}
        </>
    );
};

Header.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func
};

export default Header;