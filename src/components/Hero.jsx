import { useEffect, useState, useRef } from 'react';
import useCountUp from '../hooks/useCountUp';

export default function Hero({ onMint }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setVisible(true);
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const count1 = useCountUp(visible ? 128 : 0, 2500);
  const count2 = useCountUp(visible ? 56 : 0, 2500);
  const count3 = useCountUp(visible ? 2.8 : 0, 2500);

  const scrollToCollection = (e) => {
    e.preventDefault();
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <div className="hero-content">
        <span className="hero-badge pulse-glow">🔥 热门藏品</span>
        <h1 className="hero-title">
          发现 &amp; 收藏<br />
          <span className="hero-gradient">独特数字艺术品</span>
        </h1>
        <p className="hero-desc">
          探索由全球顶尖艺术家创作的限量版 NFT 数字藏品，
          每一件都是独一无二的区块链资产。
        </p>
        <div className="hero-actions">
          <a href="#collection" className="btn-explore" onClick={scrollToCollection}>
            🚀 探索藏品
          </a>
          <button className="btn-create" onClick={onMint}>
            ✨ 创建 NFT
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">{Math.floor(count1).toLocaleString()}K+</span>
            <span className="stat-label">藏品数量</span>
          </div>
          <div className="stat">
            <span className="stat-value">{Math.floor(count2).toLocaleString()}K+</span>
            <span className="stat-label">艺术家</span>
          </div>
          <div className="stat">
            <span className="stat-value">¥{count3.toFixed(1)}B</span>
            <span className="stat-label">交易额</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card hero-card-1 glass-card">
          <div className="hero-card-img">🐉</div>
          <span>Dragon #001</span>
        </div>
        <div className="hero-card hero-card-2 glass-card">
          <div className="hero-card-img">🦊</div>
          <span>Fox Spirit</span>
        </div>
        <div className="hero-card hero-card-3 glass-card">
          <div className="hero-card-img">🌌</div>
          <span>Cosmos</span>
        </div>
      </div>
    </section>
  );
}
