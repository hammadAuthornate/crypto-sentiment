import { notFound } from "next/navigation";
import { TokenInfo } from "@/components/token-info";
import { getTokenData } from "@/lib/token-service";
import { Home } from "lucide-react";
import Link from "next/link";
import { CoinGecko } from "@/lib/coin-gecko";
import { CoinInfo } from "@/components/coin-info";
import { COIN_DATA } from "@/const/coin-data";
import { CoinGeckoCoinData } from "@/types/coin-gecko";
import { TOKEN_SEARCH } from "@/const/token-search";

interface TokenPageProps {
  params: {
    address: string;
  };
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { address } = await params;

  try {
    // const tokenData = await getTokenData(address);
    const tokenData = await CoinGecko.searchToken(address);
    // const tokenData = TOKEN_SEARCH;

    if (tokenData?.coins?.length === 0) {
      notFound();
    }

    const coinDetails = await CoinGecko.getTokenDataByCoinId(
      tokenData?.coins?.at(0)?.id!
    );
    // const coinDetails = COIN_DATA as unknown as CoinGeckoCoinData;

    return (
      <div className="container mx-auto py-8 px-4">
        <Link href="/">
          <Home className="mb-4" />
        </Link>
        <h1 className="text-3xl font-bold mb-8">Token Information</h1>
        {/* {tokenData?.coins?.map((token, key) => (
          <TokenInfo key={key} token={token} />
        ))} */}
        {coinDetails && <CoinInfo token={coinDetails} />}
      </div>
    );
  } catch (error) {
    console.error("Error fetching token data:", error);
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Error</h1>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">
            Failed to fetch token data. Please check the token address and try
            again.
          </p>
        </div>
      </div>
    );
  }
}
