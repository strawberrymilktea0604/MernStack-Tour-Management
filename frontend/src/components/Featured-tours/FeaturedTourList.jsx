import React from "react";
import TourCard from "../../shared/TourCard";
import TourCardSkeleton from "./TourCardSkeleton";
import { Col, Row } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const FeaturedTourList = () => {
    const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);

    if (loading) {
        return (
            <Row>
                {[...Array(4)].map((_, index) => (
                    <TourCardSkeleton key={index} />
                ))}
            </Row>
        );
    }

    if (error) {
        return (
            <Row>
                <Col lg="12">
                    <div className="error-card">
                        <i className="ri-error-warning-line" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                        <h4>Oops! Something went wrong</h4>
                        <p>We couldn't load the featured tours. Please try refreshing the page.</p>
                        <button 
                            className="btn btn-primary mt-3"
                            onClick={() => window.location.reload()}
                        >
                            <i className="ri-refresh-line"></i> Refresh Page
                        </button>
                    </div>
                </Col>
            </Row>
        );
    }

    if (!featuredTours || featuredTours.length === 0) {
        return (
            <Row>
                <Col lg="12">
                    <div className="error-card">
                        <i className="ri-compass-3-line" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                        <h4>No Featured Tours Available</h4>
                        <p>Check back later for exciting new destinations!</p>
                    </div>
                </Col>
            </Row>
        );
    }

    return (
        <Row>
            {featuredTours.map(tour => (
                <Col xl="3" lg="4" md="6" sm="6" className="mb-4" key={tour._id}>
                    <TourCard tour={tour} />
                </Col>
            ))}
        </Row>
    );
};

export default FeaturedTourList;
