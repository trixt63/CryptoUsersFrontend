import { deepmerge } from '@mui/utils';
import { store } from 'src/redux/store';

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response;
    this.data = data ?? { message: message };
  }
}

export default async function fetchJson<JSON = unknown>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const response = await fetch(input, init);

  let data;
  try {
    data = await response.json();
  } catch (error) {
    // pass
  }

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}

export async function fetchAuthJson<JSON = unknown>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const token = store.getState().auth.token;
  return await fetchJson(
    input,
    deepmerge(init ?? {}, {
      headers: {
        Authorization: token,
      },
    })
  );
}
