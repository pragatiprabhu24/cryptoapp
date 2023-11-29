import React, { useEffect } from 'react';
import millify from 'millify';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { getExchanges } from '../context/slice/ExchangeSlice';
import { Spin } from 'antd';


const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const [spinning, setSpinning] = React.useState(false);
  const dispatch = useDispatch()
  const exchanges = useSelector((state) => state.exchange.exchanges)

  useEffect(() => {
    setSpinning(true);

    dispatch(getExchanges())
      .then(() => {
        setSpinning(false);
      })
      .catch((error) => {
        console.error("Error fetching crypto info:", error);
        setSpinning(false);
      });
  }, [dispatch]);

  return (
    <>
      <Spin spinning={spinning} fullscreen />

      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Price</Col>
      </Row>
      <Row>
        {exchanges.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.price)}</Col>
                  </Row>
                )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;


