export default function NFTCard({ nft, onSelect }) {
  return (
    <div className="nft-card" onClick={() => onSelect(nft)}>
      <div className="nft-image">
        <span className="nft-emoji">{nft.image}</span>
        {nft.rarity && (
          <span className={`nft-badge rarity-${nft.rarity}`}>
            {nft.rarity === 'legendary' ? '传说' :
             nft.rarity === 'epic' ? '史诗' :
             nft.rarity === 'rare' ? '稀有' : '普通'}
          </span>
        )}
        <div className="nft-time">{nft.timeLeft}</div>
      </div>
      <div className="nft-info">
        <h3 className="nft-title">{nft.title}</h3>
        <div className="nft-creator">
          <span className="creator-avatar">{nft.creatorAvatar}</span>
          <span className="creator-name">{nft.creator}</span>
        </div>
        <div className="nft-footer">
          <div className="nft-price">
            <span className="price-label">当前价格</span>
            <span className="price-value">{nft.price} ETH</span>
          </div>
          <button className="btn-buy" onClick={(e) => { e.stopPropagation(); onSelect(nft); }}>
            购买
          </button>
        </div>
      </div>
    </div>
  );
}
