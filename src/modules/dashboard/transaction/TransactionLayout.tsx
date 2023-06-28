import { useRouter } from 'next/router';
import DashboardContainer from '../shared/DashboardContainer';
import { DashboardContent, DashboardContentWrapper, DashboardNav, DashboardNavItem } from '../shared/DashboardContent';
import DashboardHeader, { DashboardHeaderProps } from '../shared/DashboardHeader';

export default function TransactionLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: DashboardHeaderProps;
}) {
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
          <DashboardNavItem key={'overview'} title={'Overview'} link={`/tx/${router.query.id}`} />
          <DashboardNavItem key={'transfers'} title={'Transfers'} link={`/tx/${router.query.id}/transfers`} />
          <DashboardNavItem
            key={'relationship'}
            title={'Relationship'}
            link={`/visualization?type=tx&q=${router.query.id}`}
          />
        </DashboardNav>
      </DashboardContentWrapper>
    </DashboardContainer>
  );
}
