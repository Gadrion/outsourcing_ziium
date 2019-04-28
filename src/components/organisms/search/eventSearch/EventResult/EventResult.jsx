import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { Button } from 'wisenet-ui/components/atoms';
import { NewList } from 'wisenet-ui/components/organisms';
import { EventResultContainer } from 'containers/organisms';
import { List } from 'immutable';
import {
  EventResultListContainer,
  EventResultListStyled,
} from './EventResultStyled';

const EventResult = ({
  results,
  onSelectEvent,
  descending,
  onClickViewMore,
  onClickViewAll,
  currentItemIndex,
  isDescending,
}) => {
  const items = (results.length !== 0)
    ? results.map(item => ({
      text: '',
      id: item.Index.toString(),
      data: item || {},
    })).slice(0, currentItemIndex)
    : null;
  if (items && items.length > 0 && isDescending) {
    items.reverse();
  }

  return (
    <EventResultListContainer>
      <Button
        onClick={descending}
        disabled={!(items && items.length)}
      >
        {isDescending ? 'Descending -> Ascending' : 'Ascending -> Descending' }
      </Button>
      {(results.length !== 0 && items) && `
        ${items.length} / ${results.length}
      `}
      {(items && items.length !== 0)
        && (
          <>
            <EventResultListStyled>
              <NewList
                listData={List(items)}
                // handleClick={onSelectEvent}
                useExportOneClickListItem
                exportClickListItem={onSelectEvent}
              />
            </EventResultListStyled>
            <Button
              onClick={onClickViewMore}
              disabled={items.length >= results.length}
            >
              {'More'}
            </Button>
            <Button
              onClick={onClickViewAll}
              disabled={items.length >= results.length}
            >
              {'View all'}
            </Button>
          </>
        )
      }
    </EventResultListContainer>
  );
};

EventResult.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    Type: PropTypes.string,
    StartTime: PropTypes.string,
    EndTime: PropTypes.string,
  })),
  onSelectEvent: PropTypes.func.isRequired,
  descending: PropTypes.func,
  onClickViewMore: PropTypes.func.isRequired,
  onClickViewAll: PropTypes.func.isRequired,
  currentItemIndex: PropTypes.number,
  isDescending: PropTypes.bool.isRequired,
};

EventResult.defaultProps = {
  results: [],
  descending: null,
  currentItemIndex: 10,
};

export default withContainer(EventResultContainer, EventResult);
