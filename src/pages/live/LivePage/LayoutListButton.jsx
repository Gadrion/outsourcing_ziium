import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  LayoutItemsWrapperStyled,
  LayoutIconStyled,
  LayoutButtonStyled,
} from './LivePageStyled';

class LayoutListButton extends PureComponent {
  render() {
    const {
      onClickLayoutListCtrlButton,
      addingNewLayoutList,
      selectedLayoutListItem,
    } = this.props;

    const disableItem = (
      ((selectedLayoutListItem.length === 0 || selectedLayoutListItem.id === 'defaultLayout')
        && addingNewLayoutList !== true
      ) && true);
    return (
      <LayoutItemsWrapperStyled>
        {addingNewLayoutList
          ? (
            <LayoutButtonStyled // disable
              className={classNames({ disableItem: addingNewLayoutList })}
            >
              <LayoutIconStyled
                className="wni wni-add"
              />
            </LayoutButtonStyled>
          ) : (
            <LayoutButtonStyled // enable
              onClick={onClickLayoutListCtrlButton('Add')}
            >
              <LayoutIconStyled
                className="wni wni-add"
              />
            </LayoutButtonStyled>
          )
        }
        {disableItem
          ? (
            <React.Fragment>
              <LayoutButtonStyled // disable
                className={classNames({ disableItem })}
              >
                <LayoutIconStyled
                  className="wni wni-save"
                />
              </LayoutButtonStyled>
              <LayoutButtonStyled // display none
                className={classNames({ displayNone: disableItem })}
              >
                <LayoutIconStyled
                  className="wni wni-edit"
                />
              </LayoutButtonStyled>
              <LayoutButtonStyled // display none
                className={classNames({ displayNone: disableItem })}
              >
                <LayoutIconStyled
                  className="wni wni-close"
                />
              </LayoutButtonStyled>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {addingNewLayoutList
                ? (
                  <React.Fragment>
                    <LayoutButtonStyled // enalbe
                      onClick={onClickLayoutListCtrlButton('Save')}
                    >
                      <LayoutIconStyled
                        className="wni wni-save"
                      />
                    </LayoutButtonStyled>
                    <LayoutButtonStyled // disable
                      className={classNames({ disableItem: addingNewLayoutList })}
                    >
                      <LayoutIconStyled
                        className="wni wni-edit"
                      />
                    </LayoutButtonStyled>
                    <LayoutButtonStyled // disable
                      className={classNames({ disableItem: addingNewLayoutList })}
                    >
                      <LayoutIconStyled
                        className="wni wni-close"
                      />
                    </LayoutButtonStyled>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <LayoutButtonStyled // disable
                      className={classNames({ disableItem: !addingNewLayoutList })}
                    >
                      <LayoutIconStyled
                        className="wni wni-save"
                      />
                    </LayoutButtonStyled>
                    <LayoutButtonStyled // enalbe
                      onClick={onClickLayoutListCtrlButton('Edit')}
                    >
                      <LayoutIconStyled
                        className="wni wni-edit"
                      />
                    </LayoutButtonStyled>
                    <LayoutButtonStyled // enalbe
                      onClick={onClickLayoutListCtrlButton('Delete')}
                    >
                      <LayoutIconStyled
                        className="wni wni-close"
                      />
                    </LayoutButtonStyled>
                  </React.Fragment>
                )
              }
            </React.Fragment>
          )
        }
      </LayoutItemsWrapperStyled>
    );
  }
}

LayoutListButton.propTypes = {
  onClickLayoutListCtrlButton: PropTypes.func.isRequired,
  addingNewLayoutList: PropTypes.bool.isRequired,
  selectedLayoutListItem: PropTypes.instanceOf(Object),
};

LayoutListButton.defaultProps = {
  selectedLayoutListItem: [],
};

export default LayoutListButton;
