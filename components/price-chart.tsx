"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CoinGeckoChartData } from "@/types/coin-gecko";

interface PriceChartProps {
  data: CoinGeckoChartData;
}

export function PriceChart({ data }: PriceChartProps) {
  // Transform the data for the chart
  const chartData = useMemo(() => {
    return data.prices.map((price, index) => ({
      date: price[0],
      price: price[1],
      volume: data.total_volumes[index][1],
    }));
  }, [data]);

  // Calculate min and max values for better visualization
  const minPrice = Math.min(...data.prices.map((p) => p[1]));
  const maxPrice = Math.max(...data.prices.map((p) => p[1]));
  const maxVolume = Math.max(...data.total_volumes.map((v) => v[1]));

  // Format large numbers
  const formatValue = (value: number) => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(2)}K`;
    }
    return value.toFixed(6);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 shadow-lg">
          <p className="text-zinc-300 mb-1">
            {format(new Date(label), "MMM d, yyyy HH:mm")}
          </p>
          <p className="text-blue-400 font-medium">
            Price: ${formatValue(payload[1].value)}
          </p>
          <p className="text-zinc-400">
            Volume: {formatValue(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full bg-white text-zinc-900 my-8">
      <CardHeader>
        <CardTitle>Price History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tickFormatter={(timestamp) =>
                  format(new Date(timestamp), "MMM d")
                }
                stroke="#71717a"
                tick={{ fill: "#71717a" }}
              />
              <YAxis
                yAxisId="price"
                domain={[minPrice * 0.95, maxPrice * 1.05]}
                tickFormatter={(value) => `${formatValue(value)?.toLocaleLowerCase()}`}
                stroke="#71717a"
                tick={{ fill: "#71717a", fontSize: '8px' }}
              />
              <YAxis
                yAxisId="volume"
                orientation="right"
                domain={[0, maxVolume * 1.1]}
                tickFormatter={(value) => `${value?.toLocaleString()}`}
                stroke="#71717a"
                tick={{ fill: "#71717a", fontSize: '8px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="volume"
                yAxisId="volume"
                fill="rgba(59, 130, 246, 0.2)"
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="price"
                yAxisId="price"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
