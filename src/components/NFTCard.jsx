import { useState, useRef } from 'react';
import { toast } from './Toast';

export default function NFTCard({ nft, isLiked, onToggleLike, delay = 0, wallet }) {
  const [flipped, setFlipped] = useState(false);
  const [buying, setBuying] = useState(false);
  const innerRef = useRef(null);

  // 3D 倾斜 (作用在 inner 上，不与翻转冲突)
  const handleMouseMove = (e) => {
    if (flipped) return;
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleMouseLeave = () => {
    if (flipped) return;
    if (innerRef.current) innerRef.current.style.transform = '';
  };

  const handleFlip = (e) => {
    if (e.target.closest('.no-flip')) return;
    if (innerRef.current) innerRef.current.style.transform = '';
    setFlipped(!flipped);
  };

  const handleBuy = async (e) => {
    e.stopPropagation();
    setBuying(true);
    await new Promise((r) => setTimeout(r, 1500));
    setBuying(false);
    toast.success(`🎉 成功购买 ${nft.title}！`);
    setFlipped(false);
  };

  return (
    <div
      className={`nft-card card-3d ${flipped ? 'flipped' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D 翻转内层 */}
      <div ref={innerRef} className="card-inner" onClick={handleFlip}>
        {/* === 正面 === */}
        <div className="card-face card-front">
          <div className="nft-image">
            <span className="nft-emoji">{nft.image}</span>
            {nft.rarity && (
              <span className={`nft-badge rarity-${nft.rarity}`}>
                {nft.rarity === 'legendary' ? '传说' :
                 nft.rarity === 'epic' ? '史诗' :
                 nft.rarity === 'rare' ? '稀有' : '普通'}
              </span>
            )}
            <button
              className={`nft-like no-flip ${isLiked ? 'liked' : ''}`}
              onClick={(e) => { e.stopPropagation(); onToggleLike(); }}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
            {nft.rarity === 'legendary' && <div className="glow-ring" />}
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
              <span className="flip-hint">点击翻面 ↻</span>
            </div>
          </div>
        </div>

        {/* === 背面：详情 === */}
        <div className="card-face card-back">
          <button
            className="card-back-close no-flip"
            onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
          >
            ✕
          </button>

          <div className="back-emoji-ring">
            <span>{nft.image}</span>
          </div>

          <h3 className="back-title">{nft.title}</h3>

          {nft.rarity && (
            <span className={`nft-badge-big rarity-${nft.rarity}`}>
              {nft.rarity === 'legendary' ? '👑 传说级' :
               nft.rarity === 'epic' ? '💜 史诗级' :
               nft.rarity === 'rare' ? '💙 稀有级' : '⚪ 普通级'}
            </span>
          )}

          <p className="back-desc">{nft.desc}</p>

          <div className="back-meta">
            <div className="back-meta-row">
              <span>创作者</span>
              <span>{nft.creatorAvatar} {nft.creator}</span>
            </div>
            <div className="back-meta-row">
              <span>持有者</span>
              <span className="mono">{nft.owner}</span>
            </div>
            <div className="back-meta-row">
              <span>Token ID</span>
              <span>{nft.tokenId}</span>
            </div>
            <div className="back-meta-row">
              <span>剩余时间</span>
              <span className="time-val">{nft.timeLeft.replace('⏱ ', '')}</span>
            </div>
          </div>

          <div className="back-price-row">
            <div>
              <span className="price-label">价格</span>
              <span className="price-big">{nft.price} ETH</span>
              <span className="price-usd">≈ ¥{(nft.price * 18500).toLocaleString()}</span>
            </div>
          </div>

          <button
            className={`btn-buy back-buy no-flip ${buying ? 'loading-btn' : ''}`}
            onClick={handleBuy}
            disabled={buying}
          >
            {buying ? (
              <><span className="spinner" /> 确认中...</>
            ) : (
              '💎 立即购买'
            )}
          </button>

          {wallet && (
            <p className="back-buyer">购买方: <span className="mono">{wallet.shortAddress}</span></p>
          )}

          <p className="back-tap-hint">点击卡片外区域或 ✕ 翻回正面</p>
        </div>
      </div>
    </div>
  );
}
