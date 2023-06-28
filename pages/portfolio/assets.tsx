import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import PortfolioLayout from 'src/layouts/portfolio/PortfolioLayout';
import Assets from 'src/modules/portfolio/Assets';

const AssetsPortfolio: NextPageWithLayout = () => {
  return <Assets />;
};

export default AssetsPortfolio;

AssetsPortfolio.getLayout = (page) => {
  return (
    <FullLayout>
      <PortfolioLayout title="Assets" description="Manage your portfolio with assets reliability tracking and scoring.">
        {page}
      </PortfolioLayout>
    </FullLayout>
  );
};
