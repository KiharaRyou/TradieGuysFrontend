import React, { useEffect, useState } from 'react';
import { Descriptions, Button, Divider, Row, Col, Card, List } from 'antd';
import { useParams, connect, history } from 'umi';
import useAPI from '@/components/UseAPI';
import request from '@/utils/request';

const CouponDetail: React.FC = (props) => {

  const { dispatch } = props

  const params = useParams();
  const [currentCoupon, setCurrentCoupon] = useState({})
  const [similarCoupons, setSimilarCoupons] = useState([])
  const [loading, setLoading] = useState(false)
  const id = params.id;
  
  const apis = useAPI({url: `/api/coupons/`});

  useEffect(async () => {
    setLoading(true);
    const item = await apis.getDetail(id);
    await setCurrentCoupon(item);
    const similarCoupons = await request(`/api/coupons/similar/?id=${id}&parent=${item.parent}`)
    setSimilarCoupons(similarCoupons.results);
    setLoading(false)

  }, [])

  return <Row gutter={12}>
    <Col span="6">AD</Col>
    <Col style={{border: '1px solid #DDD'}} xs={{span: 24}} lg={{span: 12}}>
      <Descriptions title="Coupon Detail" bordered column={2}>
        <Descriptions.Item label="Coupon Image">
          <img src={currentCoupon.image} alt={currentCoupon.title} width="100%"/>
        </Descriptions.Item>
        <Descriptions.Item label="Title">{currentCoupon.title}</Descriptions.Item>
        <Descriptions.Item label="Status">{currentCoupon.is_active ? 'Selling' : 'Sold Out'}</Descriptions.Item>
        <Descriptions.Item label="Price">${currentCoupon.price}</Descriptions.Item>
        <Descriptions.Item label="Description" span={4}>{currentCoupon.description}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Button type="primary" block style={{height: '50px'}} onClick={async () => {
        if (dispatch) {
          const result = await dispatch({
            type: 'global/addToCart',
            payload: currentCoupon,
          });
          if(result !== false)
          history.push('/cart');
      }
      }}>
        Add to Cart
      </Button>
    </Col>
    <Col span="6">AD</Col>
    <Divider />
    <Row>Similar Coupons:</Row>
    <Row>
    <List
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 5,
            xl: 5,
            xxl: 5,
          }}
          dataSource={similarCoupons}
          renderItem={(item) => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    onClick={() => history.push(`/coupons/${item.id}`)}
                    cover= {<img alt={item.title} src={item.image} />}
                  >
                    <Card.Meta
                      title={<a>{item.title}</a>}
                      description={
                          <div>${item.price}</div>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }
          }}
        />
    </Row>
</Row> 
  
  
}

export default connect()(CouponDetail);