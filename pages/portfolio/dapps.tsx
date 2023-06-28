import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import PortfolioLayout from 'src/layouts/portfolio/PortfolioLayout';
import Dapps from 'src/modules/portfolio/Dapps';

const DAppsPortfolio: NextPageWithLayout = () => {
  return <Dapps />;
};

export default DAppsPortfolio;

DAppsPortfolio.getLayout = (page) => {
  return (
    <FullLayout>
      <PortfolioLayout title="DApps" description="Manage your portfolio with DApps reliability tracking and scoring.">
        {page}
      </PortfolioLayout>
    </FullLayout>
  );
};
