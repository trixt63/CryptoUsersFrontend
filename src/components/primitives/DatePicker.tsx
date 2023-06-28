import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Divider, IconButton, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { memo, useMemo, useState } from 'react';
import ReactDatePicker, {
  CalendarContainerProps,
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
} from 'react-datepicker';

type DatePickerProps = Omit<
  ReactDatePickerProps<never, true>,
  'selected' | 'startDate' | 'endDate' | 'selectsRange' | 'calendarContainer' | 'renderCustomHeader'
> & {
  selected: Date | null | undefined;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  onContinue?: (startDate: Date, endDate: Date) => void;
};

const CustomContainer = ({ className, children }: CalendarContainerProps) => {
  return (
    <Paper
      elevation={1}
      className={className}
      sx={{
        '&.react-datepicker': {
          p: 2,
          fontFamily: 'inherit',
          bgcolor: 'background.paper',
          color: 'text.primary',
          position: 'relative',
          fontSize: '0.8rem',
          border: 'none',
        },
        '.react-datepicker__header': {
          bgcolor: 'transparent',
          // borderBottomColor: 'divider',
          borderBottom: 'none',
          pt: 0,
        },
        '.react-datepicker__month-container': {
          float: 'none',
        },
        '.react-datepicker__day, .react-datepicker__time-name': {
          color: 'text.primary',
        },
        '.react-datepicker__day-name': {
          color: 'text.secondary',
        },
        '.react-datepicker__day, \
          .react-datepicker__month-text, \
          .react-datepicker__quarter-text, \
          .react-datepicker__year-text':
          {
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.14)',
            },
          },

        '.react-datepicker__day--disabled, \
        .react-datepicker__month-text--disabled, \
        .react-datepicker__quarter-text--disabled, \
        .react-datepicker__year-text--disabled':
          {
            color: '#ffffff4d',
            '&:hover': {
              bgcolor: 'transparent',
            },
          },
        '.react-datepicker__day--selected, \
          .react-datepicker__day--in-selecting-range, \
          .react-datepicker__day--in-range, \
          .react-datepicker__month-text--selected, \
          .react-datepicker__month-text--in-selecting-range, \
          .react-datepicker__month-text--in-range, \
          .react-datepicker__quarter-text--selected, \
          .react-datepicker__quarter-text--in-selecting-range, \
          .react-datepicker__quarter-text--in-range, \
          .react-datepicker__year-text--selected, \
          .react-datepicker__year-text--in-selecting-range, \
          .react-datepicker__year-text--in-range':
          {
            bgcolor: 'primary.dark',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          },
      }}
    >
      {/* <Box sx={{ display: 'flex' }}>
        <Box sx={{ pr: 2 }}>{children}</Box>
        <Box
          sx={{
            pl: 2,
            pt: '52px',
            pb: 1,
            borderLeft: '1px solid',
            borderLeftColor: 'divider',
          }}
        >
          <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
            Predefined dates
          </Typography>
          <List
            component="ul"
            sx={{
              '.MuiListItemButton-root': {
                borderRadius: 2,
                px: 1.5,
              },
            }}
          >
            <ListItemButton>Last 7 days</ListItemButton>
            <ListItemButton>Last 30 days</ListItemButton>
            <ListItemButton>Last 90 days</ListItemButton>
            <ListItemButton>Last 180 days</ListItemButton>
            <ListItemButton>Last 365 days</ListItemButton>
          </List>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" variant="text">
          Cancel
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 2 }}>
            <Typography variant="small" color="text.secondary">
              Selected: 0 days
            </Typography>
          </Box>
          <Button variant="contained" color="primary" size="small">
            Continue
          </Button>
        </Box>
      </Box> */}
      {children}
    </Paper>
  );
};

// const MonthPicker = ({
//   show,
//   date,
//   changeMonth,
// }: {
//   show: boolean;
//   date: Date;
//   changeMonth: (month: number) => void;
// }) => {
//   const activeMonth = useMemo(() => moment(date).get('M'), [date]);

//   return (
//     <Box
//       className={`monthpicker ${show ? 'show' : ''}`}
//       sx={{
//         '.monthpicker__name': {
//           px: 2,
//           py: 1,
//           width: '30%',
//           cursor: 'pointer',
//           display: 'inline-flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontWeight: 500,
//           borderRadius: 2,
//           height: 45,
//           '&:hover': {
//             bgcolor: 'rgba(255, 255, 255, 0.14)',
//           },
//           '&.selected': {
//             bgcolor: 'primary.dark',
//           },
//         },
//       }}
//     >
//       {moment.monthsShort().map((name, idx) => (
//         <Typography
//           variant="body2"
//           key={name}
//           component="span"
//           className={'monthpicker__name' + (idx === activeMonth ? ' selected' : '')}
//           onClick={() => changeMonth(idx)}
//         >
//           {name}
//         </Typography>
//       ))}
//     </Box>
//   );
// };

// const YearPicker = ({ show, date, changeYear }: { show: boolean; date: Date; changeYear: (year: number) => void }) => {
//   const activeYear = useMemo(() => moment(date).get('year'), [date]);

//   return (
//     <Box className={`yearpicker ${show ? 'show' : ''}`}>
//       {[].map((year) => (
//         <Typography
//           variant="body2"
//           key={year}
//           component="span"
//           className={'yearpicker__name' + (year === activeYear ? ' selected' : '')}
//           onClick={() => changeYear(year)}
//         >
//           {year}
//         </Typography>
//       ))}
//     </Box>
//   );
// };

const CustomHeader = memo(function CustomHeader(props: ReactDatePickerCustomHeaderProps) {
  const {
    date,
    // changeMonth,
    // changeYear,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
  } = props;

  const [type] = useState<'day' | 'month' | 'year'>('day');

  // const handleSelectOptions = () => {
  //   if (type === 'month') {
  //     setType('year');
  //   } else if (type === 'day') {
  //     setType('month');
  //   }
  // };

  const isTypeYear = type === 'year';
  const decreaseEvent = isTypeYear ? decreaseYear : decreaseMonth;
  const increaseEvent = isTypeYear ? increaseYear : increaseMonth;
  const prevButtonDisabled = isTypeYear ? prevYearButtonDisabled : prevMonthButtonDisabled;
  const nextButtonDisabled = isTypeYear ? nextYearButtonDisabled : nextMonthButtonDisabled;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        // '.monthpicker, .yearpicker': {
        //   display: 'flex',
        //   flexWrap: 'wrap',
        //   justifyContent: 'space-between',
        //   opacity: 0,
        //   visibility: 'hidden',
        //   position: 'absolute',
        //   top: '100%',
        //   left: 0,
        //   right: 0,
        //   bgcolor: 'background.paper',
        //   backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        //   height: 230,
        //   py: 1,
        //   '&.show': {
        //     opacity: 1,
        //     visibility: 'visible',
        //   },
        // },
        // '.monthpicker .monthpicker__name, .yearpicker .yearpicker__name': {
        //   px: 2,
        //   py: 1,
        //   width: '30%',
        //   cursor: 'pointer',
        //   display: 'inline-flex',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   fontWeight: 500,
        //   borderRadius: 2,
        //   height: 45,
        //   '&:hover': {
        //     bgcolor: 'rgba(255, 255, 255, 0.14)',
        //   },
        //   '&.selected': {
        //     bgcolor: 'primary.dark',
        //   },
        // },
      }}
    >
      <IconButton size="small" onClick={decreaseEvent} color="inherit" disabled={prevButtonDisabled}>
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <Box sx={{ flexGrow: 1 }}>
        <Button
          variant="text"
          sx={{
            px: 3,
            py: 1,
            color: 'inherit',
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.14)',
            },
          }}
          // onClick={handleSelectOptions}
        >
          {moment(date).format('MMM yyyy')}
        </Button>
      </Box>
      <IconButton size="small" onClick={increaseEvent} color="inherit" disabled={nextButtonDisabled}>
        <ChevronRightIcon fontSize="small" />
      </IconButton>

      {/* <MonthPicker
        date={date}
        show={type === 'month'}
        changeMonth={(month) => {
          changeMonth(month);
          setType('day');
        }}
      />

      <YearPicker
        date={date}
        show={type === 'year'}
        changeYear={(year) => {
          changeYear(year);
          setType('month');
        }}
      /> */}
    </Box>
  );
});

export default function DatePicker(props: DatePickerProps) {
  const { onContinue, ...other } = props;
  const { startDate, endDate } = other;

  const days = useMemo(() => {
    if (!startDate || !endDate) return null;
    return Math.abs(moment(endDate).diff(startDate, 'days'));
  }, [startDate, endDate]);

  const handleContinue = () => {
    if (startDate && endDate && typeof onContinue === 'function') {
      onContinue(startDate, endDate);
    }
  };

  return (
    <ReactDatePicker
      showPopperArrow
      {...props}
      calendarContainer={CustomContainer}
      renderCustomHeader={(props) => <CustomHeader {...props} />}
      selectsRange
    >
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ mr: 1 }}>
          <Typography variant="small" color="text.secondary">
            Selected:{' '}
            <Typography component="span" variant="small" color="text.primary">
              {days ?? '-'} days
            </Typography>
          </Typography>
        </Box>
        <Button variant="contained" size="small" disabled={!(startDate && endDate)} onClick={handleContinue}>
          Continue
        </Button>
        {/* </Box> */}
      </Box>
    </ReactDatePicker>
  );
}
