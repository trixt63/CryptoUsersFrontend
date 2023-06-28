import { formatNumber } from '@travalendingpool/utils';
import { toast } from 'react-toastify';

/**
 * Build exact url to resource in public folder
 * @param pathToPublicResource The path to the resource in public folder
 * @returns A string represents an url to resource
 */
export function buildPathToPublicResource(pathToPublicResource: string): string {
  if (pathToPublicResource[0] === '/') pathToPublicResource = pathToPublicResource.slice(1);
  return `${process.env.BASE_PATH ?? ''}/${pathToPublicResource}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumeric(num: any) {
  return !isNaN(num) && !isNaN(parseFloat(num));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessage(error: any) {
  if (!error) return undefined;

  if (error?.reason) return error.reason as string;
  if (error?.message) return error.message as string;

  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toFixed(num: any, fractionDigits: any = 0): any {
  num = Number(num);
  if (num == 0) return num.toFixed(fractionDigits);
  const fixedNum = num.toFixed(fractionDigits);
  if (fixedNum == 0) return toFixed(num, fractionDigits + 1);
  return fixedNum;
}

export default function formatNumberAfterComma(n: number) {
  if (n == 0) {
    return 0;
  } else if (n > 1) {
    return formatNumber(n, { fractionDigits: 2 });
  } else if (1 - Math.floor(Math.log(n) / Math.log(10)) > 7) {
    return n.toFixed(0);
  } else {
    const result = n.toFixed(Math.min(1 - Math.floor(Math.log(n) / Math.log(10)), 6));
    return result;
  }
}
export function mapEntityType(type: string) {
  switch (type) {
    case 'exchange':
      return 'exchanges';
    default:
      return type;
  }
}
export function getEntityUrl(data: { type: string; id: string; projectType?: string; [otherProps: string]: unknown }) {
  if (data.projectType && data.type === 'project') {
    return `/ranking/${mapEntityType(data.projectType)}/${data.id}`;
  } else {
    return `/${mapEntityType(data.type)}/${data.id}`;
  }
}

export const handleComingSoon = () => {
  toast.info('Coming soon...');
};
