import React from 'react';
import PropTypes from 'prop-types';

const WisenetLogoSm = ({ width, ...rest }) => (
  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" width={width} height="21" viewBox="0 0 24 21">
    <path
      fill="#4F4F51"
      d="M12.125,9.31l1.732,7.461c0.287,1.254,1.422,1.389,1.896,1.389h1.66L13.977,3.446 c-0.078-0.377-0.244-0.458-0.521-0.472h-2.718c-0.279,0.013-0.439,0.171-0.487,0.467c-0.102,0.443-2.477,10.728-2.501,10.831 c-0.028,0.117-0.063,0.264-0.197,0.264c-0.098,0-0.172-0.096-0.204-0.26c-0.021-0.121-2.056-10.99-2.056-10.99 C5.211,2.937,5.061,2.868,4.846,2.868h-2.75c-0.086,0-0.207,0.019-0.285,0.114c-0.079,0.095-0.1,0.245-0.064,0.434l2.497,12.876 c0.222,1.241,0.987,1.868,2.276,1.868h2.095c1.008,0,1.642-0.586,1.886-1.741L12.125,9.31z"
    />
    <path
      fill="#F47524"
      d="M21.505,3.334l-2.583,9.312L16.786,3.34c-0.063-0.275,0.114-0.5,0.399-0.5h3.943 C21.413,2.839,21.581,3.061,21.505,3.334"
    />
  </svg>
);

WisenetLogoSm.defaultProps = {
  width: '24px',
};

WisenetLogoSm.propTypes = {
  width: PropTypes.string,
};

export default WisenetLogoSm;
