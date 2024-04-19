import { useContext, useEffect, useRef, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';


// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Input,
    Typography,
    Paper,
    Select,
    InputLabel,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel
} from '@mui/material';
import ASVR from "../../assets/images/icon.PNG";

// project import
import IncomeAreaChart from './IncomeAreaChart';
import MainCard from 'components/MainCard';
import StakingDetail from 'components/cards/statistics/StakingDetails';
import ApyCard from 'components/cards/statistics/ApyCard';
import { styled } from '@mui/material/styles';
import TimeComponent from 'components/TimeComponent';
import { AlertMsg } from 'components/AlertMsg'

// assets
import { GlobalContext } from 'context/GlobalContext';
import { useStake } from 'hooks/solanaHooks';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// styles
const styles = {
    lockPeriod: {
        textAlign: 'center',
        fontFamily: 'Space Grotesk',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '20px'
    },
    timer: {
        color: '#F5331E',
        fontFamily: 'Space Grotesk',
        fontWeight: 600,
        fontSize: '32px',
        lineHeight: '23px'

    },
    timeCat: {
        color: '#000515',
        lineHeight: '10px',
        fontSize: '12px',
        mt: 2
    },
    lockAmount: {
        textAlign: 'center',
        fontFamily: 'Space Grotesk',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '16px',
        color: '#000515',
        opacity: 0.7,
        mt: 3
    },
    selectBox: {
        width: '120px',
        padding: '8px 10px',
        fontFamily: 'Space Grotesk',
        fontSize: '16px',
        color: 'white',
        background: '#16182D',
        border: '1px solid #ccc',
        marginTop: "4px"
    },
    stakeChartvalue: {
        fontFamily: 'Space Grotesk',
        fontSize: '24px',
        fontWeight: 700,
        lineHeight: '30px'
    },
    txtInput: {
        border: '1px solid #C7C4C3',
        width: '100%',
        fontSize: '16px',
        fontFamily: 'Space Grotesk',
        padding: '10px 20px',
        background: '#121212',
        color: 'white',
        borderRadius: '50px'
    },
    btn: {
        width: '100%',
        bgcolor: '#F5331E',
        fontFamily: 'Space Grotesk',
        fontSize: '16px',
        color: 'white',
        fontWeight: 500,
        bgcolor: "#16182D",
        border: '2px solid #D334FF',
        py: 1.8,
        px: 2,
        '&:hover': {
            bgcolor: '#c800ff'
        }
    },
    btn1: {
        width: '100%',
        background: "linear-gradient(135deg, #01FEA8 0%, #46A5FF 51.04%, #D632FF 100%)",
        fontFamily: 'Space Grotesk',
        fontSize: '16px',
        borderRadius: '50px',
        color: 'white',
        py: 1,
        px: 2,
    }
}

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

const Token = styled(Paper)(({ theme }) => ({
    background: "#121212",
    borderRadius: 0,
    padding: "12px",
    boxShadow: "none",
    width: "100%"
}))


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const txtAmount = useRef()
    const selPid = useRef()
    const { stake, destake, stakeInfor, stakeBalance, setTransactionPending } = useStake();

    const handleStake = async () => {
        await stake(txtAmount.current.value, selPid.current.value)
        // window.location.reload()
        setTransactionPending(true)
        setTransactionPending(false)
    }

    const handleWithdraw = async () => {
        await destake()
        setTransactionPending(true)
        setTransactionPending(false)
        // window.location.reload()
    }


    return (
        <>
            <Grid
                sx={{ marginTop: '1rem' }}
                container
                rowSpacing={4.5}
                columnSpacing={3.75}
            >
                {/* row 1 */}
                {/* <Grid item xs={12} sm={12} md={4} lg={4}>
                    <StakingDetail title="Total Value Locked" count={'$ ' + new Intl.NumberFormat('en-US').format(0)} />
                </Grid> */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <ApyCard title="APY Rate" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <StakingDetail title="Stake Amount" count={new Intl.NumberFormat('en-US').format(stakeBalance.toString())} />
                </Grid>

                {/* row 2 */}
                <Grid item xs={12} md={12} lg={12}>
                    <TimeComponent stakeInfor={stakeInfor} stakeBalance={stakeBalance} />
                </Grid>
                {/* <Grid item xs={12} md={6} lg={7}>
                    <Box
                        sx={{
                            bgcolor: "#16182D !important",
                            padding: "1.6rem 1.3rem",
                            borderRadius: "0.5rem"
                        }}
                    >
                        <Box>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                <Typography
                                    sx={{ color: "white", fontWeight: 700 }}
                                    variant="h4"
                                >
                                    Staking
                                </Typography>

                                <Stack direction="row" spacing={2.5}>
                                    <select style={styles.selectBox}>
                                        <option value="1">SYNC</option>
                                    </select>
                                </Stack>
                            </Stack>
                            <Box>
                                <div style={{ marginTop: '32px' }}>
                                    <span style={{ ...styles.stakeChartvalue, color: '#D334FF' }}>
                                        {'$ ' + new Intl.NumberFormat('en-US').format(0)}
                                    </span>
                                    <span style={{ ...styles.stakeChartvalue, fontWeight: 400, fontSize: '16px' }}> / ORBN Staked</span>
                                </div>
                            </Box>
                        </Box>
                        <IncomeAreaChart />
                    </Box>
                </Grid> */}

                {/* row 3 */}
                <Grid item xs={12} md={7} lg={7} >
                    <Box
                        sx={{
                            bgcolor: "#121212 !important",
                            padding: "1.5rem 1.3rem",
                            borderRadius: "0.5rem"
                        }}
                    >
                        <Grid container>
                            <Grid item xs={12} sm={6} sx={{ px: 1, mb: 2, sm: { mb: 0 } }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#01FEA8" }}>Amount to Stake</Typography>
                                <input ref={txtAmount} style={{ ...styles.txtInput }} placeholder="Amount" />
                            </Grid>

                            <Grid item xs={12} sm={6} sx={{ px: 1, mb: 2, sm: { mb: 0 } }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#01FEA8" }}>Lock Options</Typography>
                                <select style={{ ...styles.txtInput }} ref={selPid}>
                                    <option value="">Select Lock Period</option>
                                    <option value="1">1 Month</option>
                                    <option value="3">3 Month</option>
                                    <option value="6">6 Month</option>
                                    <option value="9">9 Month</option>
                                    <option value="12">12 Month</option>
                                </select>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ mt: 0.5 }}>
                            <Grid item xs={12} sm={6} sx={{ px: 1, mb: 0.5 }}>
                                <Button sx={{ ...styles.btn1 }} onClick={handleStake}>Stake</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ px: 1, mb: 0.5 }}>
                                <Button sx={{ ...styles.btn1 }} onClick={handleWithdraw}>Withdraw Stake</Button>
                            </Grid>

                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} md={5} lg={5}>
                    <div>
                        <Box
                            sx={{
                                bgcolor: "#121212 !important",
                                padding: "1.8rem 1.3rem",
                                borderRadius: "0.5rem"
                            }}
                        >
                            <Typography
                                sx={{ fontWeight: 700, mb: 3.5, color: "#01FEA8" }}
                                variant="h4"
                            >
                                Token Rate
                            </Typography>

                            <Stack direction="column" spacing={2} alignItems="center" justifyContent="space-between">
                                <Token>
                                    <Stack direction="row" alignItems="center" spacing={1.8}>
                                        <div>
                                            <svg width="50" height="56" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M43.7558 10.6359L30.6967 3.25855C30.5971 3.20174 30.4935 3.16522 30.3939 3.11246L24.8161 0L19.371 3.05159C19.23 3.12464 19.0766 3.18145 18.9397 3.25855L5.88056 10.6359C2.25186 12.6852 0 16.5038 0 20.6023C0 20.6023 0.0124412 35.9374 0.0787945 36.5096C0.460326 40.1577 2.59607 43.4649 5.88056 45.3194L13.3121 49.5154L13.3412 49.5316L18.9397 52.6928C18.9812 52.7171 19.0268 52.7293 19.0641 52.7536L24.8161 55.9919L30.5308 52.7699C30.5847 52.7415 30.6428 52.7212 30.6967 52.6887L43.7558 45.3113C47.3804 43.262 49.6364 39.4435 49.6364 35.3449V20.5901C49.6364 16.4916 47.3845 12.673 43.7558 10.6238V10.6359ZM9.08625 16.0696L24.8161 7.18261L40.546 16.0696C42.2007 17.0029 43.2167 18.7316 43.2167 20.5983V24.6806L30.6925 17.6035C30.593 17.5467 30.4893 17.5101 30.3898 17.4574L24.8161 14.3449L19.371 17.3965C19.23 17.4696 19.0766 17.5264 18.9397 17.6035L6.41553 24.6806V20.5983C6.41553 18.7316 7.43571 17.0029 9.08625 16.0696ZM40.5501 39.8817L24.8203 48.7606L9.0904 39.8817C7.43571 38.9484 6.41968 37.2197 6.41968 35.353V34.9473C6.41968 33.0806 7.43986 31.3519 9.0904 30.4186L24.8203 21.5316L40.5501 30.4186C42.2048 31.3519 43.2209 33.0806 43.2209 34.9473V35.353C43.2209 37.2197 42.2007 38.9484 40.5501 39.8817Z" fill="url(#paint0_linear_1074_874)" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_1074_874" x1="4.5" y1="10.8555" x2="44.8201" y2="42.4859" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#01FEA8" />
                                                        <stop offset="0.510417" stop-color="#46A5FF" />
                                                        <stop offset="1" stop-color="#D632FF" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                        <Stack spacing={1.5}>
                                            <Stack direction="row" spacing={1.2} alignItems="center">
                                                <Typography variant="p" sx={{ fontWeight: 700, fontSize: '16px', color: "white" }} >SYNC</Typography>
                                                <div style={{ width: "1px", height: "10px", background: "#C7C8CC" }}></div>
                                                <Typography variant="p" sx={{ fontWeight: 500, fontSize: '16px', color: "white", opacity: 0.5 }} >SYNC TOKEN</Typography>
                                            </Stack>
                                            <Typography variant="p" sx={{ fontWeight: 700, fontSize: '16px', color: "white" }}>$ 0.0012 USD</Typography>
                                        </Stack>
                                    </Stack>
                                </Token>
                            </Stack>
                        </Box>
                    </div>
                </Grid>
            </Grid>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: "#16182D",
                        color: 'white'
                    }
                }}
            />
        </>
    );
};

export default DashboardDefault;