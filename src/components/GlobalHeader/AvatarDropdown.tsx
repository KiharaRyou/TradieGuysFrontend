import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Badge, Menu, Space } from 'antd';
import React from 'react';
import type { ConnectProps } from 'umi';
import { Link, history, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import MenuItem from 'antd/lib/menu/MenuItem';

export type GlobalHeaderRightProps = {
  currentUser?: CurrentUser;
  menu?: boolean;
} & Partial<ConnectProps>;

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'user/logout',
        });
      }

      return;
    }

    history.push(`/${key}`);
  };

  render(): React.ReactNode {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
      cartCount
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="dashboard">
            <UserOutlined />
            Dashboard
          </Menu.Item>
        )}
        {/* {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )} */}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          Log out
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.username ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <Space className={`${styles.action} ${styles.account}`}>
          <Badge count={cartCount} size="small"><ShoppingCartOutlined style={{fontSize: '22px'}}/></Badge>
          <span className={`${styles.name} anticon`}>{currentUser.username}</span>
        </Space>
      </HeaderDropdown>
    ) : (
      <Space className={`${styles.action} ${styles.account}`}>
        <Button><Link to="/user/register">Sign up</Link></Button>
        <Button><Link to="/user/login">Login</Link></Button>
      </Space>
    );
  }
}

export default connect(({ user, global }: ConnectState) => ({
  currentUser: user.currentUser,
  cartCount: global.cart.length
}))(AvatarDropdown);
