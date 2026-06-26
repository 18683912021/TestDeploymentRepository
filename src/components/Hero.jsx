export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="hero-badge">🔥 热门藏品</span>
        <h1 className="hero-title">
          发现 &amp; 收藏<br />
          <span className="hero-gradient">独特数字艺术品</span>
        </h1>
        <p className="hero-desc">
          探索由全球顶尖艺术家创作的限量版 NFT 数字藏品，
          每一件都是独一无二的区块链资产。
        </p>
        <div className="hero-actions">
          <a href="#collection" className="btn-explore">探索藏品</a>
          <a href="#collection" className="btn-create">创建 NFT</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">128K+</span>
            <span className="stat-label">藏品数量</span>
          </div>
          <div className="stat">
            <span className="stat-value">56K+</span>
            <span className="stat-label">艺术家</span>
          </div>
          <div className="stat">
            <span className="stat-value">¥2.8B</span>
            <span className="stat-label">交易额</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card hero-card-1">
          <div className="hero-card-img">🐉</div>
          <span>Dragon #001</span>
        </div>
        <div className="hero-card hero-card-2">
          <div className="hero-card-img">🦊</div>
          <span>Fox Spirit</span>
        </div>
        <div className="hero-card hero-card-3">
          <div className="hero-card-img">🌌</div>
          <span>Cosmos</span>
        </div>
      </div>
    </section>
  );
}
