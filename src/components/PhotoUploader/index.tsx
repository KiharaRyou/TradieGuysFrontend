import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import useMergedState from 'rc-util/es/hooks/useMergedState';

export type PhotoUploaderProps = {
  defaultImage: string;
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  return isJpgOrPng;
}
  
const PhotoUploader: React.FC<PhotoUploaderProps> = (props) => {

  const {
    defaultImage,
    ...restProps
  } = props;
  
  const [loading, setLoading] = useMergedState<boolean>(false, {value: false});

  const [imageUrl, setImageUrl] = useMergedState<string | undefined>(defaultImage, {value: defaultImage ? defaultImage : undefined});

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setImageUrl(imageUrl);
        setLoading(false)
      },
      );
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="api/images/uploadimage/"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="image" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
}

export default PhotoUploader;