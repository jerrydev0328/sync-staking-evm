import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/StakingCard';
import { CornorRight } from 'components/icons'

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const StakingDetails = ({ color, title, count, percentage, isLoss, extra }) => {
    return (
        <div>
            <Stack
                sx={{
                    bgcolor: "#121212 !important",
                    padding: "2rem 1.2rem",
                    borderRadius: "0.5rem"
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h5"
                        color="#01FEA8"
                    >
                        {title}
                    </Typography>
                    <CornorRight />
                </Box>
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography
                            sx={{ color: "white", fontWeight: 700, fontSize: '24px', lineHeight: '31px', marginTop: "5px" }}
                            variant="h4"
                            color="inherit"
                        >
                            {count}
                        </Typography>
                    </Grid>

                </Grid>
            </Stack>
        </div>
    )
};

StakingDetails.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

StakingDetails.defaultProps = {
    color: 'primary'
};

export default StakingDetails;