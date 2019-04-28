import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import tilePTZControlType from 'wisenet-ui/util/static/constants/mediaControl/tilePTZControlType';
import classNames from 'classnames';
import {
  TilePTZDirectionWrapperStyled,
  TilePTZDirectionDivStyled,
  IconButtonStyled,
  ArrowIcon,
  TilePTZPointerStyled,
} from './TilePTZDirectionControlStyled';

class TilePTZDirectionControl extends PureComponent {
  state = { isOpen: false };

  onMouseOver = type => {
    switch (type) {
      case 'enter':
        this.setState({
          isOpen: true,
        });
        break;
      case 'leave':
        this.setState({
          isOpen: false,
        });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      onMouseDown,
      onMouseUp,
      className,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    const {
      TOP_LEFT,
      TOP,
      TOP_RIGHT,
      RIGHT,
      BOTTOM_RIGHT,
      BOTTOM,
      BOTTOM_LEFT,
      LEFT,
    } = tilePTZControlType;

    const degs = [0, 90, 180, 270];

    const ptzDirectionItems = [
      {
        clickId: TOP_LEFT,
        deg: degs[0],
      },
      {
        clickId: TOP,
        deg: degs[0],
      },
      {
        clickId: TOP_RIGHT,
        deg: degs[1],
      },
      {
        clickId: LEFT,
        deg: degs[3],
      },
      {
        clickId: 'middle',
      },
      {
        clickId: RIGHT,
        deg: degs[1],
      },
      {
        clickId: BOTTOM_LEFT,
        deg: degs[3],
      },
      {
        clickId: BOTTOM,
        deg: degs[2],
      },
      {
        clickId: BOTTOM_RIGHT,
        deg: degs[2],
      },
    ];

    return (
      <React.Fragment>
        <TilePTZPointerStyled
          onMouseEnter={() => this.onMouseOver('enter')}
        >
          <i className="wni wni-add" style={{ display: !isOpen && 'none' }} />
        </TilePTZPointerStyled>
        {
          isOpen && (
          <TilePTZDirectionWrapperStyled
            className={className}
            onMouseLeave={() => this.onMouseOver('leave')}
          >
            {ptzDirectionItems.map((item, index) => {
              const makeComponent = index !== 4
                ? (
                  <IconButtonStyled
                    onMouseDown={onMouseDown(item.clickId)}
                    onMouseUp={onMouseUp(item.clickId)}
                    onDoubleClick={e => e.stopPropagation()}
                  >
                    <ArrowIcon
                      deg={item.deg}
                      className={`${classNames({ [index % 2 === 1 ? 'normal' : 'diagonal']: true })}`}
                    />
                  </IconButtonStyled>
                ) : (
                  null
                );
              return (
                <TilePTZDirectionDivStyled key={item.clickId}>
                  {makeComponent}
                </TilePTZDirectionDivStyled>
              );
            })}
          </TilePTZDirectionWrapperStyled>
          )
        }
      </React.Fragment>
    );
  }
}

TilePTZDirectionControl.defaultProps = {
  onMouseDown: () => {},
  onMouseUp: () => {},
  className: null,
};

TilePTZDirectionControl.propTypes = {
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default TilePTZDirectionControl;
