import styled, { withTheme } from 'styled-components';

export default withTheme(styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: ${props => props.left}px;

  ::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: calc(100% - 27px); /* 27px은 Label 사이즈가 12px임을 고려하여 15px의 여백을 둠 */
    background-color: ${props => props.theme.colorSub5};
  }

  ::after {
    content: '${props => props.label}';
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 12px;
    color: ${props => props.theme.colorSub8};
  }
`);
