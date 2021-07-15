import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Select,Button } from 'antd';

const CategoryForm = forwardRef((props, ref) => {
  const { onSubmit } = props;

  const formRef = useRef();
  
  useImperativeHandle(ref, () => ({
    setFieldsValue: values => {
      formRef.current.setFieldsValue(values)
    }
  }));

  return (
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
          <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Is_active" name="is_active" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="True">Yes</Select.Option>
              <Select.Option value="False">No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
      </Form.Item>
            
        </Form>
  );
});

export default CategoryForm;