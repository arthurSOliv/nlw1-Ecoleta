import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const file_url = URL.createObjectURL(file)
        setSelectedFileUrl(file_url);
        onFileUploaded(file);
    }, [onFileUploaded])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/jpeg, image/png'})

    return (
        <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} accept="image/jpeg"/>
        {
            selectedFileUrl
                ? <img src={selectedFileUrl} alt="Point Thumbail"></img>
                : (
                    isDragActive ?
                    <p>
                        <FiUpload />
                        Imagem do estabelecimento
                    </p> :
                    <p>
                        <FiUpload />
                        Arraste ou clique para adicionar a imagem do estabelecimento
                    </p>
                )
        }
        </div>
    )
}

export default Dropzone;