import Container from '../../../Components/Shared/Container';
import useAllReviews from '../../../hooks/useAllReviews';
import AllReviewCard from './AllRevewCard';

// Custom styles for the slider arrows
// user revew

const UserReviews = () => {
    const { data, isLoading, isError } = useAllReviews();

    if (isLoading) {
        return <p>Loading reviews...</p>;
    }

    if (isError) {
        return <p>Error loading reviews. Please try again later.</p>;
    }

    return (
        <div className='mt-6 '>
            <Container >
                <h2 className='  text-3xl p-4'>User Reviews</h2>


                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data?.map((review) => (
                        <div key={review.id}>
                            <AllReviewCard review={review} />
                        </div>
                    ))}
                </div>


            </Container>
        </div>
    );
};

export default UserReviews;