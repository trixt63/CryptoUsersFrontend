import { useRouter } from 'next/router';

export type GraphSearchParams = {
  q: string | null | undefined;
  type: string | null | undefined;
  reset: boolean;
  chainId: string | null | undefined;
};

export type UseGraphSearchParams = {
  params: GraphSearchParams;
  setParams: (params: Partial<GraphSearchParams>) => void;
};

type QueryParams = {
  q?: string;
  type?: string;
  chainId?: string;
  reset?: string;
};

function useGraphSearchParams(): UseGraphSearchParams {
  const router = useRouter();
  const query = router.query as QueryParams;

  const setParams = (params: Partial<GraphSearchParams>) => {
    Object.entries(params).forEach(([k, v]) => {
      router.query[k] = String(v);
    });
    router.push(router);
  };

  return {
    setParams,
    params: {
      q: query.q,
      type: query.type,
      chainId: query.chainId,
      reset: query.reset !== 'false',
    },
  };
}

export default useGraphSearchParams;
