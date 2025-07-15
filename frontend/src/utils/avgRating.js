const calculateAvgRating = reviews => {
    if (!reviews || reviews.length === 0) {
        return {
            avgRating: 0,
            totalRating: 0
        };
    }

    const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
    const avgRating = (totalRating / reviews.length).toFixed(1);

    return {
        avgRating: parseFloat(avgRating),
        totalRating: reviews.length
    };
};

export default calculateAvgRating;