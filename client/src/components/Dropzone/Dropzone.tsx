import React, {FC, useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Iprops {
  selectePropUpload: (file: File) => void
}

const MyDropzone: FC<Iprops> = ({ selectePropUpload }) => {
  const [selectImageUrl, setSelectImageUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const url = URL.createObjectURL(file);

    setSelectImageUrl(url);
    selectePropUpload(file);
  }, [selectePropUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div className="dropzone" { ...getRootProps() }>
      <input { ...getInputProps() } accept='image/*' />

      {
        selectImageUrl ?
        <img src={ selectImageUrl } alt="imageUpload" /> :
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      }
    </div>
  )
}

export default MyDropzone;