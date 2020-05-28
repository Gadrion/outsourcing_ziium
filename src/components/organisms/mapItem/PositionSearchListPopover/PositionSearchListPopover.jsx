import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { PositionSearchListPopoverContainer } from 'containers/organisms';
import Popper from '@material-ui/core/Popper';
import MapIcon from '@material-ui/icons/Map';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ButtonStyled, PositionSearchListContainerStyled } from './PositionSearchListPopoverStyled';

const PositionSearchListPopover = ({
  onClick, setRef, buttonRef, isOpen, positionSearchList, selectedIndex,
}) => {
  return (
    <>
      <ButtonStyled
        ref={setRef}
        variant="outlined"
        onClick={onClick('positionSearchToggle')}
      >
        <MapIcon color='' />
      </ButtonStyled>
      <Popper
        open={isOpen}
        anchorEl={buttonRef}
        placement="bottom-end"
      >
        <PositionSearchListContainerStyled>
          <ListItemText primary='검색결과'></ListItemText>
          <List component="nav" aria-label="main">
            {positionSearchList.map((positionSearch, index) => (
              <ListItem
                button
                selected={selectedIndex === index}
                onClick={() => onClick('selectedIndex')(index)}
              >
                <ListItemText primary={positionSearch.formatted_address}></ListItemText>
              </ListItem>
            ))}
          </List>
        </PositionSearchListContainerStyled>
      </Popper>
    </>
  );
};

PositionSearchListPopover.propTypes = {
  
};

export default withContainer(PositionSearchListPopoverContainer ,PositionSearchListPopover);