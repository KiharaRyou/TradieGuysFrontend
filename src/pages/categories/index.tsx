import React, { useRef, useState } from 'react';
import { Button, Tag, Space, Modal } from 'antd'; 
import useAPI  from '@/components/UseAPI';
import CategoryFrom from './CategoryForm';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable  from '@ant-design/pro-table';

type CategoryManagementProps = {}

type CategoryItem = {
  title: string;
  is_active: boolean;
};

const CategoryManagement: React.FC<CategoryManagementProps> = (props) => {
  const [editingRow, setEditingRow] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const apis = useAPI({url: `/api/categories/`});
  const actionRef = useRef<ActionType>();
  const formRef = useRef();

  const columns: ProColumns<CategoryItem>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'required',
          },
        ],
      },
    },
    {
      title: 'Is_Active',
      dataIndex: 'is_active',
      valueType: 'select',
      valueEnum: {
        True: { text: 'Yes'},
        False: { text: 'No'},
      },
      render: (_, record) => (
        <Space>
          <Tag color={record.is_active ? 'green' : 'red'}>
              {record.is_active ? 'Yes' : 'No'}
            </Tag>
        </Space>
      ),
    },
    {
      title: 'Option',
      valueType: 'option',
      render: (text, record, _, action) => [
        <Button
        type="primary"
          key="editable"
          onClick={ async () => {
            await setEditingRow(record);
            
            setIsModalVisible(true);
            formRef.current.setFieldsValue({title: record.title, is_active: record.is_active ? 'True' : 'False'});
          }}
          
        >
          Edit
        </Button>
      ],
    },
  ]

  const showModal = () => {
    setIsModalVisible(true);
    formRef.current.setFieldsValue({title: undefined, is_active: 'True'})
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRow(undefined);
  };


  return <div>
    <ProTable<CategoryItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        const data = await apis.read(params);
        return {data: data.results, total: data.count}
      }}
      // editable={{
      //   type: 'multiple',
      //   onSave: async (rowKey, data, row) => {
      //     apis.update(rowKey + '/', {title: data.title, is_active: data.is_active ? 'True' : 'False'})
      //   },
      //   onDelete: async (rowKey) => {
      //     apis.del(rowKey + '/')
      //   },
      //   deletePopconfirmMessage: "Are you sure?"
      // }}
      rowKey="id"
      search={false}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="Category"
      toolBarRender={() => [<Button type="primary" onClick={showModal}>
        Create
      </Button>]}
    />
     <Modal title="Category" visible={isModalVisible} footer={null} onCancel={handleCancel} forceRender>
        <CategoryFrom
          ref={formRef}
          onSubmit={values => {
            if(editingRow && editingRow.id) {
              apis.update(`${editingRow.id}/`, values, () => {
                actionRef.current?.reload();
                  setIsModalVisible(false);
              });
            } else {
              apis.create(values, () => {
                actionRef.current?.reload();
                setIsModalVisible(false);
              })
            }
          }}
        />
     </Modal>
     
  </div>
}

export default CategoryManagement;