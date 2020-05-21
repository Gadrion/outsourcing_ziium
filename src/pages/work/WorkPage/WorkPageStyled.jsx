import styled, { css } from 'styled-components';
import Button from '@material-ui/core/Button';

export const ButtonStyled = styled(Button)`
	height: 40px;
	background-color: white;
	font-size: 17px;
	&:hover {
    background-color: #efecec;
    border: 1px solid #efecec;
  }
`;

export const LogoutAreaStyled = styled.div`
	position: absolute;
	left: 150px;
	margin: 10px;
`;

export const TopCenterAreaStyled = styled.div`
	position: absolute;
	left: 50%;
	margin: 10px;
	transform: translateX(-50%);
`;

export const TopRightAreaStyled = styled.div`
	position: absolute;
	right: 0;
	margin: 10px;
`;

export const LeftBottomAreaStyled = styled.div`
	position: absolute;
	bottom: 0;
`;