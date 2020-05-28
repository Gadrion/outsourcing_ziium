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
`;