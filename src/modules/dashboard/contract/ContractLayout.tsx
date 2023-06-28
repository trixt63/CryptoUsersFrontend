import CheckIcon from '@mui/icons-material/Check';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DashboardContainer from '../shared/DashboardContainer';
import { DashboardContent, DashboardContentWrapper, DashboardNav, DashboardNavItem } from '../shared/DashboardContent';
import DashboardHeader, { DashboardHeaderProps } from '../shared/DashboardHeader';

export default function ContractLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: DashboardHeaderProps & { verified: boolean };
}) {
  const router = useRouter();

  return (
    <DashboardContainer>
      <DashboardHeader
        {...header}
        name={
          <>
            Contract{' '}
            <Typography
              component="span"
              color="primary.main"
              sx={{ font: 'inherit', display: 'inline-flex', alignItems: 'center' }}
            >
              {header.name}
              &nbsp;{header.verified && <CheckIcon color="success" fontSize="large" />}
            </Typography>
          </>
        }
        sx={{
          '.header-value': {
            fontSize: '1.125rem',
            fontWeight: 500,
            display: 'inline-flex',
            marginLeft: 2,
          },
        }}
      />
      <DashboardContentWrapper>
        <DashboardContent>{children}</DashboardContent>
        <DashboardNav>
          <DashboardNavItem key={'overview'} title={'Overview'} link={`/contract/${router.query.id}`} />
          <DashboardNavItem key={'txs'} title={'Transactions'} link={`/contract/${router.query.id}/txs`} />
          {/* <DashboardNavItem key={'users'} title={'Users'} link={`/contract/${router.query.id}/users`} /> */}
          <DashboardNavItem
            key={'relationship'}
            title={'Relationship'}
            link={`/visualization?type=contract&q=${router.query.id}`}
          />
        </DashboardNav>
      </DashboardContentWrapper>
    </DashboardContainer>
  );
}
