import withContainer from './withContainer';

const withContainers = (WrapperContainers, CustomComponent) => {
  let CurrentComponent = CustomComponent;

  WrapperContainers.map(WrapperContainer => {
    CurrentComponent = withContainer(WrapperContainer, CurrentComponent);

    return null;
  });

  return CurrentComponent;
};

export default withContainers;
