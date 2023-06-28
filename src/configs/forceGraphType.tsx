export const getCurrentForceGraphType = () => {
  const type = localStorage.getItem('forceGraphType');
  if (type) {
    return type;
  } else {
    localStorage.setItem('forceGraphType', '3D');
    return '3D';
  }
};
