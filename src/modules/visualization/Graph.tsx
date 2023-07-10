/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Loading from 'src/components/Loading';
import { FetchStatus } from 'src/constants';
import useWindowDimensions from 'src/hooks/useWindowDemensions';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { fetchVisualizeData } from 'src/redux/visualization/graph-slice';
import { fetchDashboardIntroductionData } from 'src/redux/visualization/information-nodes-slice';
import { Link, Node } from 'src/services/_old/visualize-api/data-types';
import NodesList from './NodesList';
import VisualizationHeader from './VisualizationHeader';

const DynamicForce3DGraph = dynamic(() => import('src/modules/visualization/Force3DGraph'), { ssr: false });

export type ForceGraphData = {
  nodes: Array<Node>;
  links: Array<Link>;
};

export default function Graph() {
  const fgRef = useRef<any>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [openSelectedNodeInformation, setOpenSelectedNodeInformation] = useState<boolean>(false);

  const dataHeader = useAppSelector((state) => {
    if (router.query.q) {
      return state.visualization.informationNodesSlice.introduction[`${router.query.type}/${router.query.q}`] as {
        data: any;
        status: FetchStatus;
      };
    }
  });

  const { width, height } = useWindowDimensions();

  const [forceGraphData, setForceGraphData] = useState<ForceGraphData>(
    JSON.parse(
      JSON.stringify({
        nodes: [],
        links: [],
      })
    )
  );

  useEffect(() => {
    if (router.query.q && router.query.type) {
      dispatch(
        fetchVisualizeData(
          router.query.q as string,
          router.query.type as string,
          router.query['project-type'] as string
        )
      );
      dispatch(
        fetchDashboardIntroductionData({
          id: router.query.q as string,
          type: router.query.type as string,
          projectType: router.query['project-type'] as string,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router.query.q, router.query.type]);

  return width && height ? (
    <Box sx={{ position: 'relative' }}>
      {router.query.q && router.query.type && dataHeader && dataHeader.data && (
        <VisualizationHeader
          type={router.query.type as string}
          id={router.query.q as string}
          name={`${(router.query.type as string) == 'block' ? '#' : ''}${dataHeader.data.name}`}
          explorerUrls={dataHeader.data.explorerUrls}
          chains={dataHeader.data.chains}
          copyValue={dataHeader.data.address}
        />
      )}
      <NodesList setOpenSelectedNodeInformation={setOpenSelectedNodeInformation} />
      {forceGraphData && (
        <DynamicForce3DGraph
          fgRef={fgRef}
          forceGraphData={forceGraphData}
          setForceGraphData={setForceGraphData}
          width={width}
          height={height}
          setOpenSelectedNodeInformation={setOpenSelectedNodeInformation}
          openSelectedNodeInformation={openSelectedNodeInformation}
        />
      )}
    </Box>
  ) : (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loading />
    </Box>
  );
}
