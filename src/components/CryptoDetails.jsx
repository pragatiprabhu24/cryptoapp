import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import { getSingleCryptoInfo } from "../context/slice/SingleCryptoSlice";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import { getCryptoHistory } from "../context/slice/CryptoHistorySlice";


const { Title, Text } = Typography
const { Option } = Select

const Singlecrypto = () => {
    const [timeperiod, setTimeperiod] = useState('7d');
    const { uuid } = useParams();
    const dispatch = useDispatch();
    const singlecrypto = useSelector((state) => state.singlecrypto.singlecrypto);
    const crypto_history = useSelector((state) => state.history.crypto_history)

    useEffect(() => {
        dispatch(getSingleCryptoInfo(uuid))
        dispatch(getCryptoHistory(uuid, timeperiod))
    }, [uuid, timeperiod])

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${singlecrypto?.allTimeHigh?.price && millify(singlecrypto?.allTimeHigh?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: singlecrypto?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${singlecrypto?.h24Volume && millify(singlecrypto?.h24Volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${singlecrypto?.marketCap && millify(singlecrypto?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(singlecrypto?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: singlecrypto?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: singlecrypto?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: singlecrypto?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(singlecrypto?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(singlecrypto?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];
    return (
        <>
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Title level={2} className="coin-name" style={{ color: `${singlecrypto?.color}` }}>
                        {singlecrypto?.name} ({singlecrypto?.symbol}) Price
                    </Title>
                    <p>{singlecrypto?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
                </Col>
                <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
                    {time.map((date) => <Option key={date}>{date}</Option>)}
                </Select>
                <LineChart coinHistory={crypto_history} currentPrice={millify(singlecrypto?.price)} coinName={singlecrypto?.name} />
                <Col className="stats-container">
                    <Col className="coin-value-statistics">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">{singlecrypto?.name} Value Statistics</Title>
                            <p>An overview showing the statistics of {singlecrypto?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </Col>
                        {stats.map(({ icon, title, value }) => (
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                    <Col className="other-stats-info">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                            <p>An overview showing the statistics of {singlecrypto?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </Col>
                        {genericStats.map(({ icon, title, value }) => (
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className="coin-desc-link">
                    <div className="coin-desc">
                        <Title level={3} className="coin-details-heading">What is {singlecrypto?.name}?</Title>
                        {singlecrypto?.description}
                     
                    </div>
                    <Col className="coin-links">
                        <Title level={3} className="coin-details-heading">{singlecrypto?.name} Links</Title>
                        {singlecrypto?.links?.map((link) => (
                            <Row className="coin-link" key={link.name}>
                                <Title level={5} className="link-name">{link.type}</Title>
                                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                            </Row>
                        ))}
                    </Col>
                </Col>
            </Col>
        </>
    )
}
export default Singlecrypto;