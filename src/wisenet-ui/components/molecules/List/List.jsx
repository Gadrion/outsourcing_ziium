import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'wisenet-ui/components/atoms';
import { ListStyled, ListItemStyled } from './ListStyled';

class List extends React.PureComponent {
  render() {
    const {
      data, vertical, handleClick,
    } = this.props;

    const handleClickEvent = e => {
      const selectIndex = e.index;

      handleClick({ index: selectIndex, key: e.key, data: data[selectIndex] });
    };

    const items = data.map((itemContent, index) => (
      <ListItemStyled
        key={itemContent.key || `${index.toString()}`}
      >
        <ListItem
          index={index}
          key={itemContent.key}
          onChange={handleClickEvent}
        >
          {itemContent}
        </ListItem>
      </ListItemStyled>
    ));

    return (
      <ListStyled horizonal={!vertical}>
        {items}
      </ListStyled>
    );
  }
}

List.defaultProps = {
  vertical: true,
  handleClick: () => {},
};

List.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  vertical: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default List;
