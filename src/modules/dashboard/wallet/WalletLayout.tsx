import { useRouter } from 'next/router';
import React from 'react';
import useSearchParams from 'src/hooks/useSearchParams';
import DashboardContainer from '../shared/DashboardContainer';
import { DashboardContent, DashboardContentWrapper, DashboardNav, DashboardNavItem } from '../shared/DashboardContent';
import DashboardHeader, { DashboardHeaderProps } from '../shared/DashboardHeader';

export default function WalletLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: DashboardHeaderProps;
}) {
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
            marginLeft: 1,
          },
        }}
      />
      <DashboardContentWrapper>
        <DashboardContent>{children}</DashboardContent>
        <DashboardNav>
          <DashboardNavItem key={'overview'} title={'Overview'} link={`/wallet/${router.query.id}`} />
          <DashboardNavItem
            key={'txs'}
            title={'Transactions'}
            link={`/wallet/${router.query.id}/txs`}
            active={(asPath, link) => asPath.startsWith(link)}
          />
          {/* <DashboardNavItem key={'money-flow'} title={'Money Flow'} link={`/wallet/${router.query.id}/money-flow`} /> */}
          <DashboardNavItem
            key={'credit-score'}
            title={'Credit Score'}
            link={`/wallet/${router.query.id}/credit-score`}
          />
          <DashboardNavItem
            key={'relationship'}
            title={'Relationship'}
            link={`/visualization?type=wallet&q=${router.query.id}`}
          />
        </DashboardNav>
      </DashboardContentWrapper>
    </DashboardContainer>
  );
}
