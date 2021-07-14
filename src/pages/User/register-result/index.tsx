import { Button, Result } from 'antd';
import type { IRouteProps } from 'umi';
import { FormattedMessage, formatMessage, Link } from 'umi';
import React from 'react';

import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large">
        Go to Login
      </Button>
    </Link>
  </div>
);

const RegisterResult: React.FC<IRouteProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        Successfully registered.
      </div>
    }
    extra={actions}
  />
);

export default RegisterResult;
