import React, { useEffect, useState, useRef } from 'react';
import { history, useParams } from 'umi';
import useAPI from '@/components/UseAPI';
import CouponForm from './CouponForm';

const UpdateCoupon: React.FC = (props) => {
  const params = useParams();
  const id = params.id;
  const formRef = useRef();

  const apis = useAPI({url: `/api/coupons/`});

  useEffect(async () => {
    const item = await apis.getDetail(id);
    formRef.current.setFieldsValue(item);
  }, [])

  return <div>
    <CouponForm
          ref={formRef}
          onSubmit={values => {
            apis.update(id, values, () => {
              history.replace({
                pathname: '/dashboard/coupons',
                })
            })
          }}
        />
  </div>
}

export default UpdateCoupon;