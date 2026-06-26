export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-text">💎 CryptoNFT</span>
          <p>发现、收藏和交易独特数字艺术品的 NFT 平台。</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>市场</h4>
            <a href="#">浏览藏品</a>
            <a href="#">排行榜</a>
            <a href="#">热门艺术家</a>
          </div>
          <div className="footer-col">
            <h4>资源</h4>
            <a href="#">帮助中心</a>
            <a href="#">API 文档</a>
            <a href="#">博客</a>
          </div>
          <div className="footer-col">
            <h4>关于</h4>
            <a href="#">关于我们</a>
            <a href="#">联系我们</a>
            <a href="#">服务条款</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 CryptoNFT. All rights reserved.</p>
      </div>
    </footer>
  );
}
