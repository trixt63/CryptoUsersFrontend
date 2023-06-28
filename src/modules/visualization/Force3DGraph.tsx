/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { formatAddress } from '@travalendingpool/utils';
import { useRouter } from 'next/router';
import visualizationBg from 'public/images/visualization/bgVisualizationDetail.png';
import { useEffect, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import Failed from 'src/components/Failed';
import Loading from 'src/components/Loading';
import { FetchStatus } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { setSelectedNodeId } from 'src/redux/visualization/graph-slice';
import { fetchDashboardIntroductionData } from 'src/redux/visualization/information-nodes-slice';
import SpriteText from 'three-spritetext';
import { ForceGraphData } from './Graph';
import SelectedNodeInformation from './selected-node-information';
import { focusNode } from './utils';

interface Force3DGraphProps {
  fgRef: any;
  forceGraphData: ForceGraphData;
  setForceGraphData: React.Dispatch<React.SetStateAction<ForceGraphData>>;
  width: number;
  height: number;
  setOpenSelectedNodeInformation: React.Dispatch<React.SetStateAction<boolean>>;
  openSelectedNodeInformation: boolean;
}

export default function Force3DGraph(props: Force3DGraphProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    fgRef,
    forceGraphData,
    setForceGraphData,
    width,
    height,
    setOpenSelectedNodeInformation,
    openSelectedNodeInformation,
  } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedNode, setSelectedNode] = useState<string>('');

  const nodes = useAppSelector((state) => state.visualization.graphSlice.data?.nodes);
  const links = useAppSelector((state) => state.visualization.graphSlice.data?.links);
  const fetchDataChartStatus = useAppSelector((state) => state.visualization.graphSlice.status);
  const selectedNodeId = useAppSelector((state) => state.visualization.graphSlice.selectedNode);

  const formatGraphData = () => {
    if (nodes && links) {
      // eslint-disable-next-line prefer-const
      let nodeHide: { [key: string]: boolean } = {};
      Object.values(nodes).forEach((item) => {
        return (nodeHide[item.id] = item.isHide ?? false);
      });
      const formatLinks = links.filter((item) => !nodeHide[item.source] && !nodeHide[item.target]);
      const formatNodes = Object.values(nodes).filter((item) => !item.isHide);
      setForceGraphData(
        JSON.parse(
          JSON.stringify({
            nodes: formatNodes,
            links: formatLinks,
          })
        )
      );
    }
  };

  const handleNodeClick = (nodeSelected: any) => {
    setOpenSelectedNodeInformation(true);
    setSelectedNode(nodeSelected.id);
    focusNode(nodeSelected, fgRef);
    dispatch(setSelectedNodeId(nodeSelected.id));
    dispatch(
      fetchDashboardIntroductionData({
        id: nodeSelected.key,
        type: nodeSelected.type,
        projectType: nodeSelected.metadata ? nodeSelected.metadata.projectType : undefined,
      })
    );
  };

  useEffect(() => {
    formatGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);

  useEffect(() => {
    if (forceGraphData.nodes && selectedNodeId) {
      const node = forceGraphData.nodes.find((item) => {
        return item.id == selectedNodeId;
      });
      if (node) {
        focusNode(node, fgRef);
      }
    }
  }, [fgRef, forceGraphData.nodes, selectedNodeId]);

  return (
    <Box>
      {(selectedNode != '' || router.query.q) && (
        <SelectedNodeInformation open={openSelectedNodeInformation} setOpen={setOpenSelectedNodeInformation} />
      )}
      <Box
        sx={{
          backgroundImage: `url(${visualizationBg.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        {fetchDataChartStatus != FetchStatus.SUCCESS && (
          <Box
            sx={{
              height: '100%',
              zIndex: '10',
              position: 'absolute',
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {fetchDataChartStatus == FetchStatus.FETCHING && <Loading size={24} />}
            {fetchDataChartStatus == FetchStatus.FAILED && <Failed title="Failed to fetch data" />}
          </Box>
        )}
        <ForceGraph3D
          width={width}
          height={height}
          backgroundColor={'rgba(0,0,0,0)'}
          graphData={forceGraphData}
          ref={fgRef}
          showNavInfo={false}
          nodeRelSize={8}
          nodeVal={1}
          nodeResolution={70}
          nodeLabel={(node: any) => {
            if (node.name != null) {
              return `<b style='color:#a93a59'>${node.type.charAt(0).toUpperCase() + node.type.slice(1)}</b></br>${
                node.name
              }`;
            }
            return `<b style='color:#a93a59'>${node.type.charAt(0).toUpperCase() + node.type.slice(1)}</b></br>${
              node.id
            }`;
          }}
          nodeColor={(node: any) => {
            if (node.type == 'project') {
              return '#FFD867';
            } else if (node.type == 'contract') {
              return '#846AE0';
            } else if (node.type == 'token') {
              return '#3AD9DD';
            } else return '#C5C5C5';
          }}
          linkLabel={(node: any) => {
            const color = {
              project: '#E46286',
              wallet: '#3AD9DD',
              token: '#846AE0',
              dapp: '#FFD867',
            };
            return `<b style='color:${color[node.source.type as keyof typeof color] || '#C5C5C5'}'>From: ${
              node.source.name ? node.source.name : node.source.id
            }</b></br><b style='color:${color[node.target.type as keyof typeof color] || '#C5C5C5'}'>To: ${
              node.target.name ? node.target.name : node.target.id
            }
              </b></br><b style='color:#FFFFFF ;text-transform: capitalize'>${node.type}</b> `;
          }}
          nodeOpacity={0.7}
          linkOpacity={0.2}
          linkWidth={0.6}
          onNodeClick={(node) => {
            handleNodeClick(node);
          }}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
          nodeThreeObjectExtend={true}
          nodeThreeObject={(node: any) => {
            if (node.isHide) {
              return undefined;
            }
            const sprite: any = new SpriteText(`${node.name ? node.name : formatAddress(node.id)}`);
            sprite.color = '#8898aa';
            sprite.textHeight = 6;
            sprite.center.set(0.5, 2.7);
            return sprite;
          }}
          warmupTicks={10}
        />
      </Box>
    </Box>
  );
}
