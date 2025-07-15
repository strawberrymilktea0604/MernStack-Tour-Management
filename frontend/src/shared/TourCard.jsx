    import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import StarRating from "../components/StarRating/StarRating";

import "./tour-card.css";


    const TourCard = ({ tour }) => {
        const { _id, title, city, photo, price, featured, reviews } = tour;
        const { avgRating } = calculateAvgRating(reviews);

        return (
            <div className="tour__card">
                <Card>
                    <div className="tour__img">
                        <img src={photo} alt="tour-img" />
                        {featured && <span className="featured-badge">Featured</span>}
                        <div className="tour__overlay">
                            <Link to={`/tours/${_id}`} className="view-details-btn">
                                <i className="ri-eye-line"></i>
                            </Link>
                        </div>
                    </div>
                    
                    <CardBody>
                        <div className="card__content">
                            <div className="card__top">
                                <div className="tour__location d-flex align-items-center gap-1">
                                    <i className="ri-map-pin-line"></i> 
                                    <span>{city}</span>
                                </div>
                                <div className="tour__rating">
                                    {avgRating && avgRating > 0 ? (
                                        <>
                                            <StarRating 
                                                rating={avgRating} 
                                                setRating={() => {}} 
                                                readonly={true}
                                                size="small"
                                            />
                                            <span className="rating-count">({reviews?.length || 0})</span>
                                        </>
                                    ) : (
                                        <span className="no-rating">
                                            <i className="ri-star-line"></i>
                                            Not Rated
                                        </span>
                                    )}
                                </div>
                            </div>

                            <h5 className="tour__title">
                                <Link to={`/tours/${_id}`}>{title}</Link>
                            </h5>

                            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                                <div className="price-info">
                                    <span className="price">${price}</span>
                                    <span className="price-unit">/ Per Person</span>
                                </div>
                                <Link to={`/tours/${_id}`} className="btn booking__btn">
                                    Book Now
                                    <i className="ri-arrow-right-line"></i>
                                </Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    };

    export default TourCard;
