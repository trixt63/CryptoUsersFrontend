/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useMemo } from 'react';
import { UserAsset } from 'src/redux/portfolio/assets-slice';
import formatNumberAfterComma from 'src/utils';
import AllocationDonutChart, { colors } from '../../components/AllocationDonutChart';
import PaperTitle from '../../components/PaperTitle';
import { useTokensData } from '../hooks';

export default function TokenAllocation() {
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

  const arrSort = useMemo(() => {
    const dataSort = mergeDuplicateData.slice().sort(function (a: any, b: any) {
      const vla = a.valueInUSD;
      const vlb = b.valueInUSD;
      if (vla > vlb) return -1;
      if (vla < vlb) return 1;
      return 0;
    });
    return dataSort;
  }, [mergeDuplicateData]);

  const dataAllocation = useMemo(() => {
    const total = arrSort.reduce((total, item) => total + item.valueInUSD, 0);
    if (data.length > 4) {
      const dataOthers = arrSort.slice(4).reduce((accumulator, currentValue) => {
        return accumulator + currentValue.valueInUSD;
      }, 0);
      return [
        ...arrSort.slice(0, 4).map((item) => [item.name, item.valueInUSD, (item.valueInUSD / total) * 100]),
        ...[['Others', dataOthers, (dataOthers / total) * 100]],
      ];
    } else {
      return mergeDuplicateData.map((item) => {
        return [item.name, item.valueInUSD, (item.valueInUSD / total) * 100];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrSort]);

  return (
    <Paper sx={{ p: 3, height: 300 }} variant="border">
      <PaperTitle title="Token Allocation" />
      <Grid container>
        <Grid item xs={6}>
          {dataAllocation.length > 0 && <AllocationDonutChart dataChart={dataAllocation} />}
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            {dataAllocation.map((item, index) => (
              // <Link key={index} href={`/${mapEntityType(item[3].toString())}/${item[4].toString()}`}>
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    mr: '4px',
                    backgroundColor: colors[index],
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    className={'text-truncate'}
                    variant="body2"
                    sx={{ color: 'text.secondary', minWidth: { xs: 60, sm: 100 }, maxWidth: { xs: 60, sm: 100 } }}
                  >
                    {item[0]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, ml: 1 }}>
                    {formatNumberAfterComma(Number(item[2]))}%
                  </Typography>
                </Box>
              </Box>
              // </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
