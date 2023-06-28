import { isNumeric } from '@travalendingpool/utils';
import { ParsedUrlQuery } from 'querystring';
import { API_ROOT_V2 } from 'src/configs/api';

export type ServerPagination = {
  page?: number;
  pageSize?: number;
  order?: 'asc' | 'desc';
  orderBy?: string;
};

export function getPagination(query: ParsedUrlQuery, defaultOrderBy: string | undefined = undefined) {
  const { orderBy, page = 1, pageSize = 10, order = 'desc' } = query;
  return {
    orderBy: (orderBy as string | undefined) || defaultOrderBy,
    page: isNumeric(page) ? Number(page) : 1,
    pageSize: isNumeric(pageSize) ? Number(pageSize) : 10,
    order: ['asc', 'desc'].includes(order as string) ? (order as ServerPagination['order']) : 'desc',
  };
}

export function getApi(path: string, query?: Record<string, unknown>) {
  const s = API_ROOT_V2 + path;
  let q = '';
  for (const key in query) {
    if (['string', 'number', 'boolean'].includes(typeof query[key])) {
      q += (q === '' ? '?' : '&') + `${key}=${query[key]}`;
    }
  }
  return s + q;
}
