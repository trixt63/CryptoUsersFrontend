import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import PortfolioLayout from 'src/layouts/portfolio/PortfolioLayout';
import Alerts from 'src/modules/portfolio/Alerts';

const AlertsPortfolio: NextPageWithLayout = () => {
  return <Alerts />;
};

export default AlertsPortfolio;

AlertsPortfolio.getLayout = (page) => {
  return (
    <FullLayout>
      <PortfolioLayout
        title="Alerts"
        description="Be quickly updated with portfolio volatility and inherent risks for the safety investment."
      >
        {page}
      </PortfolioLayout>
    </FullLayout>
  );
};
