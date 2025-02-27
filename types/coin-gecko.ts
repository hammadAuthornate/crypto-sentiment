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

export interface CoinGeckoChartData {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
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

export interface CoinGeckoCoinData {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string;
  platforms: {
    [chain: string]: string;
  };
  detail_platforms: {
    [chain: string]: {
      decimal_place: number;
      contract_address: string;
    };
  };
  block_time_in_minutes: number;
  hashing_algorithm: null;
  categories: string[];
  preview_listing: boolean;
  public_notice: string;
  additional_notices: string[];
  localization: {
    en: string;
    [k: string]: string;
  };
  description: {
    en: string;
    [k: string]: string;
  };
  links: {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: [];
    announcement_url: [];
    snapshot_url: null;
    twitter_screen_name: string;
    facebook_username: null;
    bitcointalk_thread_identifier: null;
    telegram_channel_identifier: string;
    subreddit_url: null;
    repos_url: {
      github: [];
      bitbucket: [];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: null;
  genesis_date: null;
  contract_address: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: null;
  market_data: {
    current_price: {
      [currency: string]: number;
    };
    total_value_locked: null;
    mcap_to_tvl_ratio: null;
    fdv_to_tvl_ratio: null;
    roi: null;
    ath: {
      usd: number;
      [currency: string]: number;
    };
    ath_change_percentage: {
      usd: number;
      [currency: string]: number;
    };
    ath_date: {
      usd: string;
      [currency: string]: string;
    };
    atl: {
      usd: number;
      [currency: string]: number;
    };
    atl_change_percentage: {
      usd: number;
      [currency: string]: number;
    };
    atl_date: {
      usd: string;
      [currency: string]: string;
    };
    market_cap: {
      usd: number;
      [currency: string]: number;
    };
    market_cap_rank: null;
    fully_diluted_valuation: {
      usd: number;
      [currency: string]: number;
    };
    market_cap_fdv_ratio: null;
    total_volume: {
      usd: number;
      [currency: string]: number;
    };
    high_24h: {
      usd: number;
      [currency: string]: number;
    };
    low_24h: {
      usd: number;
      [currency: string]: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: {
      usd: number;
      [currency: string]: number;
    };
    price_change_percentage_1h_in_currency: {
      usd: number;
      [currency: string]: number;
    };
    price_change_percentage_24h_in_currency: {
      usd: number;
      [currency: string]: number;
    };
    price_change_percentage_7d_in_currency: {
      usd: number;
      [currency: string]: number;
    };
    price_change_percentage_14d_in_currency: {
      usd: number;
      [currency: string]: number;
    };
    price_change_percentage_30d_in_currency: {};
    price_change_percentage_60d_in_currency: {};
    price_change_percentage_200d_in_currency: {};
    price_change_percentage_1y_in_currency: {};
    market_cap_change_24h_in_currency: {
      usd: number;
      [currency: string]: number;
    };
    market_cap_change_percentage_24h_in_currency: {
      usd: number;
      [currency: string]: number;
    };
    total_supply: number;
    max_supply: number;
    max_supply_infinite: boolean;
    circulating_supply: number;
    last_updated: string;
  };
  community_data: {
    facebook_likes: number | null;
    twitter_followers: number | null;
    reddit_average_posts_48h: number | null;
    reddit_average_comments_48h: number | null;
    reddit_subscribers: number | null;
    reddit_accounts_active_48h: number | null;
    telegram_channel_user_count: number | null;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: {
      additions: null;
      deletions: null;
    };
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: [];
  };
  status_updates: [];
  last_updated: string;
  tickers: [
    {
      base: string;
      target: string;
      market: {
        name: string;
        identifier: string;
        has_trading_incentive: boolean;
      };
      last: number;
      volume: number;
      converted_last: {
        btc: number;
        eth: number;
        usd: number;
      };
      converted_volume: {
        btc: number;
        eth: number;
        usd: number;
      };
      trust_score: string;
      bid_ask_spread_percentage: number;
      timestamp: string;
      last_traded_at: string;
      last_fetch_at: string;
      is_anomaly: boolean;
      is_stale: boolean;
      trade_url: string;
      token_info_url: null;
      coin_id: string;
      target_coin_id: string;
    },
    {
      base: string;
      target: string;
      market: {
        name: string;
        identifier: string;
        has_trading_incentive: boolean;
      };
      last: number;
      volume: number;
      converted_last: {
        btc: number;
        eth: number;
        usd: number;
      };
      converted_volume: {
        btc: number;
        eth: number;
        usd: number;
      };
      trust_score: null;
      bid_ask_spread_percentage: number;
      timestamp: string;
      last_traded_at: string;
      last_fetch_at: string;
      is_anomaly: true;
      is_stale: false;
      trade_url: string;
      token_info_url: null;
      coin_id: string;
      target_coin_id: string;
    }
  ];
}
