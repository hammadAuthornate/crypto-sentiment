export interface CoinGeckoResponse {
  coins: CoinGeckoCoinResponse[];
  nftContracts: [];
  markets: [];
  categories: [];
  posts: [];
  assetPlatforms: [];
  moreResults: {
    coin: boolean;
    nft_contract: boolean;
    market: boolean;
    category: boolean;
    post: boolean;
    asset_platform: boolean;
  };
}

export interface CoinGeckoCoinResponse {
  thumb: string;
  name: string;
  slug: string;
  symbol: string;
  market_cap_rank: null;
  id: string;
  coin_id: number;
  data: {
    price: string;
    price_btc: string;
    price_change_percentage_24h: {
      [k: string]: number;
    };
    market_cap: string;
    market_cap_btc: string;
    total_volume: string;
    total_volume_btc: string;
    sparkline: string;
    content: null;
  };
}
