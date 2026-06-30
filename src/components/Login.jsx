import { useState } from 'react';

export default function Login({ onConnect, isConnecting, connectStep, error }) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleMetaMaskLogin = async () => {
    if (!termsAccepted) return;
    await onConnect();
  };

  const stepLabel = connectStep === 'connecting'
    ? '正在连接钱包...'
    : connectStep === 'signing'
    ? '请在 MetaMask 中签名'
    : null;

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-orb orb-3" />
        <div className="bg-grid" />
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="login-logo-icon">💎</span>
            <h1>CryptoNFT</h1>
          </div>
          <p className="login-subtitle">连接钱包，探索数字艺术的世界</p>
        </div>

        {/* MetaMask 登录按钮 */}
        <button
          className={`metamask-btn ${isConnecting ? 'loading' : ''}`}
          onClick={handleMetaMaskLogin}
          disabled={isConnecting}
          title={!termsAccepted ? '请先同意服务条款' : ''}
        >
          {isConnecting ? (
            <>
              <span className="spinner" />
              <div className="signing-info">
                <span className="signing-step">{stepLabel}</span>
                {connectStep === 'signing' && (
                  <span className="signing-hint">
                    此签名不产生 Gas 费，用于验证钱包所有权
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <svg className="metamask-icon" viewBox="0 0 35 33" fill="none">
                <path d="M32.958 1L19.724 10.857 22.174 5.06 32.958 1Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25"/>
                <path d="M2.063 1L15.173 10.952 12.835 5.06 2.063 1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25"/>
                <path d="M27.41 21.786L24.15 26.689L31.03 28.598L33.006 21.926L27.41 21.786Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25"/>
                <path d="M2.018 21.926L3.98 28.598L10.86 26.689L7.6 21.786L2.018 21.926Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25"/>
                <path d="M10.48 14.669L8.562 17.58L15.376 17.886L15.138 10.485L10.48 14.669Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25"/>
                <path d="M24.528 14.669L19.796 10.399L19.642 17.886L26.456 17.58L24.528 14.669Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25"/>
                <path d="M10.86 26.689L14.98 24.702L11.268 21.926L10.86 26.689Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25"/>
                <path d="M20.028 24.702L24.15 26.689L23.742 21.926L20.028 24.702Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25"/>
                <path d="M24.15 26.689L20.028 24.702L20.366 27.394L20.338 28.468L24.15 26.689Z" fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="0.25"/>
                <path d="M10.86 26.689L14.672 28.468L14.656 27.394L14.98 24.702L10.86 26.689Z" fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="0.25"/>
                <path d="M14.734 20.424L11.154 19.37L13.676 18.204L14.734 20.424Z" fill="#233447" stroke="#233447" strokeWidth="0.25"/>
                <path d="M20.272 20.424L21.33 18.204L23.866 19.37L20.272 20.424Z" fill="#233447" stroke="#233447" strokeWidth="0.25"/>
                <path d="M10.86 26.689L11.282 21.786L7.6 21.926L10.86 26.689Z" fill="#CC6228" stroke="#CC6228" strokeWidth="0.25"/>
                <path d="M23.728 21.786L24.15 26.689L27.41 21.926L23.728 21.786Z" fill="#CC6228" stroke="#CC6228" strokeWidth="0.25"/>
                <path d="M26.456 17.58L19.642 17.886L20.278 20.424L21.336 18.204L23.872 19.37L26.456 17.58Z" fill="#CC6228" stroke="#CC6228" strokeWidth="0.25"/>
                <path d="M11.154 19.37L13.676 18.204L14.734 20.424L15.376 17.886L8.562 17.58L11.154 19.37Z" fill="#CC6228" stroke="#CC6228" strokeWidth="0.25"/>
                <path d="M8.562 17.58L11.268 21.926L11.154 19.37L8.562 17.58Z" fill="#E27525" stroke="#E27525" strokeWidth="0.25"/>
                <path d="M23.872 19.37L23.742 21.926L26.456 17.58L23.872 19.37Z" fill="#E27525" stroke="#E27525" strokeWidth="0.25"/>
                <path d="M15.376 17.886L14.734 20.424L15.516 24.324L15.67 19.006L15.376 17.886Z" fill="#E27525" stroke="#E27525" strokeWidth="0.25"/>
                <path d="M19.642 17.886L19.362 18.992L19.49 24.324L20.278 20.424L19.642 17.886Z" fill="#E27525" stroke="#E27525" strokeWidth="0.25"/>
                <path d="M20.278 20.424L19.49 24.324L20.028 24.702L23.742 21.926L23.872 19.37L20.278 20.424Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.25"/>
                <path d="M11.154 19.37L11.268 21.926L14.98 24.702L15.516 24.324L14.734 20.424L11.154 19.37Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.25"/>
                <path d="M20.338 28.468L20.366 27.394L20.042 27.114H14.966L14.656 27.394L14.672 28.468L10.86 26.689L12.178 27.774L14.912 29.67H20.096L22.832 27.774L24.15 26.689L20.338 28.468Z" fill="#C0AC9D" stroke="#C0AC9D" strokeWidth="0.25"/>
                <path d="M20.028 24.702L19.49 24.324H15.516L14.98 24.702L14.656 27.394L14.966 27.114H20.042L20.366 27.394L20.028 24.702Z" fill="#161616" stroke="#161616" strokeWidth="0.25"/>
                <path d="M33.308 10.707L34.5 5.67L32.958 1L20.028 10.649L24.528 14.669L30.926 16.494L33.382 13.646L32.308 12.866L33.038 12.196L31.882 11.306L32.75 10.637L33.308 10.707Z" fill="#763E1A" stroke="#763E1A" strokeWidth="0.25"/>
                <path d="M0.5 5.67L1.706 10.707L2.25 10.637L3.118 11.306L1.962 12.196L2.692 12.866L1.618 13.646L4.074 16.494L10.472 14.669L14.972 10.649L2.042 1L0.5 5.67Z" fill="#763E1A" stroke="#763E1A" strokeWidth="0.25"/>
                <path d="M30.926 16.494L24.528 14.669L26.456 17.58L23.742 21.926L27.41 21.926H33.006L30.926 16.494Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.25"/>
                <path d="M10.472 14.669L4.074 16.494L2.018 21.926H7.6L11.268 21.926L8.554 17.58L10.472 14.669Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.25"/>
                <path d="M19.642 17.886L20.028 10.649L22.216 5.06H12.792L14.972 10.649L15.376 17.886L15.502 19.02L15.516 24.324H19.49L19.518 19.02L19.642 17.886Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.25"/>
              </svg>
              <span>MetaMask 登录</span>
            </>
          )}
        </button>

        {/* 连接步骤指示器 */}
        {isConnecting && (
          <div className="connect-steps">
            <div className={`connect-step-item ${connectStep === 'connecting' ? 'active' : connectStep === 'signing' || connectStep === 'done' ? 'done' : ''}`}>
              <span className="cs-dot">{connectStep === 'done' || connectStep === 'signing' ? '✓' : '1'}</span>
              <span>连接钱包</span>
            </div>
            <div className="cs-line" />
            <div className={`connect-step-item ${connectStep === 'signing' ? 'active' : connectStep === 'done' ? 'done' : ''}`}>
              <span className="cs-dot">{connectStep === 'done' ? '✓' : '2'}</span>
              <span>签名验证</span>
            </div>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="login-error">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* 服务条款 */}
        <label className="terms-check">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <span className="checkmark" />
          <span className="terms-text">
            我已阅读并同意{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>服务条款</a>
            {' '}和{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>隐私政策</a>
          </span>
        </label>

        {/* 分隔线 */}
        <div className="divider">
          <span>其他登录方式</span>
        </div>

        {/* 其他钱包 */}
        <div className="other-wallets">
          <button className="wallet-option" disabled title="即将支持">
            <span className="wallet-option-icon">🦊</span>
            <span>Coinbase</span>
            <span className="coming-soon">即将上线</span>
          </button>
          <button className="wallet-option" disabled title="即将支持">
            <span className="wallet-option-icon">👛</span>
            <span>WalletConnect</span>
            <span className="coming-soon">即将上线</span>
          </button>
        </div>

        {/* 底部提示 */}
        <p className="login-footer-text">
          首次使用？{' '}
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
          >
            安装 MetaMask
          </a>
        </p>
      </div>
    </div>
  );
}
