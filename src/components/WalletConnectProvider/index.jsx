import { useMemo } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { GlowWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

export const WalletConnectProvider = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    // const network = WalletAdapterNetwork['mainnet-beta'] // mainnet
    const network = WalletAdapterNetwork.Devnet // devnet

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => {
        // if (network === WalletAdapterNetwork['mainnet-beta']) {
        //     return 'https://solana-mainnet.g.alchemy.com/v2/abs1MZKIPuo6aoxLfUfiIkvKN-d5G5wf'
        // }

        if (network === WalletAdapterNetwork.Devnet) {
            return 'https://api.devnet.solana.com'
        }

        return clusterApiUrl(network)
    }, [network])

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network }), new TorusWalletAdapter()], [network])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}