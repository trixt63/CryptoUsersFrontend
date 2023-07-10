import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { fetchExplorerSearch } from 'src/services/_old/search-api';
import { ApiExplorerSearch } from 'src/services/_old/search-api/data-types';
import { NextPageWithLayout } from './_app';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ApiExplorerSearch>> {
  const q = ctx.query.q as string | undefined;
  if (!q) {
    return {
      notFound: true,
    };
  }
  const res = await fetchExplorerSearch({ keyword: q });
  const f0 = res.results[0];

  if (f0.type === 'block') {
    return {
      redirect: {
        permanent: false,
        destination: `/block/${f0.id}`,
      },
    };
  }

  if (f0.type === 'transaction') {
    return {
      redirect: {
        permanent: false,
        destination: `/tx/${f0.id}`,
      },
    };
  }

  if (f0.type === 'wallet') {
    return {
      redirect: {
        permanent: false,
        destination: `/wallet/${f0.id}`,
      },
    };
  }

  if (f0.type === 'token') {
    return {
      redirect: {
        permanent: false,
        destination: `/token/${f0.id}`,
      },
    };
  }

  if (f0.type === 'contract') {
    return {
      redirect: {
        permanent: false,
        destination: `/contract/${f0.id}`,
      },
    };
  }

  return {
    props: res,
  };
}

const Search: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <div>Search results</div>
      <div>{JSON.stringify(props)}</div>
    </>
  );
};

export default Search;
