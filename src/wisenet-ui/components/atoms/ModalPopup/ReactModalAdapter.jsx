import React from 'react';
import ReactModal from 'react-modal';

const ReactModalAdapter = ({ className, ...props }) => {
  ReactModal.setAppElement('body');
  return (
    <ReactModal
      portalClassName={className}
      {...props}
    />
  )
};

export default ReactModalAdapter;
