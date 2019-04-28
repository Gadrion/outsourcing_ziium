import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import LogoBig from 'util/static/images/wisenet_logo.svg';
// import LogoSmall from 'util/static/images/wisenet_logo_sm.svg';
// import LogoBigComp from 'util/static/images/wisenet_logo';
// import LogoSmallComp from 'util/static/images/wisenet_logo_sm';
import styles from './Logo.scss';

const cx = classNames.bind(styles);

const Logo = ({
  // alt,
  small,
  className,
  // ...rest
}) => (
  <Link
    to="/"
    className={`
      ${
        cx('logo', {
          small,
        })
      } 
      ${className}
    `}
  >
    {/* <img
      src={small ? LogoSmall : LogoBig}
      alt={alt}
      {...rest}
    /> */}

    {/* {small ? <LogoSmallComp {...rest} /> : <LogoBigComp {...rest} />} */}

    {/* <object type="image/svg+xml" data={small ? LogoSmall : LogoBig}> Logo</object> */}
    <img src={LogoBig} alt="fireSpot" />
  </Link>
);

Logo.defaultProps = {
  // alt: 'WISENET',
  small: false,
  className: '',
};

Logo.propTypes = {
  // alt: PropTypes.string,
  small: PropTypes.bool,
  className: PropTypes.string,
};

export default Logo;
