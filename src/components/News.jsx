import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";
import { getCryptoNews } from "../context/slice/NewsSlice";
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"

const News = ({ count }) => {

    const dispatch = useDispatch();
    const news = useSelector((state) => state.news.news);
    const loading = useSelector((state) => state.news.loading);
    const error = useSelector((state) => state.news.error);
    const cryptos = useSelector((state) => state.crypto.cryptos);

    useEffect(() => {
        dispatch(getCryptoNews());
    }, []);
    console.log(news);
    return (
        <>
            <Row gutter={[24, 24]}>
                {news.slice(0, count).map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>
                                        {news.title}
                                    </Title>
                                    <img src={news.thumbnail || demoImage} alt="" />
                                </div>
                                <p>
                                    {
                                        news.description > 100 ? `${news.description.substring(0, 100)}...`
                                            : news.description
                                    }
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Text>{moment(news.date).startOf('ss').fromNow()}</Text>
                                    </div>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}
export default News;