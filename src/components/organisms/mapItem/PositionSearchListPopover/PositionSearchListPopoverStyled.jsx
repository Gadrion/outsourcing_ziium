import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const ButtonStyled = styled(Button)`
	height: 40px;
	font-size: 17px;
	&:hover {
    background-color: #efecec;
    border: 1px solid #efecec;
	}
	background-color: white;
`;

export const PositionSearchListContainerStyled = styled.div`
  min-width: 200px;
  height: calc(100vh - 80px);
  background: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: auto;
`;