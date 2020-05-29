/* eslint-disable no-tabs */
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const ButtonStyled = styled(Button)`
	height: 40px;
	font-size: 17px;
	&:hover {
    background-color: ${props => (props.checkViewType ? '#b8e0ec' : '#efecec')};
    border: 1px solid #efecec;
	}
	background-color: ${props => (props.checkViewType ? '#b8e0ec' : 'white')}
`;

export const LogoutAreaStyled = styled.div`
	position: absolute;
	top: 42px;
	margin: 10px;
`;

export const SearchResultButtonStyled = styled.div`
	position: absolute;
	left: 150px;
	margin: 10px;
	margin-left: 1px;
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

	display: inline-flex;
	align-items: flex-end;
`;

export const PendingDiv = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	background: lightgray;
	opacity: 0.6;
`;
