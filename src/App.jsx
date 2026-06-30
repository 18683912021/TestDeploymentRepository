import { useState } from 'react';
import useWallet from './hooks/useWallet';
import Login from './components/Login';
import Header from './components/Header';
import Hero from './components/Hero';
import NFTGrid from './components/NFTGrid';
import MintModal from './components/MintModal';
import ToastContainer from './components/Toast';
import Particles from './components/Particles';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [showMint, setShowMint] = useState(false);
  const wallet = useWallet();

  const isLoggedIn = wallet.account && wallet.signature;

  if (!isLoggedIn) {
    return (
      <>
        <Particles />
        <Login
          onConnect={wallet.connect}
          isConnecting={wallet.isConnecting}
          connectStep={wallet.connectStep}
          error={wallet.error}
        />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <Particles />
      <Header wallet={wallet} />
      <main>
        <Hero onMint={() => setShowMint(true)} />
        <NFTGrid wallet={wallet} />
      </main>
      <Footer />
      {showMint && (
        <MintModal
          wallet={wallet}
          onClose={() => setShowMint(false)}
        />
      )}
      <ToastContainer />
    </>
  );
}
