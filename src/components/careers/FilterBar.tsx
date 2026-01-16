'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  location: string;
  department: string;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const t = useTranslations();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: 'all',
    department: 'all',
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      location: 'all',
      department: 'all',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.location !== 'all' ||
    filters.department !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={
              t.has('careers.search')
                ? t('careers.search')
                : 'Tìm kiếm vị trí...'
            }
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Location Filter */}
        <Select
          value={filters.location}
          onValueChange={(value) => handleFilterChange('location', value)}
        >
          <SelectTrigger className="lg:w-[200px]">
            <MapPin className="size-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả địa điểm</SelectItem>
            <SelectItem value="hanoi">Hà Nội</SelectItem>
            <SelectItem value="hochiminh">TP. Hồ Chí Minh</SelectItem>
            <SelectItem value="danang">Đà Nẵng</SelectItem>
            <SelectItem value="other">Khác</SelectItem>
          </SelectContent>
        </Select>

     

        {/* Clear Filter Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="lg:w-auto"
          >
            <Filter className="size-4 mr-2" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary">
              Tìm kiếm: {filters.search}
            </Badge>
          )}
          {filters.location !== 'all' && (
            <Badge variant="secondary">
              Địa điểm: {filters.location}
            </Badge>
          )}
          {filters.department !== 'all' && (
            <Badge variant="secondary">
              Phòng ban: {filters.department}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
