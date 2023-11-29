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
import { Spin } from 'antd';

const { Title, Text } = Typography

const Singlecrypto = () => {
    const [spinning, setSpinning] = React.useState(false);
    const { uuid } = useParams();
    const dispatch = useDispatch();
    const singlecrypto = useSelector((state) => state.singlecrypto.singlecrypto);
    const crypto_history = useSelector((state) => state.history.crypto_history)

    useEffect(() => {
        setSpinning(true);

        dispatch(getSingleCryptoInfo(uuid))
        dispatch(getCryptoHistory({ uuid }))
            .then(() => {
                setSpinning(false);
            })
            .catch((error) => {
                console.error("Error fetching crypto info:", error);
                setSpinning(false);
            });
    }, [dispatch, uuid]);




    const stats = [
        { title: 'Price to USD', value: `$ ${singlecrypto?.allTimeHigh?.price && millify(singlecrypto?.allTimeHigh?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: singlecrypto?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${singlecrypto['24hVolume'] && millify(singlecrypto['24hVolume'])}`, icon: <ThunderboltOutlined /> },
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
            <Spin spinning={spinning} fullscreen />

            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Title level={2} className="coin-name" style={{ color: `${singlecrypto?.color}` }}>
                        {singlecrypto?.name} ({singlecrypto?.symbol}) Price
                    </Title>
                    <p>{singlecrypto?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
                </Col>

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
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
                            <img src={singlecrypto?.iconUrl} style={{ width: '100px' }} />
                        </div>
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