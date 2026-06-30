import { useState, useEffect, useRef } from 'react';
import { toast } from './Toast';

// 烟花式彩带
function ConfettiSplash({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const c = ref.current;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const ctx = c.getContext('2d');
    const colors = ['#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#a78bfa'];
    const pieces = Array.from({length: 200}, () => ({
      x: c.width / 2, y: c.height / 2,
      vx: (Math.random() - 0.5) * 16, vy: (Math.random() - 0.5) * 16 - 8,
      r: Math.random() * 4 + 2, color: colors[Math.floor(Math.random() * colors.length)],
      life: 1, decay: 0.005 + Math.random() * 0.01,
    }));
    let f = 0, id;
    const draw = () => {
      f++; ctx.clearRect(0, 0, c.width, c.height);
      let done = true;
      for (const p of pieces) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life -= p.decay;
        if (p.life <= 0) continue;
        done = false;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (done || f > 250) { cancelAnimationFrame(id); return; }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [active]);
  return <canvas ref={ref} className="confetti-canvas" />;
}

const EMOJIS = ['🐉', '🦊', '🤖', '🐱', '🐧', '🦍', '🦌', '🌑', '🌸', '💀', '👾', '🧿', '🪐', '🔥', '⚡'];

export default function MintModal({ wallet, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    description: '',
    price: '',
    file: null,
  });
  const [isMinting, setIsMinting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      toast.warning('请填写名称和价格');
      return;
    }
    setIsMinting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsMinting(false);
    setShowConfetti(true);
    toast.success(`🎉 "${form.name}" 铸造成功！已上架市场`);
    setTimeout(() => {
      setShowConfetti(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content mint-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* 步骤条 */}
        <div className="mint-steps">
          <div className={`mint-step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-label">基本信息</span>
          </div>
          <div className="step-line" />
          <div className={`mint-step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-label">定价上架</span>
          </div>
          <div className="step-line" />
          <div className={`mint-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-label">确认铸造</span>
          </div>
        </div>

        {step === 1 && (
          <form className="mint-form" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <h3 className="mint-title">创建你的 NFT</h3>
            <label className="field-label">NFT 名称</label>
            <input
              className="field-input"
              placeholder="给你的藏品起个名字..."
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={30}
            />
            <label className="field-label">选择图标</label>
            <div className="emoji-picker">
              {EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  className={`emoji-opt ${form.emoji === em ? 'selected' : ''}`}
                  onClick={() => setForm({ ...form, emoji: em })}
                >
                  {em}
                </button>
              ))}
            </div>
            <label className="field-label">描述</label>
            <textarea
              className="field-input field-textarea"
              placeholder="描述你的 NFT 作品..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              maxLength={200}
            />
            <button type="submit" className="btn-next">下一步 →</button>
          </form>
        )}

        {step === 2 && (
          <form className="mint-form" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
            <h3 className="mint-title">定价 & 预览</h3>
            <div className="mint-preview">
              <span className="mint-preview-emoji">{form.emoji}</span>
              <div className="mint-preview-info">
                <strong>{form.name || '未命名'}</strong>
                <span>by {wallet.shortAddress}</span>
              </div>
            </div>
            <label className="field-label">售价 (ETH)</label>
            <input
              className="field-input"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <span className="field-hint">≈ ¥{(form.price * 18500 || 0).toLocaleString()}</span>
            <div className="mint-fee-row">
              <span>平台手续费 (2.5%)</span>
              <span>{((form.price || 0) * 0.025).toFixed(4)} ETH</span>
            </div>
            <div className="mint-fee-row">
              <span>Gas 预估</span>
              <span>~0.002 ETH</span>
            </div>
            <div className="btn-row">
              <button type="button" className="btn-back" onClick={() => setStep(1)}>← 返回</button>
              <button type="submit" className="btn-next">下一步 →</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="mint-form">
            <h3 className="mint-title">确认铸造</h3>
            <div className="mint-confirm">
              <div className="mint-confirm-row"><span>名称</span><span>{form.name}</span></div>
              <div className="mint-confirm-row"><span>创作者</span><span className="mono">{wallet.shortAddress}</span></div>
              <div className="mint-confirm-row"><span>售价</span><span className="price">{form.price} ETH</span></div>
              <div className="mint-confirm-row"><span>版税</span><span>5%</span></div>
            </div>
            <button
              className="btn-mint"
              onClick={handleSubmit}
              disabled={isMinting}
            >
              {isMinting ? (
                <>
                  <span className="spinner" />
                  <span>正在铸造到区块链...</span>
                </>
              ) : (
                '🔥 确认铸造'
              )}
            </button>
            <button type="button" className="btn-back" onClick={() => setStep(2)} style={{marginTop: 12, width: '100%'}}>← 返回修改</button>
          </div>
        )}
      </div>
      <ConfettiSplash active={showConfetti} />
    </div>
  );
}
