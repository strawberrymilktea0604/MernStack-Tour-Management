import React from 'react';
import { Col } from 'reactstrap';
import './TourCardSkeleton.css';

const TourCardSkeleton = () => {
    return (
        <Col xl="3" lg="4" md="6" sm="6" className="mb-4">
            <div className="tour-card-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                    <div className="skeleton-header">
                        <div className="skeleton-location"></div>
                        <div className="skeleton-rating"></div>
                    </div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-title-small"></div>
                    <div className="skeleton-footer">
                        <div className="skeleton-price"></div>
                        <div className="skeleton-button"></div>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default TourCardSkeleton;
