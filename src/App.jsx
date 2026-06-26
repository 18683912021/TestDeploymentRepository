import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NFTGrid from './components/NFTGrid';
import NFTModal from './components/NFTModal';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [selectedNFT, setSelectedNFT] = useState(null);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <NFTGrid onSelect={setSelectedNFT} />
      </main>
      <Footer />
      {selectedNFT && (
        <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
      )}
    </>
  );
}
