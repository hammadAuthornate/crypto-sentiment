"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CoinGeckoCoinResponse } from "@/types/CoinGecko";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface TokenInfoProps {
  token: CoinGeckoCoinResponse;
}

export function TokenInfo({ token }: TokenInfoProps) {
  // Transform price_change_percentage_24h object into chart data
  const chartData = Object.entries(
    token.data.price_change_percentage_24h || {}
  ).map(([time, value]) => ({
    time,
    value,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            {token.thumb && (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={token.thumb || "/placeholder.svg"}
                  alt={token.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <CardTitle className="flex items-center gap-2">
                {token.name}
                {token.symbol && (
                  <Badge variant="outline">{token.symbol.toUpperCase()}</Badge>
                )}
              </CardTitle>
              <CardDescription>{token.id}</CardDescription>
            </div>
          </div>
          {token.market_cap_rank && (
            <Badge variant="secondary">Rank #{token.market_cap_rank}</Badge>
          )}
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Information</CardTitle>
          <CardDescription>Current market data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Price (USD)
            </p>
            <p className="text-2xl font-bold">
              {token.data.price.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Price (BTC)
            </p>
            <p>{Number.parseFloat(token.data.price_btc).toFixed(8)} BTC</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Market Cap
            </p>
            <p>${Number.parseFloat(token.data.market_cap).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              24h Volume
            </p>
            <p>
              ${Number.parseFloat(token.data.total_volume).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Price Change (24h)</CardTitle>
          <CardDescription>
            Price changes over the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {chartData.length > 0 ? (
            <ChartContainer
              config={{
                price: {
                  label: "Price Change",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(_, index) => (24 - index).toString()}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickFormatter={(value, index) => `${value.toFixed(2)}%`}
                    // tickFormatter={(_, index) => index?.toString()}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-md shadow-md p-2 text-sm">
                            <p className="font-medium">
                              {payload[0].payload.time}
                            </p>
                            <p
                              className={
                                (payload?.at(0)?.value as number) >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {(payload?.at(0)?.value as number)?.toFixed(2)}%
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
                    stroke="#32a852"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                No price change data available
              </p>
            </div>
          )}
        </CardContent>
      </Card> */}

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Token details and links</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Token ID
            </p>
            <p>{token.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Coin ID</p>
            <p>{token.coin_id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Slug</p>
            <p>{token.slug}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
