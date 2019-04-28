export const makeCameraUID = channel => (
  `${channel}-${Math.floor((Math.random() * 1000) + 1)}`
);
