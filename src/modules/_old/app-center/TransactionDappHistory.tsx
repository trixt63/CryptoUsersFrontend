import DateRangeIcon from '@mui/icons-material/DateRange';
import { alpha, Box, Button, ButtonGroup, Theme, useTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useState } from 'react';
import DatePicker from 'src/components/primitives/DatePicker';
import { FetchStatus } from 'src/constants';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';
import { updateTxDappHistory } from 'src/redux/app-center';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { fetchTransactionDappHistory } from 'src/services/home-api';
import { TopTokenPin } from 'src/services/home-api/data-types';
import { NestedLoading, Wrapper } from './common';
import { useStatus } from './hooks/useStatus';

type TimeOptionsProps = {
  setStatus: React.Dispatch<React.SetStateAction<FetchStatus>>;
};
const TimeOptions = ({ setStatus }: TimeOptionsProps) => {
  const options: Array<{ id: TopTokenPin; title: string; des: string }> = [
    { id: '1d', title: '1D', des: 'View 24 hours data' },
    { id: '1w', title: '1W', des: 'View 1 week data' },
    { id: '1m', title: '1M', des: 'View 1 month data' },
    { id: '1y', title: '1Y', des: 'View 1 year data' },
    { id: 'ytd', title: 'YTD', des: 'View year to date data' },
    { id: 'all', title: 'ALL', des: 'View all data' },
  ];
  const [activeTab, setActiveTab] = useState<TopTokenPin>(options[0].id);
  const dispatch = useAppDispatch();
  //
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), null]);
  // const [sDate, setSDate] = useState<Date | null>(new Date());
  // const [eDate, setEDate] = useState<Date | null>(null);

  const handleTabChange = async (id: TopTokenPin) => {
    setStatus(FetchStatus.FETCHING);
    setActiveTab(id);
    try {
      const data = await fetchTransactionDappHistory('0x38', id as TopTokenPin);
      dispatch(updateTxDappHistory(data));
      setStatus(FetchStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(FetchStatus.FAILED);
    }
  };

  const handleDatePickerContinue = () => {
    handleTabChange('range');
    setOpenDatePicker(false);
  };

  const toggleDatePicker = () => {
    setOpenDatePicker(!openDatePicker);
  };

  return (
    <ButtonGroup
      variant="text"
      disableElevation
      aria-label="time options"
      role="tablist"
      sx={{
        border: '1px solid #263343',
        borderRadius: '8px',
        '.btn-tab': {
          border: 'none !important',
          borderRadius: '8px !important',
          px: { xs: 1, xsm: 1.5 },
          color: 'text.primary',
          fontSize: {
            xs: '0.75rem',
            xsm: '0.875rem',
          },
        },
        '.active': {
          backgroundColor: (theme: Theme) => `${theme.palette.primary.main} !important`,
          color: 'white',
        },
        '.react-datepicker-wrapper': {
          width: 'auto',
        },
      }}
    >
      {options.map(({ title, id, des }) => (
        <Button
          role="tab"
          key={title}
          aria-label={des}
          aria-selected={id === activeTab}
          className={id === activeTab ? 'btn-tab active' : 'btn-tab'}
          onClick={() => handleTabChange(id)}
        >
          {title}
        </Button>
      ))}
      <DatePicker
        open={openDatePicker}
        onInputClick={toggleDatePicker}
        onClickOutside={() => setOpenDatePicker(false)}
        selected={dateRange[0]}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        maxDate={new Date()}
        onChange={(range) => {
          setDateRange(range);
        }}
        onContinue={handleDatePickerContinue}
        customInput={
          <Button
            role="tab"
            aria-label="View data in period of time"
            aria-selected={'range' === activeTab}
            className={'range' === activeTab ? 'btn-tab active' : 'btn-tab'}
            // onClick={toggleDatePicker}
          >
            <DateRangeIcon />
          </Button>
        }
        shouldCloseOnSelect={false}
      />
    </ButtonGroup>
  );
};

export default function TransactionDappHistory() {
  const hcDefaultConfig = useHighchartsDefaultConfig();
  const theme = useTheme();
  const data = useAppSelector((state) => state.appCenterSlice.txDappHistory);
  const { isLoading, isReady } = useStatus();

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [transactions, dapps] = useMemo(() => {
    const y: number[][] = [],
      z: number[][] = [];
    data.forEach((item) => {
      y.push([item.timestamp, item.transaction]);
      z.push([item.timestamp, item.dapp]);
    });
    return [y, z];
  }, [data]);

  const options = useMemo(() => {
    return deepmerge(hcDefaultConfig, {
      chart: {
        height: 400,
      },
      xAxis: {
        type: 'datetime',
        // title: {
        //   text: 'Market cap ($)',
        // },
        labels: {
          align: 'center',
        },
        crosshair: {
          zIndex: 100,
          color: '#9ebdd7',
        },
      },
      yAxis: [
        // transaction yAxis
        {
          ...hcDefaultConfig.yAxis,
          gridLineWidth: 0,
          title: {
            text: 'Number of Transactions',
            style: {
              color: theme.palette.text.primary,
            },
          },
        },
        // dapp yAxis
        {
          ...hcDefaultConfig.yAxis,
          // gridLineWidth: 0,
          title: {
            text: 'Number of Dapps',
            style: {
              color: theme.palette.text.primary,
            },
          },
          opposite: true,
        },
      ],
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      tooltip: {
        enabled: true,
        shared: true,
        // headerFormat: '<span style="font-size: 11px;">Market cap: <b>{point.key}</b></span><br/>',
      },
      series: [
        {
          type: 'column',
          name: 'Number of Dapps',
          data: dapps,
          yAxis: 1,
        },
        {
          type: 'line',
          name: 'Number of Transactions',
          data: transactions,
        },
      ],
    } as Highcharts.Options);
  }, [hcDefaultConfig, theme, dapps, transactions]);

  return (
    <Wrapper
      title="Transactions / Dapps Actions"
      contentSx={{ px: 0, pt: 3, pb: 0, position: 'relative', minHeight: 400 }}
    >
      {isLoading && <NestedLoading />}
      {isReady && (
        <>
          <Box sx={{ mb: 3, px: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <TimeOptions setStatus={setStatus} />
          </Box>
          <Box sx={{ position: 'relative', pb: 3 }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
            {status === FetchStatus.FETCHING && (
              <NestedLoading
                sx={{
                  bgcolor: alpha('#0D1921', 0.8),
                  backdropFilter: 'blur(10px)',
                }}
              />
            )}
          </Box>
        </>
      )}
    </Wrapper>
  );
}
