import { notFound } from "next/navigation";
import { TokenInfo } from "@/components/token-info";
import { getTokenData } from "@/lib/token-service";
import { Home } from "lucide-react";
import Link from "next/link";

interface TokenPageProps {
  params: {
    address: string;
  };
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { address } = await params;

  try {
    const tokenData = await getTokenData(address);

    if (!tokenData) {
      notFound();
    }

    return (
      <div className="container mx-auto py-8 px-4">
        <Link href="/">
          <Home />
        </Link>
        <h1 className="text-3xl font-bold mb-8">Token Information</h1>
        <TokenInfo token={tokenData} />
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
