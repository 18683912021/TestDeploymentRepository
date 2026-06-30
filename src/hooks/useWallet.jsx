import { useState, useEffect, useCallback } from 'react';

// 生成签名消息
const buildSignMessage = (address) =>
  `欢迎来到 CryptoNFT！\n\n请签名此消息以验证您的钱包所有权。\n\n钱包地址: ${address}\n时间戳: ${new Date().toISOString()}\n\n此操作不会产生任何 Gas 费用。`;

export default function useWallet() {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [signature, setSignature] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectStep, setConnectStep] = useState('idle'); // idle → connecting → signing → done
  const [error, setError] = useState(null);

  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : null;

  const shortSignature = signature
    ? `${signature.slice(0, 10)}...${signature.slice(-6)}`
    : null;

  // 获取余额
  const fetchBalance = useCallback(async (addr) => {
    try {
      const bal = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [addr, 'latest'],
      });
      setBalance(parseFloat(parseInt(bal, 16) / 1e18).toFixed(4));
    } catch {
      setBalance(null);
    }
  }, []);

  // 请求签名
  const requestSignature = useCallback(async (addr) => {
    setConnectStep('signing');
    const message = buildSignMessage(addr);
    try {
      const sig = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, addr],
      });
      setSignature(sig);
      localStorage.setItem('wallet_signature', sig);
      localStorage.setItem('wallet_signed_at', Date.now().toString());
      setConnectStep('done');
      return sig;
    } catch (e) {
      if (e.code === 4001) {
        setError('您拒绝了签名请求');
      } else {
        setError('签名失败: ' + (e.message || '未知错误'));
      }
      setConnectStep('idle');
      setAccount(null);
      return null;
    }
  }, []);

  // 连接 MetaMask（完整流程：连接 → 签名）
  const connect = useCallback(async () => {
    setError(null);
    if (!window.ethereum) {
      setError('请先安装 MetaMask 插件');
      return;
    }

    setIsConnecting(true);
    setConnectStep('connecting');

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const addr = accounts[0];
      setAccount(addr);
      localStorage.setItem('wallet_account', addr);

      const chain = await window.ethereum.request({ method: 'eth_chainId' });
      setChainId(parseInt(chain, 16));

      await fetchBalance(addr);

      // 连接成功后立即请求签名
      await requestSignature(addr);
    } catch (e) {
      if (e.code === 4001) {
        setError('您拒绝了连接请求');
      } else {
        setError('连接失败: ' + (e.message || ''));
      }
      setConnectStep('idle');
    } finally {
      setIsConnecting(false);
    }
  }, [fetchBalance, requestSignature]);

  // 断开连接（彻底清除所有状态）
  const disconnect = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setBalance(null);
    setSignature(null);
    setConnectStep('idle');
    setError(null);
    localStorage.removeItem('wallet_account');
    localStorage.removeItem('wallet_signature');
    localStorage.removeItem('wallet_signed_at');
    localStorage.removeItem('wallet_connected');
  }, []);

  // 切换链
  const switchChain = useCallback(async (targetChainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch {
      setError('切换网络失败');
    }
  }, []);

  // 监听 MetaMask 事件
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // 用户在 MetaMask 中断开了连接 → 彻底清除
        disconnect();
      } else {
        const newAddr = accounts[0];
        // 如果账户变了，需要重新签名
        if (newAddr.toLowerCase() !== account?.toLowerCase()) {
          setAccount(newAddr);
          localStorage.setItem('wallet_account', newAddr);
          fetchBalance(newAddr);
          // 清除旧签名，要求重新签名
          setSignature(null);
          localStorage.removeItem('wallet_signature');
          requestSignature(newAddr);
        }
      }
    };

    const handleChainChanged = (chain) => {
      setChainId(parseInt(chain, 16));
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [account, disconnect, fetchBalance, requestSignature]);

  return {
    account,
    shortAddress,
    chainId,
    balance,
    signature,
    shortSignature,
    isConnecting,
    connectStep,
    error,
    connect,
    disconnect,
    switchChain,
    hasMetaMask: typeof window !== 'undefined' && !!window.ethereum,
  };
}
