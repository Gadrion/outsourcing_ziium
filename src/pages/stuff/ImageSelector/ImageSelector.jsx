/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { func } from 'prop-types';

import {
  ThumbStyled, ThumbInner, ImageStyled, ThumbRootStlyed,
} from './ImageSelectorStyled';

const thumbs = files => files.map(file => (
  <ThumbStyled key={file.name}>
    <ThumbInner>
      <ImageStyled src={file.preview} />
    </ThumbInner>
  </ThumbStyled>
));


const ImageSelector = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const images = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
      }));
      onChange(images);
      setFiles(images);
    },
  });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>파일 선택</p>
      </div>
      <ThumbRootStlyed>{thumbs(files)}</ThumbRootStlyed>
    </section>
  );
};

ImageSelector.defaultProps = {
  onChange: () => { },
};

ImageSelector.propTypes = {
  onChange: func,
};

export default ImageSelector;
