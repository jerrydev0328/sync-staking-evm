import * as anchor from '@project-serum/anchor'
import { useEffect, useMemo, useState } from 'react'
import { STAKE_PROGRAM_PUBKEY, MINT_ADDRESS} from './../configs/config'
import profileIdl from './../configs/idl.json'
import { SystemProgram, LAMPORTS_PER_SOL  } from '@solana/web3.js'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getOrCreateAssociatedTokenAccount, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import toast from '../../node_modules/react-hot-toast/dist/index'
import { TOKEN_PROGRAM_ID } from '../../node_modules/@project-serum/anchor/dist/cjs/utils/token'


export function useStake() {
    const { connection } = useConnection()
    const { publicKey } = useWallet()
    const anchorWallet = useAnchorWallet()

    const [loading, setLoading] = useState(false)
    const [stakeInfor, setStakeInfo] = useState(null)
    const [stakeBalance, setStakeBalance] = useState(0)
    const [transactionPending, setTransactionPending] = useState(false)


    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
            return new anchor.Program(profileIdl, STAKE_PROGRAM_PUBKEY, provider)
        }
    }, [connection, anchorWallet])

    useEffect(() => {
        // state fetching data implement here
        const userStake = async() => {
            if (program && publicKey && !transactionPending) {
                try {
                    setLoading(true)
                    const [stakeInfo] = findProgramAddressSync([Buffer.from('stake_info'), publicKey.toBuffer()], program.programId)
                    let [stakeAccount] = findProgramAddressSync(
                        [Buffer.from("token"), publicKey.toBuffer()],
                        program.programId
                    );
                    const Stake_info = await program.account.stakeInfo.fetch(stakeInfo)
                    const tokenAmount = await connection.getTokenAccountBalance(stakeAccount)
                    console.log(Stake_info)
                    if (Stake_info) {
                        setStakeInfo(Stake_info)
                        // setInitialized(true)

                        setStakeBalance(tokenAmount.value.uiAmount)
                    } 
                } catch (error) {
                    setStakeInfo({})
                    setStakeBalance(0)
                    console.log(error)
                    // setInitialized(false)
                    // setTodos([])
                } finally {
                    setLoading(false)
                }
            }
        }

        userStake()

    }, [publicKey, program, transactionPending])

    const stake = async (amount, lockPeriod) => {
        if(program && publicKey) {
            try {
                setTransactionPending(true)
                let userTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection, 
                    anchorWallet,
                    MINT_ADDRESS,
                    publicKey,
                    undefined,
                    "confirmed",
                    undefined,
                    TOKEN_2022_PROGRAM_ID
                );

                console.log(userTokenAccount);

                const [stakeInfo] = findProgramAddressSync([Buffer.from('stake_info'), publicKey.toBuffer()], program.programId)
                console.log(stakeInfo);

                let [stakeAccount] = findProgramAddressSync(
                    [Buffer.from("token"), publicKey.toBuffer()],
                    program.programId
                  );
              
                console.log(stakeAccount);
                console.log(anchorWallet);

                const tx = await program.methods
                    .stake(new anchor.BN(amount), new anchor.BN(lockPeriod))
                    .accounts({
                        signer: anchorWallet.publicKey,
                        stakeInfoAccount: stakeInfo,
                        stakeAccount: stakeAccount,
                        userTokenAccount: userTokenAccount.address,
                        mint: MINT_ADDRESS,
                        tokenProgram: TOKEN_2022_PROGRAM_ID,
                        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
                    })
                    .rpc()
                    console.log(tx);
                    
                    
                    toast.success('Token staked successfully')
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong')
            } finally {
                setTransactionPending(false)
            }

        }
    }

    const destake = async () => {
        if(program && publicKey) {
            try {
                setTransactionPending(true)
                let userTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection, 
                    anchorWallet,
                    MINT_ADDRESS,
                    publicKey,
                    undefined,
                    "confirmed",
                    undefined,
                    TOKEN_2022_PROGRAM_ID
                );

                console.log(userTokenAccount);

                const [stakeInfo] = findProgramAddressSync([Buffer.from('stake_info'), publicKey.toBuffer()], program.programId)
                console.log(stakeInfo);

                let [stakeAccount] = findProgramAddressSync(
                    [Buffer.from("token"), publicKey.toBuffer()],
                    program.programId
                );

                let [vaultAccount] = findProgramAddressSync(
                    [Buffer.from("vault")],
                    program.programId
                )
              
                console.log(stakeAccount);
                console.log(vaultAccount.toString());

                
                const tx = await program.methods
                    .destake()
                    .accounts({
                        signer: publicKey,
                        tokenVaultAccount: vaultAccount,
                        stakeInfoAccount: stakeInfo,
                        stakeAccount: stakeAccount,
                        userTokenAccount: userTokenAccount.address,
                        mint: MINT_ADDRESS,
                        tokenProgram: TOKEN_2022_PROGRAM_ID
                    })
                    .rpc()
                    console.log(tx);
                    

                    toast.success('Token Unstaked successfully')
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong')
            } finally {
                setTransactionPending(false)
            }

        }
    }

    return { loading, transactionPending, setTransactionPending, stake, destake, stakeInfor, stakeBalance }

}



