import React, { useContext, useEffect, useState } from 'react'
import MainCard from './MainCard'
import { Box, Stack, Typography, Divider, Paper } from "@mui/material"

import { GlobalContext } from 'context/GlobalContext';
import Countdown from './Countdown';
import { useStake } from 'hooks/solanaHooks';

const TimeComponent = ({ stakeInfor, stakeBalance }) => {

    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const { blockchainData } = useContext(GlobalContext)

    const [opt, setOpt] = useState(0)

    // let symbol = opt < 5 ? "ASVORIA" : "USDT"
    let symbol = "ASVORIA"
    // let decimals = opt < 5 ? 9 : 6

    let deadline = new Date().getTime()
    if (stakeInfor) {
        deadline = stakeInfor.isStaked ? (parseInt(stakeInfor.stakeAt.toString()) + parseInt(stakeInfor.lockPeriod.toString())) * 1000 : 0
        deadline = isNaN(deadline) ? 0 : deadline
        console.log(deadline)
    }

    const styles = {
        lockPeriod: {
            textAlign: 'center',
            fontFamily: 'Space Grotesk',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '20px',
            color: 'white'
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
            fontSize: '16px',
            lineHeight: '16px',
            color: 'white',
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
            padding: '18px 16px',
            background: '#e5e5e5',
            color: '#000515',
            borderRadius: 0
        },
        btn: {
            width: '100%',
            bgcolor: '#F5331E',
            fontFamily: 'Space Grotesk',
            fontSize: '16px',
            borderRadius: 0,
            color: "#fff",
            py: 2,
            px: 2,
            '&:hover': {
                bgcolor: "#ff7262"
            }
        }
    }

    const handleChange = (e) => {
        setOpt(e.target.value)
    }

    return (
        <div>
            <Box
                sx={{
                    bgcolor: "#121212 !important",
                    padding: "1.5rem 1.2rem",
                    borderRadius: "0.5rem"
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography
                        sx={{ color: "#01FEA8", fontWeight: 700 }}
                        variant="h4"
                    >Lock Period
                    </Typography>
                </Stack>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 4.5, pb: 3.5, pl: 1, pr: 1, flexDirection: 'column' }}
                >
                    <Stack spacing={1}>
                        <Typography variant="p" sx={styles.lockPeriod}>{daysInWeek[new Date(deadline).getDay()]}</Typography>
                        <Typography variant="p" sx={styles.lockPeriod}>{new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(deadline))}</Typography>
                    </Stack>

                    <Countdown deadline={deadline} />
                    <Typography variant="p" sx={styles.lockAmount}>Token Staked: {new Intl.NumberFormat("en-US").format(stakeBalance.toString()) + " " + symbol} </Typography>
                </Box>
            </Box>
        </div>
    )
}

export default TimeComponent;