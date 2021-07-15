import React, { useRef, useState } from 'react';
import { Button, Tag, Space } from 'antd'; 
import useAPI  from '@/components/UseAPI';
import { Link } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable  from '@ant-design/pro-table';

type CouponManagementProps = {}

type CouponItem = {
  title: string;
  is_active: boolean;
};

const CouponManagement: React.FC<CouponManagementProps> = (props) => {
  const [editingRow, setEditingRow] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const apis = useAPI({url: `/api/coupons/`});
  const actionRef = useRef<ActionType>();
  const formRef = useRef();

  const columns: ProColumns<CouponItem>[] = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (_, record) => (
        <div>
          <img src={record.image} />
        </div>
      ),
    },
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
      title: 'Price',
      dataIndex: 'price',
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
        <Link to={`/dashboard/coupons/${record.id}`}><Button
        type="primary"
        >
          Edit
        </Button></Link>
      ],
    },
  ]

  return <div>
    <ProTable<CouponItem>
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
      headerTitle="Coupons"
      toolBarRender={() => [<Link to="/dashboard/coupons/create"><Button type="primary">
      Create
    </Button></Link>]}
    />
     {/* <Modal title="Coupon" visible={isModalVisible} footer={null} onCancel={handleCancel} forceRender>
        <CouponFrom
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
     </Modal> */}
     
  </div>
}

export default CouponManagement;