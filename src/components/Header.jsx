export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" className="logo">
          <span className="logo-icon">💎</span>
          <span className="logo-text">CryptoNFT</span>
        </a>
        <nav className="nav">
          <a href="#home">首页</a>
          <a href="#collection">藏品</a>
          <a href="#about">关于</a>
        </nav>
        <button className="btn-connect">连接钱包</button>
      </div>
    </header>
  );
}
