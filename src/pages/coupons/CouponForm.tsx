import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Select,Button, Upload, InputNumber } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import request from '@/utils/request';

const CouponForm = forwardRef((props, ref) => {
  const { onSubmit } = props;

  const [imageUrl, setImageUrl] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const normFile = (e: any) => {
    if (e.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (e.file.status === 'done') {
      const url = e.file.response.url
      setImageUrl(url);
      setLoading(true);
      return url;
    }
  }; 

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const formRef = useRef();
  
  useImperativeHandle(ref, () => ({
    setFieldsValue: values => {
      formRef.current.setFieldsValue(values)
      if(values && values.image)setImageUrl(values.image)
    }
  }));

  useEffect(() => {
    request('/api/categories/active/').then(res => {
      if(res && res.status === 'OK') {
        setCategories(res.results);
      }  
    })
  }, [])
  return (<>
        <Form<{
          title: string;
          is_active: string;
        }>
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          ref={formRef}
          onFinish={values => onSubmit(values)}
        >
          <Form.Item
            name="image"
            label="image"
            valuePropName="url"
            getValueFromEvent={normFile}
            rules={[{ required: true }]}
          >
              <Upload
                listType="picture-card"
                showUploadList={false}
                action="/api/images/uploadimage/"
              >
                {imageUrl ? <img src={imageUrl} alt="image" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
          </Form.Item>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Category" name="parent">
            <Select>
              {categories.map(item => 
                <Select.Option value={item.id}>{item.title}</Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
      </Form.Item>
            
        </Form>
    </>
  );
});

export default CouponForm;