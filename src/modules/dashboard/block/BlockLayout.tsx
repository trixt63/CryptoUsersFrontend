import { useRouter } from 'next/router';
import DashboardContainer from '../shared/DashboardContainer';
import { DashboardContent, DashboardContentWrapper, DashboardNav, DashboardNavItem } from '../shared/DashboardContent';
import DashboardHeader, { DashboardHeaderProps } from '../shared/DashboardHeader';

export default function BlockLayout({ children, header }: { children: React.ReactNode; header: DashboardHeaderProps }) {
  const router = useRouter();

  return (
    <DashboardContainer>
      <DashboardHeader
        {...header}
        sx={{
          '.header-value': {
            marginLeft: 1,
          },
        }}
      />
      <DashboardContentWrapper>
        <DashboardContent>{children}</DashboardContent>
        <DashboardNav>
          <DashboardNavItem key={'overview'} title={'Overview'} link={`/block/${router.query.id}`} />
          <DashboardNavItem key={'txs'} title={'Transactions'} link={`/block/${router.query.id}/txs`} />
          <DashboardNavItem
            key={'relationship'}
            title={'Relationship'}
            link={`/visualization?type=block&q=${router.query.id}`}
          />
        </DashboardNav>
      </DashboardContentWrapper>
    </DashboardContainer>
  );
}
