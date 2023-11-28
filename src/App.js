import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import { Navbar, Homepage, CryptoCurrencies, CryptoDetails, Exchanges, News } from "./components";
import './App.css'

const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route exact path="/" Component={Homepage} />
                            <Route exact path="/cryptocurrencies" Component={CryptoCurrencies} />
                            <Route exact path="/crypto/:uuid" Component={CryptoDetails} />
                            <Route exact path="/exchanges" Component={Exchanges} />
                            <Route exact path="/news" Component={News} />
                        </Routes>
                    </div>
                </Layout>
                <div className="footer">
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        Cryptoverse<br />
                        All rights are reserved
                    </Typography.Title>
                    <Space>
                        <Link to='/'>Home</Link>
                        <Link to='/exchanges'>Exchanges</Link>
                        <Link to='/news'>News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App;