import { NewsFeed } from "@/components/news-feed";
import { SearchForm } from "@/components/search-form";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Crypto Token Search
        </h1>
        <p className="text-muted-foreground">
          Enter a cryptocurrency token address to see detailed information
        </p>
        <SearchForm />
      </div>
      <div className="my-4">
        <NewsFeed />
      </div>
    </div>
  );
}
