import styled from 'styled-components';
import { Select, Button } from 'wisenet-ui/components/atoms';

export const DateHeaderWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const PrevMonth = styled.span`
  margin-top: 2px;
  margin-left: 5px;
  cursor: default;
`;

export const NextMonth = styled.span`
  margin-top: 2px;
  margin-left: 4px;
  margin-right: 5px;
  cursor: default;
`;

export const MonthSelect = styled(Select)`
  margin-left: 4px;
  font-size: 12px;
  width: 97px;
  height: 25px;
  padding: 0px;
`;

export const YearSelect = styled(Select)`
  margin-left: 4px;
  font-size: 12px;
  width: 65px;
  height: 25px;
  padding: 0px;
`;

export const TodayButton = styled(Button)`
  margin-left: 5px;
  width: 45px;
  height: 25px;
  font-size: 12px;
  padding-top: 2px;
`;
