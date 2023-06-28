/* eslint-disable @typescript-eslint/no-explicit-any */
import { VisualizationLayout } from 'src/layouts/VisualizationLayout';
import Graph from 'src/modules/visualization/Graph';
import { NextPageWithLayout } from './_app';

const Visualization: NextPageWithLayout = () => {
  return <Graph />;
};

export default Visualization;
Visualization.getLayout = (page) => {
  return <VisualizationLayout>{page}</VisualizationLayout>;
};
