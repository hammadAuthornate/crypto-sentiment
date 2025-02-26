import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TokenData } from "@/types/types"

interface TokenInfoProps {
  token: TokenData
}

export function TokenInfo({ token }: TokenInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {token.name}
            {token.symbol && <Badge variant="outline">{token.symbol}</Badge>}
          </CardTitle>
          <CardDescription>Basic Information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p className="text-sm break-all">{token.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Decimals</p>
            <p>{token.decimals}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Supply</p>
            <p>{token.totalSupply}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Data</CardTitle>
          <CardDescription>Current market information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Price (USD)</p>
            <p>${token.priceUsd ? Number.parseFloat(token.priceUsd).toFixed(6) : "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Market Cap</p>
            <p>${token.marketCap ? Number.parseFloat(token.marketCap).toLocaleString() : "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">24h Volume</p>
            <p>${token.volume24h ? Number.parseFloat(token.volume24h).toLocaleString() : "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
          <CardDescription>Price changes over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">24h Change</p>
            <p
              className={
                token.priceChange24h && Number.parseFloat(token.priceChange24h) > 0 ? "text-green-600" : "text-red-600"
              }
            >
              {token.priceChange24h ? `${Number.parseFloat(token.priceChange24h).toFixed(2)}%` : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">7d Change</p>
            <p
              className={
                token.priceChange7d && Number.parseFloat(token.priceChange7d) > 0 ? "text-green-600" : "text-red-600"
              }
            >
              {token.priceChange7d ? `${Number.parseFloat(token.priceChange7d).toFixed(2)}%` : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">All-time High</p>
            <p>${token.ath ? Number.parseFloat(token.ath).toFixed(6) : "N/A"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

