import { useState, useEffect, useRef } from 'react';
import { toast } from './Toast';

// 迷你彩带 Canvas
function ConfettiBurst({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const colors = ['#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#a78bfa','#f472b6'];
    const pieces = [];
    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        w: Math.random() * 10 + 4,
        h: Math.random() * 6 + 2,
        color: colors[i % colors.length],
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 6,
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 15,
        opacity: 1,
      });
    }
    let frame = 0, animId;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let done = true;
      for (const p of pieces) {
        p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
        p.vy += 0.15; p.opacity -= 0.007;
        if (p.opacity <= 0) continue;
        done = false;
        ctx.save(); ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (done || frame > 200) { cancelAnimationFrame(animId); return; }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [active]);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
}

export default function NFTModal({ nft, onClose, wallet }) {
  const [buying, setBuying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBuy = async () => {
    setBuying(true);
    await new Promise((r) => setTimeout(r, 1800));
    setBuying(false);
    setShowConfetti(true);
    toast.success(`🎉 成功购买 ${nft.title}！`);
    setTimeout(() => {
      setShowConfetti(false);
      onClose();
    }, 2800);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-body">
            <div className="modal-image tilt-box">
              <span className="modal-emoji">{nft.image}</span>
              {nft.rarity === 'legendary' && <div className="glow-ring-large" />}
              {nft.rarity && (
                <span className={`nft-badge rarity-${nft.rarity} modal-badge`}>
                  {nft.rarity === 'legendary' ? '👑 传说' :
                   nft.rarity === 'epic' ? '💜 史诗' :
                   nft.rarity === 'rare' ? '💙 稀有' : '⚪ 普通'}
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
                <button
                  className={`btn-buy large ${buying ? 'loading-btn' : ''}`}
                  onClick={handleBuy}
                  disabled={buying}
                >
                  {buying ? (
                    <><span className="spinner" /> 交易确认中...</>
                  ) : (
                    '💎 立即购买'
                  )}
                </button>
              </div>
              {wallet && (
                <p className="buy-hint">
                  购买方: <span className="mono">{wallet.shortAddress}</span>
                  {' '}· Gas 预估: ~0.003 ETH
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfettiBurst active={showConfetti} />
    </>
  );
}
