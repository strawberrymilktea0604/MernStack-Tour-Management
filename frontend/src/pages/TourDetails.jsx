import React, { useEffect, useRef, useState, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from './../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Newsletter from './../shared/Newsletter';
import Booking from '../components/Booking/Booking';
import StarRating from '../components/StarRating/StarRating';
import Toast from '../shared/Toast';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from './../context/AuthContext';

const TourDetails = () => {
    const { id } = useParams();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null);
    const [toast, setToast] = useState(null);
    const { user } = useContext(AuthContext);

    // Load saved rating from localStorage when component mounts
    useEffect(() => {
        const savedRating = localStorage.getItem(`tour-rating-${id}`);
        if (savedRating) {
            setTourRating(parseInt(savedRating));
        }
    }, [id]);

    // Save rating to localStorage whenever it changes
    useEffect(() => {
        if (tourRating) {
            localStorage.setItem(`tour-rating-${id}`, tourRating.toString());
        }
    }, [tourRating, id]);

    // Fetch data from database
    const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

    // Destructure properties from tour object
    const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour;

    // Format date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    // Submit review
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;

        try {
            if (!user) {
                showToast('Please sign in to submit a review', 'warning');
                return;
            }

            if (!tourRating) {
                showToast('Please select a rating', 'warning');
                return;
            }

            const reviewObj = {
                username: user?.username,
                reviewText,
                rating: tourRating,
            };

            const res = await fetch(`${BASE_URL}/reviews/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(reviewObj),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Review submission error:', errorText);
                console.error('Response status:', res.status);
                console.error('Response headers:', res.headers);
                showToast(`Error ${res.status}: ${errorText}`, 'error');
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const result = await res.json();
                
                if (result.success) {
                    showToast('Review submitted successfully!', 'success');
                    reviewMsgRef.current.value = '';
                    setTourRating(null);
                    // Remove saved rating from localStorage
                    localStorage.removeItem(`tour-rating-${id}`);
                    
                    // Refresh tour data without page reload
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    showToast(result.message || 'Failed to submit review', 'error');
                }
            } else {
                showToast('Review submitted successfully!', 'success');
                reviewMsgRef.current.value = '';
                setTourRating(null);
                // Remove saved rating from localStorage
                localStorage.removeItem(`tour-rating-${id}`);
                
                // Refresh tour data without page reload
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (err) {
            console.error('Review submission error:', err);
            showToast('Failed to submit review. Please try again later.', 'error');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tour]);

    const { avgRating } = calculateAvgRating(reviews);

    return (
        <>
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={hideToast} 
                />
            )}
            <section>
                <Container>
                {loading && <h4 className="text-center pt-5">Loading.......</h4>}
                {error && <h4 className="text-center pt-5">{error}</h4>}

            {!loading && !error && (
                <Row>
                <Col lg="8">
                    <div className="tour__content">
                    <img src={photo} alt="" />

                    <div className="tour__info">
                        <h2>{title}</h2>
                        <div className="d-flex align-items-center gap-5">
                        <span className="tour__rating d-flex align-items-center gap-1">
                            {avgRating > 0 ? (
                                <>
                                    <StarRating 
                                        rating={avgRating} 
                                        setRating={() => {}} 
                                        readonly={true}
                                        size="small"
                                    />
                                    <span>({reviews?.length || 0} reviews)</span>
                                </>
                            ) : (
                                <span className="no-rating">
                                    <i className="ri-star-line"></i>
                                    Not Rated
                                </span>
                            )}
                        </span>
                        <span>
                            <i className="ri-map-pin-user-fill"></i> {address}
                        </span>
                        </div>

                        <div className="tour__extra-details">
                        <span>
                            <i className="ri-map-pin-2-line"></i> {city}
                        </span>
                        <span>
                            <i className="ri-money-dollar-circle-line"></i> ${price}/per person
                        </span>
                        <span>
                            <i className="ri-map-pin-time-line"></i> {distance} k/m
                        </span>
                        <span>
                            <i className="ri-group-line"></i> {maxGroupSize} people
                        </span>
                        </div>
                        <h5>Description</h5>
                        <p>{desc}</p>
                    </div>

                    {/* Reviews section */}
                    <div className="tour__reviews mt-4">
                        <h4>Reviews ({reviews?.length} reviews)</h4>
                        <Form onSubmit={handleSubmit}>
                            <div className="rating-section mb-4">
                                <h6>Rate this tour:</h6>
                                <StarRating 
                                    rating={tourRating} 
                                    setRating={setTourRating}
                                    size="large"
                                />
                            </div>

                            <div className="review__input">
                                <input
                                    type="text"
                                    ref={reviewMsgRef}
                                    placeholder="Share your thoughts about this tour..."
                                    required
                                />
                                <button 
                                    className="btn primary__btn text-white" 
                                    type="submit"
                                    disabled={!tourRating}
                                >
                                    <i className="ri-send-plane-line"></i>
                                    Submit
                                </button>
                            </div>
                        </Form>

                        <ListGroup className="user__reviews">
                        {reviews?.length === 0 ? (
                            <div className="no-reviews">
                                <i className="ri-chat-3-line"></i>
                                <h5>No reviews yet</h5>
                                <p>Be the first to share your experience!</p>
                            </div>
                        ) : (
                            reviews?.map((review, index) => (
                                <div className="review__item" key={index}>
                                    <img src={avatar} alt="User avatar" />
                                    <div className="w-100">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h5>{review.username}</h5>
                                                <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                                            </div>
                                            <div className="review-rating">
                                                <StarRating 
                                                    rating={review.rating || 0} 
                                                    setRating={() => {}} 
                                                    readonly={true}
                                                    size="small"
                                                />
                                            </div>
                                        </div>
                                        <h6 className="review-text">{review.reviewText}</h6>
                                    </div>
                                </div>
                            ))
                        )}
                        </ListGroup>
                    </div>
                    </div>
                </Col>
                <Col lg="4">
                    <Booking tour={tour} avgRating={avgRating} />
                </Col>
                </Row>
            )}
            </Container>
        </section>
        <Newsletter />
        </>
    );
    };

export default TourDetails;
