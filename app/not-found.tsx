import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Token Not Found</h2>
      <p className="mt-2 text-muted-foreground">
        The token you&apos;re looking for does not exist or could not be found.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
