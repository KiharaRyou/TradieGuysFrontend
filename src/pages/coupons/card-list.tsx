import React, {useEffect, useState} from 'react';
import { history, connect, } from 'umi';
import { Button, Card, List, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import request from '@/utils/request';
import styles from './card-list.less';

const { Paragraph } = Typography;

const CardList = (props) => {
  const {dispatch} = props;
  const [loading, setLoading] = useState(false);  
  const [data, setData] = useState([]);

  useEffect(async () => {
      setLoading(true);
      const res = await request('/api/coupons/active');
      setLoading(false);
      if(res && res.results) {
        setData(res.results)
      }
  }, [])

//   const content = (
//     <div className={styles.pageHeaderContent}>
//       <p>
//         段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
//         提供跨越设计与开发的体验解决方案。
//       </p>
//       <div className={styles.contentLink}>
//         <a>
//           <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
//           快速开始
//         </a>
//         <a>
//           <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
//           产品简介
//         </a>
//         <a>
//           <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
//           产品文档
//         </a>
//       </div>
//     </div>
//   );

//   const extraContent = (
//     <div className={styles.extraImg}>
//       <img
//         alt="这是一个标题"
//         src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
//       />
//     </div>
//   );
  return (
    // <PageContainer content={content} extraContent={extraContent}>
    <PageContainer>
      <div className={styles.cardList}>
        <List
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(item) => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    onClick={() => history.push(`/coupons/${item.id}`)}
                    hoverable
                    className={styles.card}
                    cover= {<img alt={item.title} src={item.image} />}
                  >
                    <Card.Meta
                      title={<a>{item.title}</a>}
                      description={
                        <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                          <div>{item.description}</div>
                          <div>${item.price}</div>
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }
          }}
        />
      </div>
    </PageContainer>
  );
};

export default connect()(CardList);