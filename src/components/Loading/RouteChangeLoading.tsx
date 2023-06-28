import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

export default function RouteChangeLoading() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    if (!router.isReady) return;
    let timerId: string | number | NodeJS.Timer;
    const start = () => {
      setProgress(10);
      timerId = setInterval(() => {
        setProgress((p) => {
          return Math.min(p + 1, 50);
        });
      }, 250);
    };
    const complete = () => {
      clearInterval(timerId);
      setProgress(100);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', complete);
    router.events.on('routeChangeError', complete);
    return () => {
      clearInterval(timerId);
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', complete);
      router.events.off('routeChangeError', complete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <LoadingBar
      shadow
      waitingTime={500}
      color={theme.palette.primary.main}
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
}
