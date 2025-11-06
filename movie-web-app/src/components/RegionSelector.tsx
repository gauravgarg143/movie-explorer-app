import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Globe } from 'lucide-react';

export type Region = 'all' | 'hollywood' | 'bollywood';

interface RegionSelectorProps {
  value: Region;
  onChange: (value: Region) => void;
}

export const RegionSelector = ({ value, onChange }: RegionSelectorProps) => {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Region)}>
      <TabsList className="bg-muted/30 border border-border p-1 h-12">
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 font-semibold uppercase tracking-wide text-sm px-6"
        >
          <Globe className="w-4 h-4" />
          All Movies
        </TabsTrigger>
        <TabsTrigger 
          value="hollywood" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 font-semibold uppercase tracking-wide text-sm px-6"
        >
          Hollywood
        </TabsTrigger>
        <TabsTrigger 
          value="bollywood" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 font-semibold uppercase tracking-wide text-sm px-6"
        >
          Bollywood
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
