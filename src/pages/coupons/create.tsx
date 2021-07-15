import React, { useRef, useState } from 'react';
import { history } from 'umi';
import useAPI from '@/components/UseAPI';
import CouponForm from './CouponForm';

const CreateCoupon: React.FC = (props) => {


  const apis = useAPI({url: `/api/coupons/`});

  return <div>
    <CouponForm
          onSubmit={values => {
            apis.create(values, () => {
              history.replace({
                pathname: '/dashboard/coupons',
                })
            })
          }}
        />
  </div>
}

export default CreateCoupon;