import { NewsResponse } from "@/types/crypto-panic";

export class CryptoPanic {
  static async getNews() {
    "use cache";
    const API_KEY = process.env.CRYPTO_PANIC_API_KEY;
    if (!API_KEY) {
      throw Error("API_KEY for crypto panic missing ");
    }
    const response = await fetch(
      `https://cryptopanic.com/api/free/v1/posts/?auth_token=${API_KEY}&public=true`,
      { cache: "force-cache" }
    );
    if (response.status === 200) {
      console.log("fetched news");
      const data = await response.json();
      return data as NewsResponse;
    } else {
      console.log("error fetching news ", response);
      //   throw Error("Unable to Fetch a response for the selected address");
    }
  }
}
