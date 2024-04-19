// material-ui
import { Box, IconButton, Link, useMediaQuery, Typography, Button } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { ConnectBtn } from 'components/ConnectBtn';


// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                color: "white"
            }}
            >
                <Typography variant="h4" sx={{
                    ml: 2
                }}>
                    Staking
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ConnectBtn />
                    {/* {!matchesXs && <Profile />} */}
                    {/* {matchesXs && <MobileSection />} */}
                </Box>
            </Box>

            {/* {!matchesXs && <Search />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
            

            <IconButton
                component={Link}
                href="https://github.com/codedthemes/mantis-free-react-admin-template"
                target="_blank"
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
            >
                <GithubOutlined />
            </IconButton>

            <Notification />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />} */}
        </>
    );
};

export default HeaderContent;