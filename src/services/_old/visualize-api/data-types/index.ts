export type Node = {
  id: string;
  key: string;
  type: string;
  name: string;
  metadata: { projectType?: string };
  isHide?: boolean;
};

export type Link = {
  id: string;
  type: string;
  source: string;
  target: string;
};

export type ApiVisualize = {
  id?: string;
  nodes?: Array<Node>;
  links?: Array<Link>;
  focusedNode?: string;
};
