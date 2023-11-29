import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { Spin } from 'antd';


const CryptoCurrencies = ({ count }) => {
    const [spinning, setSpinning] = React.useState(false);
    const dispatch = useDispatch();
    const cryptos = useSelector((state) => state.crypto.cryptos);
    const loading = useSelector((state) => state.crypto.loading);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setSpinning(true);
    
        try {
            const filteredResults = cryptos.filter((crypto) =>
                crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    
            setFilteredData(filteredResults);
        } catch (error) {
            console.error("Error filtering crypto info:", error);
        } finally {
            setSpinning(false);
        }
    }, [dispatch, searchTerm, cryptos]);

    return (
        <>
            <Spin spinning={loading} fullscreen />

            {!count &&
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            }
            <Row gutter={[32, 32]} className="crypto-card-container">
                {filteredData.slice(0, count).map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.rank}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

        </>
    )
}
export default CryptoCurrencies;