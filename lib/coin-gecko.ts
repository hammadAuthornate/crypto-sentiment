import { CoinGeckoResponse, CoinGeckoCoinData } from "@/types/coin-gecko";

export class CoinGecko {
  static async searchToken(address: string) {
    'use cache';
    const response = await fetch(
      `https://www.coingecko.com/en/search_v2?query=${address}`,
      { cache: "force-cache" }
    );
    if (response.status === 200) {
      console.log("fetched details for address ", address);
      const data = await response.json();
      return data as CoinGeckoResponse;
    } else {
      console.log("error fetching details from coin gecko ", response);
      //   throw Error("Unable to Fetch a response for the selected address");
    }
  }

  static async getTokenDataByCoinId(coinId: string) {
    'use cache';
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      {
        cache: "force-cache",
        headers: {
          "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY!,
        },
      }
    );
    if (response.status === 200) {
      console.log("fetched data for coin id ", coinId);
      const data = await response.json();
      return data as CoinGeckoCoinData;
    } else {
      console.log("error fetching details from coin gecko ", response);
      //   throw Error("Unable to Fetch a response for the selected address");
    }
  }
}
