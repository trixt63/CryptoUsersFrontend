/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Pagination as MuiPagination, Paper } from '@mui/material';
import { useMemo, useState } from 'react';
import Empty from 'src/components/Empty';
import { defaultPage } from 'src/modules/visualization/utils';
import { UserAsset } from 'src/redux/portfolio/assets-slice';
import PaperTitle from '../../components/PaperTitle';
import useSortData, { useTokensData } from '../hooks';
import TokensHead from './TokensHead';
import TokensRow from './TokensRow';

export default function Tokens() {
  const itemPerPage = 5;
  const data = useTokensData();

  const mergeDuplicateData = useMemo(() => {
    if (data.length > 0) {
      const out = data.reduce((a: { [key: string]: UserAsset }, v: UserAsset) => {
        if (a[v.id]) {
          a[v.id].valueInUSD += v.valueInUSD;
        } else {
          a[v.id] = { ...v };
        }

        return a;
      }, {});

      return Object.values(out);
    } else return [];
  }, [data]);

  const { update, realData, sortType, sortKey } = useSortData({
    sortData: mergeDuplicateData,
    defaultSortType: 'desc',
    defaultSortKey: 'valueInUSD',
  });

  const [page, setPage] = useState(defaultPage);

  function onPaginationChangeClick(_: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
  }

  const width = '18%';
  return (
    <Paper variant="border" sx={{ p: 3, borderRadius: '14px' }}>
      <PaperTitle title="Tokens" />
      <Box sx={{ overflowX: { xs: 'scroll' }, mx: '-24px' }} className="custom-scrollbar">
        <Box sx={{ width: '100%' }}>
          <TokensHead width={width} sortUpdate={update} sortType={sortType} sortKey={sortKey} />
        </Box>
        <Box sx={{ width: '100%' }}>
          {realData.slice((page - 1) * itemPerPage, page * itemPerPage).map((item: any) => {
            return <TokensRow width={width} key={item.newId} data={item} />;
          })}
          {realData.length === 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
              <Empty title="No Data!" />
            </Box>
          )}
        </Box>
      </Box>
      {realData && realData.length > 0 && (
        <Box py={3} display="flex" justifyContent="flex-end">
          <MuiPagination
            count={Math.ceil(realData.length / itemPerPage)}
            defaultPage={1}
            variant="text"
            onChange={onPaginationChangeClick}
            page={page}
            color="primary"
          />
        </Box>
      )}
    </Paper>
  );
}
