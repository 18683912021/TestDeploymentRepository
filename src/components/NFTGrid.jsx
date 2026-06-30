import { useState, useMemo } from 'react';
import NFTCard from './NFTCard';

const nfts = [
  {
    id: 1, title: 'Cyber Ape #8842', image: '🦍', creator: 'BoredLabs',
    creatorAvatar: '🧑‍🎨', price: '2.45', timeLeft: '⏱ 2h 15m', rarity: 'legendary',
    category: 'collectibles',
    desc: '一只来自赛博朋克世界的变异猿猴，拥有稀有的激光眼和金色毛发。Cyber Ape 系列中最具代表性的作品之一。',
    owner: '0x8f3a...9d2b', tokenId: '#8842',
  },
  {
    id: 2, title: 'Pixel Penguin #120', image: '🐧', creator: 'CoolPixels',
    creatorAvatar: '👩‍🎨', price: '0.89', timeLeft: '⏱ 5h 42m', rarity: 'epic',
    category: 'collectibles',
    desc: '像素企鹅军团的一员，戴着标志性的太阳镜和围巾。该系列以可爱像素风格风靡 NFT 社区。',
    owner: '0x7b2c...1e4f', tokenId: '#120',
  },
  {
    id: 3, title: 'Cosmic Cat #0056', image: '🐱', creator: 'StarNFT',
    creatorAvatar: '👨‍🎨', price: '1.56', timeLeft: '⏱ 1h 30m', rarity: 'rare',
    category: 'art',
    desc: '来自银河系深处的宇宙猫，身体由星尘构成，眼睛闪烁着恒星的光芒。',
    owner: '0x3d1a...7c8e', tokenId: '#0056',
  },
  {
    id: 4, title: 'Dragon Lord #019', image: '🐲', creator: 'MythicDAO',
    creatorAvatar: '🧙‍♂️', price: '4.20', timeLeft: '⏱ 22h 10m', rarity: 'legendary',
    category: 'gaming',
    desc: '远古龙族的领主，拥有掌控火焰与风暴的能力。Dragon Lord 系列仅发行 100 枚。',
    owner: '0x5e9f...2a3c', tokenId: '#019',
  },
  {
    id: 5, title: 'Robo Punk #331', image: '🤖', creator: 'NeoTokyo',
    creatorAvatar: '👾', price: '1.12', timeLeft: '⏱ 3h 55m', rarity: 'rare',
    category: 'gaming',
    desc: '新东京的机械战士，全身由未来合金打造。Robo Punk 是 NeoTokyo 元宇宙的原生居民。',
    owner: '0x2b8d...6f1a', tokenId: '#331',
  },
  {
    id: 6, title: 'Spirit Fox #007', image: '🦊', creator: 'NineTails',
    creatorAvatar: '🦊', price: '3.75', timeLeft: '⏱ 8h 20m', rarity: 'epic',
    category: 'art',
    desc: '九尾灵狐的化身，拥有千年的智慧与魔力。Spirit Fox 系列融合东方神话与数字艺术。',
    owner: '0x9c4e...3b7d', tokenId: '#007',
  },
  {
    id: 7, title: 'Void Walker #555', image: '🌑', creator: 'AbyssArt',
    creatorAvatar: '🌌', price: '5.00', timeLeft: '⏱ 12h 45m', rarity: 'legendary',
    category: 'music',
    desc: '穿梭于虚空之间的行者，没有人知道它的真实面目。Void Walker 是最神秘的数字藏品之一。',
    owner: '0x1f6b...8d2e', tokenId: '#555',
  },
  {
    id: 8, title: 'Blossom Deer #088', image: '🦌', creator: 'SakuraDAO',
    creatorAvatar: '🌸', price: '0.65', timeLeft: '⏱ 1h 10m', rarity: 'common',
    category: 'music',
    desc: '樱花之鹿，每到春天角上便会绽放绚烂的花朵。Blossom Deer 系列象征新生与希望。',
    owner: '0x4a7c...9e1b', tokenId: '#088',
  },
];

const FILTERS = [
  { key: 'all', label: '全部', icon: '🎨' },
  { key: 'art', label: '艺术', icon: '🎭' },
  { key: 'collectibles', label: '收藏品', icon: '💎' },
  { key: 'gaming', label: '游戏', icon: '🎮' },
  { key: 'music', label: '音乐', icon: '🎵' },
];

const SORTS = [
  { key: 'default', label: '默认排序' },
  { key: 'price-asc', label: '价格低 → 高' },
  { key: 'price-desc', label: '价格高 → 低' },
  { key: 'rarity', label: '稀有度优先' },
];

export default function NFTGrid({ onSelect, wallet }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');
  const [liked, setLiked] = useState(new Set());

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = activeFilter === 'all'
      ? nfts
      : nfts.filter((n) => n.category === activeFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((n) =>
        n.title.toLowerCase().includes(q) ||
        n.creator.toLowerCase().includes(q)
      );
    }

    const rarityRank = { legendary: 4, epic: 3, rare: 2, common: 1 };
    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break;
      case 'price-desc': list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break;
      case 'rarity':     list.sort((a, b) => rarityRank[b.rarity] - rarityRank[a.rarity]); break;
      default: break;
    }
    return list;
  }, [activeFilter, sortBy, search]);

  return (
    <section className="nft-grid-section" id="collection">
      <div className="section-header">
        <h2 className="section-title">🔥 热门藏品</h2>
        <p className="section-desc">探索精选的 NFT 数字藏品，找到属于你的那一件</p>
      </div>

      {/* 搜索 + 排序 */}
      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="搜索藏品或创作者..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <div className="sort-select-wrapper">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 筛选按钮 */}
      <div className="filter-bar">
        {FILTERS.map((f) => {
          const count = f.key === 'all' ? nfts.length : nfts.filter((n) => n.category === f.key).length;
          return (
            <button
              key={f.key}
              className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* 结果 */}
      {filtered.length > 0 ? (
        <div className="nft-grid">
          {filtered.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              isLiked={liked.has(nft.id)}
              onToggleLike={() => toggleLike(nft.id)}
              wallet={wallet}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>没有找到匹配的藏品</h3>
          <p>试试其他关键词或筛选项</p>
          <button className="btn-explore" onClick={() => { setActiveFilter('all'); setSearch(''); }}>
            查看全部藏品
          </button>
        </div>
      )}
    </section>
  );
}
