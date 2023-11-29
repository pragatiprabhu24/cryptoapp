import React from "react";
import notfound from '../images/notfound.gif'
import { Link } from "react-router-dom";
import { Col, Row } from 'antd';

const PageNotFound = () => {
    return (
        <>

            <div style={{ marginTop: '10%', marginBottom: '10%' }}>
                <Row>
                    <Col flex={2}>
                        <img
                            src={notfound}
                            alt="404 Space"
                            style={{ width: '500px' }}
                        />
                    </Col>
                    <Col flex={3}>
                        <div>
                            <h1>Lost in Space...</h1>
                            <p>The page you requested could not be found</p>
                            <Link to='/'>
                                <button class="button-85" role="button">GO BACK</button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>

        </>
    );
}

export default PageNotFound;