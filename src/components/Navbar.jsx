import { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [screenSize, setScreenSize] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    useEffect(() => {
        if (screenSize < 760) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    const handleMenuClick = () => {
        setActiveMenu(!activeMenu);
        console.log("hii");
    };

    const handleMenuLinkClick = () => {
        if (screenSize < 760) {
            setActiveMenu(false);
        }
    };

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to='/' onClick={handleMenuLinkClick}>Cryptoverse</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={handleMenuClick}>
                    <MenuOutlined />
                </Button>

            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to='/' onClick={() => { handleMenuLinkClick(); navigate('/'); }}>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to='/cryptocurrencies' onClick={() => { handleMenuLinkClick(); navigate('/cryptocurrencies'); }}>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to='/exchanges' onClick={() => { handleMenuLinkClick(); navigate('/exchanges'); }}>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to='/news' onClick={() => { handleMenuLinkClick(); navigate('/news'); }}>News</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    );
};

export default Navbar;