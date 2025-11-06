import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, Trophy, Clock } from 'lucide-react';

export type Category = 'popular' | 'top_rated' | 'upcoming';

interface CategoryTabsProps {
  value: Category;
  onChange: (value: Category) => void;
}

export const CategoryTabs = ({ value, onChange }: CategoryTabsProps) => {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Category)}>
      <TabsList className="w-full justify-start bg-muted/30 border border-border p-1 h-14">
        <TabsTrigger 
          value="popular" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 font-semibold uppercase tracking-wide text-sm px-6"
        >
          <TrendingUp className="w-4 h-4" />
          Popular
        </TabsTrigger>
        <TabsTrigger 
          value="top_rated" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 font-semibold uppercase tracking-wide text-sm px-6"
        >
          <Trophy className="w-4 h-4" />
          Top Rated
        </TabsTrigger>
        <TabsTrigger 
          value="upcoming" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 font-semibold uppercase tracking-wide text-sm px-6"
        >
          <Clock className="w-4 h-4" />
          Upcoming
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
