/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LogoImg from 'public/images/logo.png';
import GraphSearch from './GraphSearch';
import { Link } from './primitives/Link';

// const DynamicWalletButton = dynamic(() => import('src/components/WalletButton'), { ssr: false });

export default function Header() {
  // const forceGraphType = useSelector((state: { configSlice: ConfigSlice }) => state.configSlice.forceGraphType);
  const router = useRouter();
  const chainId = '0x38';

  return (
    <Box component="header" sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, xsm: 4 } }}>
        <Link href={'/'}>
          <Image src={LogoImg} alt={'logo'} height={36} />
        </Link>
        <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
          <GraphSearch
            onSearch={(input) => {
              if (input.trim()) {
                router.push(`/visualization?q=${input}&chainId=${chainId}`);
              }
            }}
          />
        </Box>
        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mx: 2 }}>{forceGraphType && <ForceGraphTypeConfig type={forceGraphType} />}</Box>
          <DynamicWalletButton size="small" />
        </Box> */}
      </Box>
    </Box>
  );
}
