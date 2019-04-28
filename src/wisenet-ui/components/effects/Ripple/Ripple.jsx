import React from 'react';
import PropTypes from 'prop-types';
import { RippleStyled, ChildrenStyled } from './RippleStyled';

class Ripple extends React.PureComponent {
  addRippleSub = e => {
    const { left, top } = this.ripple.getBoundingClientRect();

    const circle = document.createElement('span');
    circle.className = 'js-ripple-circle';
    circle.style.left = `${e.pageX - left}px`;
    circle.style.top = `${e.pageY - top}px`;

    this.ripple.appendChild(circle);

    setTimeout(() => circle.remove(), 550);
  }

  render() {
    const {
      children,
      disabled,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        <RippleStyled
          ref={elem => { this.ripple = elem; }}
          onClick={disabled ? undefined : this.addRippleSub}
          {...rest}
        />
        <ChildrenStyled>
          {children}
        </ChildrenStyled>
      </React.Fragment>
    );
  }
}

Ripple.defaultProps = {
  children: null,
  disabled: false,
};

Ripple.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  disabled: PropTypes.bool,
};

export default Ripple;
