"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  const [tokenAddress, setTokenAddress] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tokenAddress.trim()) {
      router.push(`/token/${encodeURIComponent(tokenAddress)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full max-w-xl mx-auto items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter token address..."
            className="pl-10 pr-4 py-6 text-base"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg">
          Search
        </Button>
      </div>
    </form>
  )
}

