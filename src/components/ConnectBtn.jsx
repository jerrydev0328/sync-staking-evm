import { Button } from '@mui/material';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const styles = {
  connect: {
    background: "linear-gradient(135deg, #01FEA8 0%, #46A5FF 51.04%, #D632FF 100%)",
    borderRadius: '50px'
  }
}

export const ConnectBtn = () => {
  return (
    <WalletMultiButton style={styles.connect} />
    
  );
};