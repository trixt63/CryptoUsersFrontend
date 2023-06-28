/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { ForceGraph3D } from 'react-force-graph';
import { useProjectOverview, useProjectVisualization } from 'src/contexts/project';
import visualizationBg from 'public/images/visualization/bgVisualization.png';
import SpriteText from 'three-spritetext';
import { formatAddress } from '@travalendingpool/utils';
import { Link } from 'src/components/primitives/Link';

export default function ProjectRelationship() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>();
  const forceGraphData = useProjectVisualization();
  const data = useProjectOverview();
  const elementRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = elementRef?.current;
    function handleResize() {
      if (element) {
        setDimensions({
          width: element.clientWidth,
          height: element.clientHeight,
        });
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const colorConfigs = [
    { name: 'Projects', type: 'project', color: '#FFD867' },
    { name: 'Contracts', color: '#846AE0' },
    { name: 'Tokens', type: 'token', color: '#3AD9DD' },
    { name: 'Wallets', type: 'wallet', color: '#C5C5C5' },
  ];

  return (
    <Paper
      sx={{
        // height: 500,
        // py: 3 ,
        width: '100%',
        my: 2,
        pt: 3,
      }}
      variant="border"
    >
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          justifyContent: 'space-between',
          px: 3,
          alignItems: 'center',
          height: '50px',
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`/visualization?q=${data.projectId}&type=project&project-type=${data.projectType}`}
          color="primary"
        >
          Relationship
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 1, sm: 0 } }}>
          {colorConfigs.map((item) => (
            <Box key={item.name} sx={{ display: 'flex', alignItems: 'baseLine', mr: 2 }}>
              <Box sx={{ backgroundColor: item.color, width: '12px', height: '12px', borderRadius: '50%', mr: 0.4 }} />
              <Typography variant="body2">{item.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        ref={elementRef}
        sx={{
          backgroundImage: `url(${visualizationBg.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          backgroundPosition: 'center center',
          borderRadius: '0px 0px 14px 14px',
        }}
      >
        <ForceGraph3D
          height={400}
          width={dimensions.width}
          graphData={forceGraphData}
          ref={fgRef}
          backgroundColor={'rgba(0,0,0,0)'}
          showNavInfo={false}
          nodeRelSize={6} //do to cua qua cau
          nodeVal={1}
          nodeResolution={70} // do tron cua qua cau
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
          nodeColor={(node: any) => {
            if (node.type == 'project') {
              return '#FFD867';
            } else if (node.type == 'contract') {
              return '#846AE0';
            } else if (node.type == 'token') {
              return '#3AD9DD';
            } else return '#C5C5C5';
          }}
          nodeOpacity={0.7}
          linkOpacity={0.2}
          linkWidth={0.6}
          nodeThreeObjectExtend={true}
          nodeThreeObject={(node: any) => {
            const sprite: any = new SpriteText(`${node.name ? node.name : formatAddress(node.id)}`);
            sprite.color = '#8898aa';
            sprite.textHeight = 4;
            sprite.center.set(0.5, 2.8);
            return sprite;
          }}
        />
      </Box>
    </Paper>
  );
}
