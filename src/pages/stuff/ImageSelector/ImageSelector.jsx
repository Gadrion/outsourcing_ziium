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
      const beforeFile = [];
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        switch (file.status) {
          case 'add':
            break;
          default:
            file.status = 'delete';
            beforeFile.push(file);
        }
      }
      const images = acceptedFiles.map(file => ({
        url: URL.createObjectURL(file),
        status: 'add',
        file,
      }));
      onChange([
        ...beforeFile, ...images,
      ]);
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
    const file = files[index];
    if (file.status === 'delete') {
      return;
    }

    if (file.status === 'add') {
      files.splice(index, 1);
    } else {
      file.status = 'delete';
    }
    onChange([...files]);
  };
  useEffect(() => () => () => (
    files.forEach(file => URL.revokeObjectURL(file.url))
  ), [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>파일 선택</p>
      </div>
      <ThumbRootStlyed>
        {files.filter(({ status }) => status !== 'delete').map((file, index) => (
          <ThumbStyled key={file.name}>
            <ThumbInner>
              <div><ImageStyled src={file.url} /></div>
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
