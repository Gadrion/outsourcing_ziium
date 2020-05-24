/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { func, instanceOf } from 'prop-types';
import { ButtonGroup, Button } from '@material-ui/core';

import {
  ThumbStyled, ThumbInner, ImageStyled, ThumbRootStlyed,
} from './ImageSelectorStyled';

const ImageSelector = ({ files, onChange }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const images = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
      }));
      onChange(images);
    },
  });

  const swap = (index1, index2) => () => {
    const tempFiles = files;
    const temp = tempFiles[index1];
    tempFiles[index1] = files[index2];
    tempFiles[index2] = temp;
    onChange([...tempFiles]);
  };

  const onDelete = index => () => {
    files.splice(index, 1);
    onChange([...files]);
  };

  useEffect(() => () => () => (
    files.forEach(file => URL.revokeObjectURL(file.preview))
  ), [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>파일 선택</p>
      </div>
      <ThumbRootStlyed>
        {files.map((file, index) => (
          <ThumbStyled key={file.name}>
            <ThumbInner>
              <div><ImageStyled src={file.preview} /></div>
              <div>
                <ButtonGroup orientation="vertical" color="default" variant="contained" fullWidth>
                  <Button onClick={onDelete(index)}>삭제</Button>
                  <Button onClick={swap(index, 0)} disabled={index === 0}>맨위</Button>
                  <Button onClick={swap(index, index - 1)} disabled={index === 0}>위</Button>
                  <Button onClick={swap(index, index + 1)} disabled={index === files.length - 1}>
                    아래
                  </Button>
                  <Button
                    onClick={swap(index, files.length - 1)}
                    disabled={index === files.length - 1}
                  >
                    맨밑
                  </Button>
                </ButtonGroup>
              </div>
            </ThumbInner>
          </ThumbStyled>
        ))}
      </ThumbRootStlyed>
    </section>
  );
};

ImageSelector.defaultProps = {
  onChange: () => { },
  files: [],
};

ImageSelector.propTypes = {
  onChange: func,
  files: instanceOf(Object),
};

export default ImageSelector;
