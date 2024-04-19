// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { WalletConnectProvider } from './components/WalletConnectProvider'
import '@solana/wallet-adapter-react-ui/styles.css'

import './index.css';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <WalletConnectProvider>
        <ThemeCustomization>
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    </WalletConnectProvider>
);

export default App;