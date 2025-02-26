"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isAddress } from "ethers";

export function SearchForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorComponent = document.getElementById("error-address");
    if (!errorComponent?.classList.contains("hidden")) {
      errorComponent?.classList.add("hidden");
    }
    const tokenAddress = (e.target as any).address.value;
    if (isAddress(tokenAddress.trim()) && tokenAddress.trim()) {
      router.push(`/token/${encodeURIComponent(tokenAddress)}`);
    } else {
      errorComponent?.classList.remove("hidden");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex w-full max-w-xl mx-auto items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="address"
              type="text"
              placeholder="Enter token address..."
              className="pl-10 pr-4 py-6 text-base"
            />
          </div>
          <Button type="submit" size="lg">
            Search
          </Button>
        </div>
      </form>
      <div id="error-address" className="container mx-auto py-8 px-4 hidden">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">
            The value provided is not a valid address
          </p>
        </div>
      </div>
    </>
  );
}
