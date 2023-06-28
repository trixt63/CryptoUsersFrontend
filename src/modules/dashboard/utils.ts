import moment from 'moment';

export function utcFormat(time: number) {
  return moment(time).utc().format('MMM-DD-YYYY hh:mm:ss A +UTC');
}

export function CapitalizeFirstLetter(string: string | undefined) {
  if (!string) {
    return '';
  } else {
    return string[0].toUpperCase() + string.slice(1);
  }
}
