import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";
import { getCryptoNews } from "../context/slice/NewsSlice";
import { Spin } from 'antd';


const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 1000)}`;

const News = ({ count }) => {
    const [spinning, setSpinning] = React.useState(false);
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news.news);


    useEffect(() => {
        setSpinning(true);

        dispatch(getCryptoNews())
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
                                            : news.description || "Description Not available"
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