import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const LoginContainerStyled = styled.div`  
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px;
    border: 1px solid gray;
    width: 300px;
`;

export const LoginTitleStyled = styled.div`
    width: 100%;
    margin-bottom: 15px;
    font-size: 20px;
`;

export const LoginButtonStyled = styled(Button)`
  margin-top: 10px;
`;