import { type Href, router } from 'expo-router';

type Params = Record<string, string>;

const toHref = (pathname: string, params?: Params) => ({ pathname, params }) as unknown as Href;

export const goTo = (pathname: string, params?: Params) => router.push(toHref(pathname, params));

export const replaceWith = (pathname: string, params?: Params) => router.replace(toHref(pathname, params));

export const goBackOr = (fallbackPathname: string) => {
  if (router.canGoBack()) router.back();
  else replaceWith(fallbackPathname);
};
