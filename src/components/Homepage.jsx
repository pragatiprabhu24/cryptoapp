import React, { useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { getCryptoInfo } from "../context/slice/CryptoSlice";
import { useDispatch, useSelector } from "react-redux";
import CryptoCurrencies from "./CryptoCurrencies";
import News from "./News";
import { Spin } from 'antd';

const { Title } = Typography

const Homepage = () => {
    const [spinning, setSpinning] = React.useState(false);
    const dispatch = useDispatch();
    const cryptoinfo = useSelector((state) => state.crypto.cryptoinfo);


    useEffect(() => {
        setSpinning(true);

        dispatch(getCryptoInfo())
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

            <Title level={3} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={cryptoinfo.total} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(cryptoinfo.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(cryptoinfo.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(cryptoinfo.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(cryptoinfo.totalMarkets)} /></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={3} className="home-title">Top 10 Cryptocurrencies in the world</Title>
                <Title level={5} className="show-more"><Link to='/cryptocurrencies'>Show More</Link></Title>
            </div>
            <CryptoCurrencies count={10} />
            <div className="home-heading-container">
                <Title level={3} className="home-title">Latest Crypto News</Title>
                <Title level={5} className="show-more"><Link to='/news'>Show More</Link></Title>
            </div>
            <News count={10} />
        </>
    )
}
export default Homepage;