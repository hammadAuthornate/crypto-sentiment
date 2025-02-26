"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CoinGeckoCoinData } from "@/types/coin-gecko";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ExternalLink, Twitter, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface TokenInfoProps {
  token: CoinGeckoCoinData;
}

export function CoinInfo({ token }: TokenInfoProps) {
  // Prepare price change data for chart
  const priceChangeData = [
    {
      period: "1h",
      value: token.market_data.price_change_percentage_1h_in_currency?.usd || 0,
    },
    {
      period: "24h",
      value: token.market_data.price_change_percentage_24h || 0,
    },
    { period: "7d", value: token.market_data.price_change_percentage_7d || 0 },
    {
      period: "14d",
      value: token.market_data.price_change_percentage_14d || 0,
    },
    {
      period: "30d",
      value: token.market_data.price_change_percentage_30d || 0,
    },
  ].filter((item) => item.value !== 0);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader className="flex flex-col items-start justify-between">
          <div className="flex flex-row items-center w-full justify-between">
            <div className="flex items-center gap-4">
              <img
                src={token.image.small || "/placeholder.svg"}
                alt={token.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{token.name}</CardTitle>
                  <Badge variant="outline">{token.symbol.toUpperCase()}</Badge>
                  {token.market_data.market_cap_rank && (
                    <Badge variant="secondary">
                      Rank #{token.market_data.market_cap_rank}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {token.links.homepage[0] && (
                    <Link
                      href={token.links.homepage[0]}
                      target="_blank"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Website
                    </Link>
                  )}
                  {token.links.twitter_screen_name && (
                    <Link
                      href={`https://twitter.com/${token.links.twitter_screen_name}`}
                      target="_blank"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Link>
                  )}
                  {token.links.telegram_channel_identifier && (
                    <Link
                      href={`https://t.me/${token.links.telegram_channel_identifier}`}
                      target="_blank"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Telegram
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                $
                {token.market_data.current_price.usd.toString()}
              </div>
              <div
                className={`text-sm font-medium ${
                  token.market_data.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {token.market_data.price_change_percentage_24h >= 0 ? "+" : ""}
                {token.market_data.price_change_percentage_24h.toFixed(2)}%
              </div>
            </div>
          </div>
          <div>
            <span className="font-light">Address</span> {token.contract_address}
          </div>
        </CardHeader>
      </Card>

      {/* Market Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>Key market statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Market Cap
                </span>
                <span className="font-medium">
                  ${token.market_data.market_cap.usd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  24h Volume
                </span>
                <span className="font-medium">
                  ${token.market_data.total_volume.usd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Circulating Supply
                </span>
                <span className="font-medium">
                  {token.market_data.circulating_supply.toLocaleString()}{" "}
                  {token.symbol.toUpperCase()}
                </span>
              </div>
              {token.market_data.max_supply && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Max Supply
                  </span>
                  <span className="font-medium">
                    {token.market_data.max_supply.toLocaleString()}{" "}
                    {token.symbol.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Statistics</CardTitle>
            <CardDescription>Historical price data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  All Time High
                </span>
                <div className="text-right">
                  <div className="font-medium">
                    ${token.market_data.ath.usd.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs ${
                      token.market_data.ath_change_percentage.usd >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {token.market_data.ath_change_percentage.usd.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  All Time Low
                </span>
                <div className="text-right">
                  <div className="font-medium">
                    ${token.market_data.atl.usd.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs ${
                      token.market_data.atl_change_percentage.usd >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {token.market_data.atl_change_percentage.usd.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">24h High</span>
                <span className="font-medium">
                  ${token.market_data.high_24h.usd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">24h Low</span>
                <span className="font-medium">
                  ${token.market_data.low_24h.usd.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            {/* <CardDescription>Historical price data</CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Votes Up</span>
                <div className="text-right">
                  <div className="font-medium text-green-600">
                    {token.sentiment_votes_up_percentage.toLocaleString()}%
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Votes Down
                </span>
                <div className="text-right">
                  <div className="font-medium text-red-600">
                    {token.sentiment_votes_down_percentage.toLocaleString()}%
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Watch-List Users
                </span>
                <span className="font-medium">
                  {token.watchlist_portfolio_users.toLocaleString()}
                </span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">24h Low</span>
                <span className="font-medium">
                  ${token.market_data.low_24h.usd.toLocaleString()}
                </span>
              </div> */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
            {/* <CardDescription>Historical price data</CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  <Link
                    href={token.links.whitepaper}
                    target="_blank"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Whitepaper
                  </Link>
                </span>
              </div>
              <div className="flex flex-col gap-4 justify-start">
                <span className="text-sm text-muted-foreground">
                  Blockchain Explorer
                </span>
                <div className="flex flex-row gap-4">
                  {token.links.blockchain_site.map((l) => (
                    <Link href={l} key={l}>
                      <img
                        className="size-8"
                        src={"/" + l.split(".")?.at(0)?.slice(8) + ".svg"}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex flex-col gap-4 justify-start">
                <span className="text-sm text-muted-foreground">Forums</span>
                <div className="font-light text-sm flex flex-col gap-2">
                  {token.links?.official_forum_url?.map((l) => (
                    <Link href={l} key={l}>
                      <ExternalLink className="w-4 h-4 inline" /> {l}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card >
          <CardHeader>
            <CardTitle>Price Change History</CardTitle>
            <CardDescription>
              Price changes across different timeframes
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                price: {
                  label: "Price Change %",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={priceChangeData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickFormatter={(value) => `${value.toFixed(2)}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg shadow-lg p-3">
                            <p className="font-medium">
                              {payload[0].payload.period}
                            </p>
                            <p
                              className={
                                (payload[0].value as any) >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {(payload[0].value as any).toFixed(2)}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-price)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-price)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="markets">Markets</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="pt-4 space-y-4">
              <div className="prose max-w-none">
                <p>{token.description.en}</p>
              </div>
              {token.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {token.categories.map((category, i) => (
                    <Badge key={i} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="social" className="pt-4">
              <div className="grid gap-4">
                {token.community_data.twitter_followers !== null && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Twitter Followers
                    </span>
                    <span className="font-medium">
                      {token.community_data.twitter_followers.toLocaleString()}
                    </span>
                  </div>
                )}
                {token.community_data.telegram_channel_user_count !== null && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Telegram Members
                    </span>
                    <span className="font-medium">
                      {token.community_data.telegram_channel_user_count.toLocaleString()}
                    </span>
                  </div>
                )}
                {token.developer_data.stars !== null && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      GitHub Stars
                    </span>
                    <span className="font-medium">
                      {token.developer_data.stars.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="markets" className="pt-4">
              <div className="space-y-4">
                {token.tickers.slice(0, 5).map((ticker) => (
                  <div
                    key={`${ticker.market.identifier}-${ticker.target}`}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{ticker.market.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {ticker.base}/{ticker.target}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${ticker.converted_last.usd.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Vol: ${ticker.converted_volume.usd.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
