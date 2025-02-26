import type { TokenData } from "../types/types"

export async function getTokenData(address: string): Promise<TokenData | null> {
  // In a real application, you would fetch this data from a cryptocurrency API
  // For demonstration purposes, we'll return mock data based on the address

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // For demo purposes, we'll return different data based on the last character of the address
  const lastChar = address.slice(-1).toLowerCase()

  // If the address ends with 0-3, return Bitcoin-like data
  if (lastChar >= "0" && lastChar <= "3") {
    return {
      address,
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      totalSupply: "21,000,000",
      priceUsd: "42356.78",
      marketCap: "820456789123",
      volume24h: "24567891234",
      priceChange24h: "2.34",
      priceChange7d: "-1.23",
      ath: "69000.00",
      blockchain: "Bitcoin",
      launchDate: "2009-01-03",
      description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator.",
    }
  }

  // If the address ends with 4-7, return Ethereum-like data
  else if (lastChar >= "4" && lastChar <= "7") {
    return {
      address,
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      totalSupply: "120,456,789",
      priceUsd: "2345.67",
      marketCap: "280123456789",
      volume24h: "15678912345",
      priceChange24h: "-0.87",
      priceChange7d: "5.43",
      ath: "4878.26",
      blockchain: "Ethereum",
      launchDate: "2015-07-30",
      description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality.",
    }
  }

  // If the address ends with 8-9 or a-f, return a custom token
  else {
    return {
      address,
      name: "Custom Token",
      symbol: "CTKN",
      decimals: 18,
      totalSupply: "1,000,000,000",
      priceUsd: "0.123456",
      marketCap: "123456789",
      volume24h: "5678912",
      priceChange24h: "12.34",
      priceChange7d: "45.67",
      ath: "0.25",
      blockchain: "Ethereum",
      launchDate: "2022-01-01",
      description: "A custom token with unique features and use cases.",
    }
  }
}

