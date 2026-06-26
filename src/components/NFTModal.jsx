export default function NFTModal({ nft, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <div className="modal-image">
            <span className="modal-emoji">{nft.image}</span>
            {nft.rarity && (
              <span className={`nft-badge rarity-${nft.rarity} modal-badge`}>
                {nft.rarity === 'legendary' ? '传说' :
                 nft.rarity === 'epic' ? '史诗' :
                 nft.rarity === 'rare' ? '稀有' : '普通'}
              </span>
            )}
          </div>
          <div className="modal-details">
            <h2 className="modal-title">{nft.title}</h2>
            <p className="modal-desc">{nft.desc}</p>
            <div className="modal-meta">
              <div className="meta-item">
                <span className="meta-label">创作者</span>
                <span className="meta-value">{nft.creatorAvatar} {nft.creator}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">持有者</span>
                <span className="meta-value mono">{nft.owner}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Token ID</span>
                <span className="meta-value">{nft.tokenId}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">剩余时间</span>
                <span className="meta-value">{nft.timeLeft.replace('⏱ ', '')}</span>
              </div>
            </div>
            <div className="modal-price-row">
              <div className="modal-price">
                <span className="price-label">当前价格</span>
                <span className="price-value large">{nft.price} ETH</span>
                <span className="price-usd">≈ ¥{(nft.price * 18500).toLocaleString()}</span>
              </div>
              <button className="btn-buy large">立即购买</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
