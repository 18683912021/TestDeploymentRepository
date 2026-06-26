import NFTCard from './NFTCard';

const nfts = [
  {
    id: 1,
    title: 'Cyber Ape #8842',
    image: '🦍',
    creator: 'BoredLabs',
    creatorAvatar: '🧑‍🎨',
    price: '2.45',
    timeLeft: '⏱ 2h 15m',
    rarity: 'legendary',
    desc: '一只来自赛博朋克世界的变异猿猴，拥有稀有的激光眼和金色毛发。Cyber Ape 系列中最具代表性的作品之一。',
    owner: '0x8f3a...9d2b',
    tokenId: '#8842',
  },
  {
    id: 2,
    title: 'Pixel Penguin #120',
    image: '🐧',
    creator: 'CoolPixels',
    creatorAvatar: '👩‍🎨',
    price: '0.89',
    timeLeft: '⏱ 5h 42m',
    rarity: 'epic',
    desc: '像素企鹅军团的一员，戴着标志性的太阳镜和围巾。该系列以可爱像素风格风靡 NFT 社区。',
    owner: '0x7b2c...1e4f',
    tokenId: '#120',
  },
  {
    id: 3,
    title: 'Cosmic Cat #0056',
    image: '🐱',
    creator: 'StarNFT',
    creatorAvatar: '👨‍🎨',
    price: '1.56',
    timeLeft: '⏱ 1h 30m',
    rarity: 'rare',
    desc: '来自银河系深处的宇宙猫，身体由星尘构成，眼睛闪烁着恒星的光芒。每个 Cosmic Cat 都是独一无二的。',
    owner: '0x3d1a...7c8e',
    tokenId: '#0056',
  },
  {
    id: 4,
    title: 'Dragon Lord #019',
    image: '🐲',
    creator: 'MythicDAO',
    creatorAvatar: '🧙‍♂️',
    price: '4.20',
    timeLeft: '⏱ 22h 10m',
    rarity: 'legendary',
    desc: '远古龙族的领主，拥有掌控火焰与风暴的能力。Dragon Lord 系列仅发行 100 枚，此为第 19 枚。',
    owner: '0x5e9f...2a3c',
    tokenId: '#019',
  },
  {
    id: 5,
    title: 'Robo Punk #331',
    image: '🤖',
    creator: 'NeoTokyo',
    creatorAvatar: '👾',
    price: '1.12',
    timeLeft: '⏱ 3h 55m',
    rarity: 'rare',
    desc: '新东京的机械战士，全身由未来合金打造。Robo Punk 是 NeoTokyo 元宇宙的原生居民。',
    owner: '0x2b8d...6f1a',
    tokenId: '#331',
  },
  {
    id: 6,
    title: 'Spirit Fox #007',
    image: '🦊',
    creator: 'NineTails',
    creatorAvatar: '🦊',
    price: '3.75',
    timeLeft: '⏱ 8h 20m',
    rarity: 'epic',
    desc: '九尾灵狐的化身，拥有千年的智慧与魔力。Spirit Fox 系列融合东方神话与数字艺术。',
    owner: '0x9c4e...3b7d',
    tokenId: '#007',
  },
  {
    id: 7,
    title: 'Void Walker #555',
    image: '🌑',
    creator: 'AbyssArt',
    creatorAvatar: '🌌',
    price: '5.00',
    timeLeft: '⏱ 12h 45m',
    rarity: 'legendary',
    desc: '穿梭于虚空之间的行者，没有人知道它的真实面目。Void Walker 是最神秘的数字藏品之一。',
    owner: '0x1f6b...8d2e',
    tokenId: '#555',
  },
  {
    id: 8,
    title: 'Blossom Deer #088',
    image: '🦌',
    creator: 'SakuraDAO',
    creatorAvatar: '🌸',
    price: '0.65',
    timeLeft: '⏱ 1h 10m',
    rarity: 'common',
    desc: '樱花之鹿，每到春天角上便会绽放绚烂的花朵。Blossom Deer 系列象征新生与希望。',
    owner: '0x4a7c...9e1b',
    tokenId: '#088',
  },
];

export default function NFTGrid({ onSelect }) {
  return (
    <section className="nft-grid-section" id="collection">
      <div className="section-header">
        <h2 className="section-title">🔥 热门藏品</h2>
        <p className="section-desc">探索精选的 NFT 数字藏品，找到属于你的那一件</p>
      </div>
      <div className="filter-bar">
        <button className="filter-btn active">全部</button>
        <button className="filter-btn">艺术</button>
        <button className="filter-btn">收藏品</button>
        <button className="filter-btn">游戏</button>
        <button className="filter-btn">音乐</button>
      </div>
      <div className="nft-grid">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
