import styled from 'styled-components';
import { ListSelect } from 'components/molecules';
import { DropDownMenu } from 'wisenet-ui/components/organisms';

export const SearchOptionLeftStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const DropDownMenuStyled = styled(DropDownMenu)`
  & > div {
    bottom: 26px;
    right: auto;
  }
`;

export const ListSelectStyled = styled(ListSelect)`
  height: 25px;
  padding: 0 5px;
  margin-left: 20px;
`;
