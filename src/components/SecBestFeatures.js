import React from 'react';
import { Col } from 'react-bootstrap';

function SecBestFeatures({ title, description, src }) {
  return (
    <>
      <Col lg={4} md={4} sm={12}>
        <div className="FeatureBox">
          <div className="FeatureImg">
            <img src={src} />
          </div>
          <div className="FeatureCon">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Col>
    </>
  );
}

export default SecBestFeatures;
