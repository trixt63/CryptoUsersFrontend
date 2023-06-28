/* eslint-disable @typescript-eslint/no-explicit-any */

export const getPositionNode = (dataForceGraph: any, nodeId: string) => {
  const result = dataForceGraph.nodes.filter((item: any) => item.id == nodeId);
  if (result.length > 0) return result[0];
  else return undefined;
};

export const focusNode = (node: any, fgRef: any) => {
  const distance = 200;
  const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

  if (fgRef.current) {
    fgRef.current.cameraPosition(
      {
        x: node.x == 0 ? 30 : node.x * distRatio,
        y: node.y == 0 ? 30 : node.y * distRatio,
        z: node.z == 0 ? 30 : node.z * distRatio,
      }, // new position
      { x: node.x, y: node.y, z: node.z }, // lookAt ({ x, y, z })
      3000 // ms transition duration
    );
  }
};

export const defaultPage = 1;
export const itemPerPage = 10;

export const color = ['#7994C1', '#CEDEFF', '#90ed7d', '#f7a35b', '#8085e9', '#19aece'];

export const changeTypeGetApi = (type: string) => {
  if (type == 'wallet') {
    return 'wallets';
  } else if (type == 'block') {
    return 'blocks';
  } else if (type == 'contract') {
    return 'contracts';
  } else if (type == 'tx') {
    return 'transactions';
  } else if (type == 'token') {
    return 'tokens';
  } else if (type == 'project') {
    return 'projects';
  } else return '';
};

export const getTypeColorNode = (type: string) => {
  if (type == 'project') {
    return '#FFD867';
  } else if (type == 'contract') {
    return '#846AE0';
  } else if (type == 'token') {
    return '#3AD9DD';
  } else {
    return '#C5C5C5';
  }
};
