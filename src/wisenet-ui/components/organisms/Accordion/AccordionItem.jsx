import React from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  I,
  ListItem,
  Input,
  Content,
  OverFlowContent,
} from './AccordionItemStyled';

const AccordionItem = ({
  id,
  onChange,
  // prevMenu,
  data,
  style,
}) => (
  <ListItem>
    <Input
      id={id}
      type="checkbox"
      // checked={!(prevMenu[0] === id && prevMenu[1])}
      onChange={onChange}
    />
    <I />
    <Title>
      {data.title}
      {data.addionalItem !== undefined && data.addionalItem }
    </Title>
    {data.title === 'Text Search'
      ? <Content>{data.content}</Content>
      : <OverFlowContent style={style && style}>{data.content}</OverFlowContent>
    }
  </ListItem>
);

AccordionItem.propTypes = {
  id: PropTypes.number,
  onChange: PropTypes.func,
  // prevMenu: PropTypes.instanceOf(Array),
  data: PropTypes.instanceOf(Object),
  style: PropTypes.oneOfType([PropTypes.any]),
};

AccordionItem.defaultProps = {
  id: 0,
  onChange: null,
  // prevMenu: [],
  data: {},
  style: null,
};

export default AccordionItem;
