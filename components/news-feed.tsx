import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { NewsItem } from "@/types/crypto-panic";
import { formatDistanceToNow } from "date-fns";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { CryptoPanic } from "@/lib/crypto-panic";
import { NEWS_DATA } from "@/const/news-data";

interface NewsFeedProps {
  news: NewsItem[];
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export async function NewsFeed() {
    
//   const response = NEWS_DATA;
  const response = await CryptoPanic.getNews();
  const news = response?.results;
  const hasMore = !!response?.next;
  const filteredNews = news;
//   const [filter, setFilter] = useState<"all" | "news" | "media">("all");

//   const filteredNews = news?.filter((item) => {
//     if (filter === "all") return true;
//     return item.kind === filter;
//   });

  
  return (
    <Card className="w-full h-full bg-zinc-100 text-zinc-800">
      <CardHeader className="border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Latest News</CardTitle>
          {/* <Tabs defaultValue="all" className="w-fit">
            <TabsList className="bg-zinc-400">
              <TabsTrigger value="all" onClick={() => setFilter("all")} className="data-[state=active]:bg-zinc-200">
                All
              </TabsTrigger>
              <TabsTrigger value="news" onClick={() => setFilter("news")} className="data-[state=active]:bg-zinc-200">
                News
              </TabsTrigger>
              <TabsTrigger value="media" onClick={() => setFilter("media")} className="data-[state=active]:bg-zinc-200">
                Media
              </TabsTrigger>
            </TabsList>
          </Tabs> */}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[600px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNews?.map((item, index) => (
              <Card key={index} className="bg-zinc-200/50 border-zinc-300 hover:border-zinc-600 transition-colors">
                <CardHeader className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-800">
                    <span>{formatDistanceToNow(new Date(item.published_at))} ago</span>
                    <span>•</span>
                    <span>{item.source.title}</span>
                  </div>
                  <Link
                    href={item.url}
                    target="_blank"
                    className="text-base font-medium hover:text-blue-400 flex items-start gap-2 group"
                  >
                    <span className="flex-1">{item.title}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                  </Link>
                </CardHeader>
                <CardContent>
                  {item.currencies && item.currencies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.currencies.map((currency, index) => (
                        <Badge key={index} variant="secondary" className="bg-zinc-700 text-zinc-100">
                          {currency.code}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-zinc-700 pt-4">
                  <div className="flex items-center gap-2 w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-green-400 hover:bg-zinc-700 flex-1"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {item.votes.positive}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-red-400 hover:bg-zinc-700 flex-1"
                    >
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      {item.votes.negative}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-blue-400 hover:bg-zinc-700 flex-1"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {item.votes.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-yellow-400 hover:bg-zinc-700">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          {hasMore && (
            <div className="pt-6 flex justify-center">
              <Button
                variant="outline"
                className="bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700"
              >
                Load More
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

