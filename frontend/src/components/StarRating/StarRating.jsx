import React, { useState, useEffect } from 'react';
import './StarRating.css';

const StarRating = ({ rating, setRating, readonly = false, size = 'medium' }) => {
    const [hover, setHover] = useState(null);
    const [currentRating, setCurrentRating] = useState(rating || 0);
    
    const sizeClasses = {
        small: 'star-small',
        medium: 'star-medium',
        large: 'star-large'
    };

    // Update internal rating when prop changes
    useEffect(() => {
        setCurrentRating(rating || 0);
    }, [rating]);

    const handleRatingClick = (ratingValue) => {
        if (!readonly) {
            setCurrentRating(ratingValue);
            if (setRating) {
                setRating(ratingValue);
            }
        }
    };

    const displayRating = hover || currentRating;

    return (
        <div className={`star-rating ${sizeClasses[size]} ${readonly ? 'readonly' : ''}`}>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleRatingClick(ratingValue)}
                            style={{ display: 'none' }}
                            disabled={readonly}
                        />
                        <i
                            className={`ri-star-${
                                ratingValue <= displayRating ? 'fill' : 'line'
                            }`}
                            onMouseEnter={() => !readonly && setHover(ratingValue)}
                            onMouseLeave={() => !readonly && setHover(null)}
                            style={{
                                color: ratingValue <= displayRating ? '#ffc107' : '#e4e5e9',
                                cursor: readonly ? 'default' : 'pointer',
                                transition: 'color 0.2s ease-in-out'
                            }}
                        />
                    </label>
                );
            })}
            {!readonly && currentRating > 0 && (
                <span className="rating-text">
                    {currentRating} {currentRating === 1 ? 'star' : 'stars'}
                </span>
            )}
        </div>
    );
};

export default StarRating;
