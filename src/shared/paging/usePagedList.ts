import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export interface Page<T, M = undefined> {
  items: T[];
  total: number;
  nextPage?: number;
  meta?: M;
}

export interface PagedResult<T, M = undefined> {
  items: T[];
  total: number;
  meta?: M;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  refetch: () => void;
}

export const useDebounced = <V>(value: V, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

export function usePagedList<T, F, M = undefined>(key: string, filters: F, fetchPage: (page: number, filters: F) => Promise<Page<T, M>>): PagedResult<T, M> {
  const query = useInfiniteQuery({
    queryKey: ['paged', key, filters],
    queryFn: ({ pageParam }) => fetchPage(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (last) => last.nextPage,
    placeholderData: keepPreviousData,
  });

  const items = useMemo(() => query.data?.pages.flatMap((page) => page.items) ?? [], [query.data]);

  return {
    items,
    total: query.data?.pages[0]?.total ?? 0,
    meta: query.data?.pages[0]?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isRefetching: query.isRefetching && !query.isFetchingNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: !!query.hasNextPage,
    isError: query.isError,
    fetchNextPage: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
    },
    refetch: () => query.refetch(),
  };
}
