import { useState, useRef, useEffect } from 'react';
import { toast } from './Toast';

export default function Header({ wallet }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // 断开确认：在菜单内展开确认按钮
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);
  const menuRef = useRef(null);

  const chainNames = {
    1: 'Ethereum', 5: 'Goerli', 11155111: 'Sepolia', 137: 'Polygon', 56: 'BSC',
  };
  const chainName = chainNames[wallet.chainId] || `Chain ${wallet.chainId || '?'}`;

  // 点击外部关闭菜单
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setConfirmDisconnect(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const copyAddress = () => {
    navigator.clipboard?.writeText(wallet.account);
    toast.success('地址已复制到剪贴板');
    setMenuOpen(false);
  };

  // 第一步：点击"断开连接" → 展开确认
  const handleDisconnectClick = (e) => {
    e.stopPropagation();
    setConfirmDisconnect(true);
  };

  // 第二步：确认断开
  const handleConfirmDisconnect = () => {
    wallet.disconnect();
    setMenuOpen(false);
    setConfirmDisconnect(false);
    toast.info('钱包已断开连接，签名已清除');
  };

  // 取消断开
  const handleCancelDisconnect = (e) => {
    e.stopPropagation();
    setConfirmDisconnect(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" className="logo">
          <span className="logo-icon">💎</span>
          <span className="logo-text">CryptoNFT</span>
        </a>
        <nav className="nav">
          <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}>首页</a>
          <a href="#collection" onClick={(e) => { e.preventDefault(); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }}>藏品</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>关于</a>
        </nav>
        <div className="wallet-info" ref={menuRef}>
          <div className="wallet-chip">
            <span className="chain-dot pulse-dot" />
            <span className="chain-name">{chainName}</span>
          </div>
          <div className="wallet-chip balance">
            <span className="balance-value">{wallet.balance || '0'}</span>
            <span className="balance-unit">ETH</span>
          </div>

          {/* 签名状态指示 */}
          <div className="wallet-chip signed" title="已签名验证">
            <span>🔐</span>
          </div>

          {/* 钱包地址 — 点击展开菜单 */}
          <div className="wallet-dropdown-wrapper">
            <button
              className={`wallet-chip address ${menuOpen ? 'active' : ''}`}
              onClick={() => {
                setMenuOpen(!menuOpen);
                setConfirmDisconnect(false);
              }}
            >
              <span className="address-dot" />
              <span className="address-text">{wallet.shortAddress}</span>
              <span className={`dropdown-arrow ${menuOpen ? 'open' : ''}`}>▾</span>
            </button>

            {menuOpen && (
              <div className="wallet-dropdown">
                <div className="dropdown-header">
                  <span className="dropdown-addr-mono">{wallet.shortAddress}</span>
                  <span className="dropdown-online">🔐 已签名验证</span>
                </div>
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={copyAddress}>
                  📋 复制地址
                </button>
                <a
                  className="dropdown-item"
                  href={`https://etherscan.io/address/${wallet.account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 在 Etherscan 查看
                </a>

                {!confirmDisconnect ? (
                  <>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-item disconnect"
                      onClick={handleDisconnectClick}
                    >
                      🚪 断开连接
                    </button>
                  </>
                ) : (
                  <>
                    <div className="dropdown-divider" />
                    <div className="dropdown-confirm">
                      <p className="confirm-warn">断开后需重新连接钱包并签名</p>
                      <div className="confirm-btns">
                        <button
                          className="confirm-btn-small cancel"
                          onClick={handleCancelDisconnect}
                        >
                          取消
                        </button>
                        <button
                          className="confirm-btn-small danger"
                          onClick={handleConfirmDisconnect}
                        >
                          确认断开
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
