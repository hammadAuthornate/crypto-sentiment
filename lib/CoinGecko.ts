import { CoinGeckoResponse } from "@/types/CoinGecko";

export class CoinGecko {
  static async searchToken(address: string) {
    const response = await fetch(
      `https://www.coingecko.com/en/search_v2?query=${address}`
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as CoinGeckoResponse;
    } else {
      console.log(response);
      throw Error("Unable to Fetch a response for the selected address");
    }
  }
}
