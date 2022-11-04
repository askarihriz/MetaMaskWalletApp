import React, { useState } from 'react';
import Link from 'next/link';
import { Layout, Row, Col, Badge } from 'antd';
import { ShoppingCartOutlined, GithubOutlined } from '@ant-design/icons';
import { useCartSelector } from '../../../selectors';
import './MainNav.less';
import { ethers } from "ethers";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../reducers';
import { UPDATE_ADDRESS, UPDATE_BALANCE } from '../../../reducers/wallet_information';

const { Header } = Layout;

const MainNav = () => {
  const dispatch = useDispatch();
  const { totalItems } = useCartSelector();
  const [balance, setBalance] = useState<number>(0);
  const wallet = useSelector((state: AppState)=>state.wallet);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({method: "eth_requestAccounts"}).then( result => { window.ethereum.request({method: "eth_getBalance", params: [result[0], 'latest']}).then((balance) => {dispatch(UPDATE_BALANCE(ethers.utils.formatEther(balance)))}) })
    }
    else {
      alert("Install Metamask")
    }
  }



  return (
    <Header className="main-nav">
      <Row justify="space-between">
        <Col span={2}>
          <div className="left-nav-items">
            
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
        </Col>
          <button onClick={connectWallet}>Connect Wallet</button>
          <h1>Balance: {wallet.balance} ETH</h1>
        <Col span={16} style={{ textAlign: 'right' }}>
          <Link href="/cart">
            <div>
              <Badge
                count={totalItems}
                style={{
                  backgroundColor: '#fff',
                  color: '#999',
                  boxShadow: '0 0 0 1px #d9d9d9 inset',
                }}
              >
                <ShoppingCartOutlined
                  style={{ fontSize: 25, cursor: 'pointer' }}
                />
              </Badge>
            </div>
          </Link>
        </Col>
      </Row>
    </Header>
  );
};

export default MainNav;
