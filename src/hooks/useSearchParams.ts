import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useDidUpdate from './useDidUpdate';

function useSearchParams() {
  const router = useRouter();

  const [searchParams, setSearchParams] = useState(() => {
    return new URLSearchParams(router.query as { [key: string]: string });
  });

  const [queryString, setQueryString] = useState(searchParams.toString());

  useDidUpdate(() => {
    router.push(queryString ? `?${queryString}` : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  useEffect(() => {
    const _searchParam = new URLSearchParams(router.query as { [key: string]: string });
    setSearchParams(_searchParam);
    // setQueryString(_searchParam.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const get = (name: string) => searchParams.get(name);

  const set = (name: string, value: string) => {
    searchParams.set(name, value);
    setQueryString(searchParams.toString());
  };

  const remove = (name: string) => {
    searchParams.delete(name);
    setQueryString(searchParams.toString());
  };

  return { queryString, get, set, remove };
}

export default useSearchParams;
