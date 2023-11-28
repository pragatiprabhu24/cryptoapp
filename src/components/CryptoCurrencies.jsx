import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

const CryptoCurrencies = ({ count }) => {
    const dispatch = useDispatch();
    const cryptos = useSelector((state) => state.crypto.cryptos);
    const loading = useSelector((state) => state.crypto.loading);
    const error = useSelector((state) => state.crypto.error);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        const filteredResults = cryptos.filter((crypto) =>
            crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredResults)
    }, [searchTerm, cryptos]);

    console.log(cryptos);
    return (
        <>
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