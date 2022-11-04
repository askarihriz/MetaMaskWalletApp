import React, { useState } from 'react';
import { Typography, Button } from 'antd';
import { Product } from '../../actions';
import { CartContext } from '../../contexts';
import CheckoutModal from './Checkout/CheckoutModal';
import { ethers } from "ethers";
import {contractAddress, contractABI} from "../../helpers/constant";

const { Title, Text } = Typography;

interface OrderSummaryProps {
  cartProducts: Product[];
  totalItems: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartProducts,
  totalItems,
}) => {
  const { totalPrice } = React.useContext(CartContext);
  const [modalVisibility, setModalVisibility] = useState(false);

  const Widthdraw = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log(provider, signer, transactionContract);

    if (!window.ethereum) {
      return alert("Please Install MetaMask");
    }

    const parsedAmount = ethers.utils.parseEther(totalPrice.toString());

    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: '0xeFB39f3329A08fD6D04e3AEd9269372519dFF266',
        to: '0xE7F401cE7Da8fA833452F2DC04BDAF35A1335708',
        gas: '0x5208',
        value: parsedAmount._hex,
      }]
    });

    const transactionHash = transactionContract.addToBlockChain("0xE7F401cE7Da8fA833452F2DC04BDAF35A1335708", parsedAmount, "Hello world", "test");
  }

  return (
    <div className="order-summary">
      <Title level={3}>Order Summary</Title>
      <div>
        <Text type="secondary">Total</Text>
        <Text disabled={cartProducts.length === 0}>₱{Number(totalPrice)}</Text>
      </div>
      <Button
        type="primary"
        size="large"
        disabled={cartProducts.length === 0 || totalItems === 0}
        onClick={() => {setModalVisibility(true);
        Widthdraw()}}
      >
        CHECKOUT
      </Button>
      <CheckoutModal
        visible={modalVisibility}
        hideModal={() => setModalVisibility(false)}
      />
    </div>
  );
};

export default OrderSummary;
