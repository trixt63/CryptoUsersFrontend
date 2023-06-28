import { Typography } from '@mui/material';
// import { Box, InputBase, MenuItem, Paper, Select, Skeleton, styled, Typography } from '@mui/material';
// import { formatNumber } from '@travalendingpool/utils';
// import moment from 'moment';
// import { useEffect, useState } from 'react';
// import Empty from 'src/components/Empty';
// import { useAuthorization } from 'src/hooks/useAuthorization';
// import { useAppDispatch, useAppSelector } from 'src/redux/hook';
// import { fetchAlertsData } from 'src/redux/portfolio/alerts-slice';
// import { useWeb3React } from 'src/wagmi';
// import { useAlertsData, useAlertsStatus } from './hook';

// interface AlertInformationProps {
//   data: {
//     timestamp: number;
//     type: string;
//     direct: string;
//     valueInUSD: number;
//     changeRate: number;
//     duration: number;
//     token?: {
//       id: string;
//       type: string;
//       name: string;
//       symbol: string;
//       imgUrl: string;
//     };
//   };
// }

// const alertsTypes = [
//   { id: 0, label: 'All', param: undefined },
//   { id: 1, label: 'Balance', param: 'balance' },
//   { id: 2, label: 'Token Price', param: 'token_price' },
//   { id: 3, label: 'DApp APR', param: 'dapp_apr' },
// ];

// function AlertInformation(props: AlertInformationProps) {
//   const { data } = props;
//   return (
//     <Box sx={{ my: 2 }}>
//       <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//         {moment(data.timestamp * 1000).format('MMM-yyyy hh:mm:ss')}
//       </Typography>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <span style={{ display: 'flex', alignItems: 'center' }}>
//           {data.type === 'balance' ? (
//             'Your balance'
//           ) : (
//             <span style={{ display: 'flex', alignItems: 'center' }}>
//               <img src={data.token?.imgUrl} width={20} alt="token-alert-image" />
//               <span>&nbsp;price of {data.token?.symbol}</span>
//             </span>
//           )}
//           &nbsp;has {data.direct}&nbsp;
//         </span>
//         <span style={{ color: data.direct === 'increased' ? '#15b57a' : '#a13d46' }}>
//           {formatNumber(data.valueInUSD, { fractionDigits: 2, prefix: '$' })}&nbsp;(
//           {formatNumber(data.changeRate * 100, { fractionDigits: 2, suffix: '%' })})&nbsp;
//         </span>
//         <span>in the last {Math.floor(data.duration / 3600)} hours</span>
//       </Box>
//     </Box>
//   );
// }

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   'label + &': {
//     marginTop: theme.spacing(3),
//   },
//   '& .MuiInputBase-input': {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.default,
//     fontSize: 16,
//     width: '150px',
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     color: '#5185AA',
//     '&:focus': {
//       borderRadius: 4,
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }));

export default function Alerts() {
  // const { address } = useWeb3React();
  // const dispatch = useAppDispatch();
  // const { auth } = useAuthorization();
  // const data = useAlertsData();
  // const { isLoading } = useAlertsStatus();

  // const chain = useAppSelector((state) => state.portfolio.configSlice.chainId);

  // const [type, setType] = useState(alertsTypes[0]);
  // const handleChange = (event: { target: { value: string } }) => {
  //   const result = alertsTypes.find((item) => item.label == event.target.value);
  //   if (result) {
  //     setType(result);
  //   }
  // };

  // useEffect(() => {
  //   if (address && chain && type && auth.authenticated) {
  //     dispatch(fetchAlertsData({ address, chain, type: type.param }));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address, chain, auth.authenticated, type]);

  return (
    <>
      {/* <Paper
        variant="border"
        sx={{
          position: 'relative',
          mt: 2,
          p: '14px',
          borderRadius: '14px',
          mb: 2,
          minHeight: 150,
        }}
      >
        {isLoading ? (
          <>
            <Skeleton variant="text" sx={{ maxWidth: 70, width: '100%' }} />
            <Skeleton variant="text" width={150} />
            <Skeleton variant="text" sx={{ maxWidth: 70, width: '100%' }} />
            <Skeleton variant="text" width={150} />
          </>
        ) : (
          <Box sx={{ mt: { xs: 8, sm: 0 } }}>
            <Box>
              {data && (
                <Box>
                  {data.alerts.map((item, index) => (
                    <Box key={index}>
                      <AlertInformation data={item} />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            <Box>
              {data && data.alerts.length == 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                  <Empty title="No Data!" />
                </Box>
              )}
            </Box>
          </Box>
        )}
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
          <Select id="select-type" value={type.label} onChange={handleChange} input={<BootstrapInput />}>
            {alertsTypes.map((item) => (
              <MenuItem key={item.id} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Paper> */}
      <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
        Coming soon...
      </Typography>
    </>
  );
}
