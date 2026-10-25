import type { Page } from './usePagedList';

export const PAGE_SIZE = 25;
const LATENCY_MS = 450;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function createMockPagedSource<T, F, M = undefined>(getAll: () => T[], matches: (item: T, filters: F) => boolean, summarize?: (filtered: T[]) => M) {
  let lastSignature = '';
  let lastFiltered: T[] = [];
  let lastMeta: M | undefined;

  return async (page: number, filters: F): Promise<Page<T, M>> => {
    await wait(LATENCY_MS);
    const signature = JSON.stringify(filters);
    if (signature !== lastSignature) {
      lastFiltered = getAll().filter((item) => matches(item, filters));
      lastMeta = summarize ? summarize(lastFiltered) : undefined;
      lastSignature = signature;
    }
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return { items: lastFiltered.slice(start, end), total: lastFiltered.length, nextPage: end < lastFiltered.length ? page + 1 : undefined, meta: lastMeta };
  };
}
