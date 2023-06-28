import { useRouter } from 'next/router';
import DashboardContainer from '../shared/DashboardContainer';
import { DashboardContent, DashboardContentWrapper, DashboardNav, DashboardNavItem } from '../shared/DashboardContent';
import DashboardHeader, { DashboardHeaderProps } from '../shared/DashboardHeader';
import useSearchParams from 'src/hooks/useSearchParams';

export default function TokenLayout({ children, header }: { children: React.ReactNode; header: DashboardHeaderProps }) {
  const router = useRouter();
  const { set, get, remove } = useSearchParams();
  return (
    <DashboardContainer>
      <DashboardHeader
        chainSelectProps={
          header.chains
            ? {
                value: header.chains.length > 1 ? get('chain') ?? 'all' : header.chains[0],
                disableAll: header.chains.length <= 1,
                onChange: (event) => {
                  if (event.target.value === 'all') {
                    remove('chain');
                  } else {
                    set('chain', event.target.value as string);
                  }
                },
              }
            : undefined
        }
        {...header}
        sx={{
          '.header-value': {
            fontSize: '1.125rem',
            fontWeight: 500,
            display: 'inline-flex',
            marginLeft: 1,
          },
        }}
      />
      <DashboardContentWrapper>
        <DashboardContent>{children}</DashboardContent>
        <DashboardNav>
          <DashboardNavItem key={'overview'} title={'Overview'} link={`/token/${router.query.id}`} />
          <DashboardNavItem key={'transfers'} title={'Transfers'} link={`/token/${router.query.id}/transfers`} />
          <DashboardNavItem key={'holders'} title={'Holders'} link={`/token/${router.query.id}/holders`} />
          <DashboardNavItem key={'exchanges'} title={'Exchanges'} link={`/token/${router.query.id}/exchanges`} />
          <DashboardNavItem key={'health'} title={'Token Health'} link={`/token/${router.query.id}/health`} />
          <DashboardNavItem
            key={'relationship'}
            title={'Relationship'}
            link={`/visualization?type=token&q=${router.query.id}`}
          />
        </DashboardNav>
      </DashboardContentWrapper>
    </DashboardContainer>
  );
}
