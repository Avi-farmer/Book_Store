import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SingleItem from '../components/SingleItem';
import Cards from '../components/Cards'; // Import Cards component

const FullItemDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]); // State for all books
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Reset error state on new fetch
      try {
        // Fetch single book
        const bookRes = await axios.get(`${import.meta.env.VITE_API_URL}/book/${id}`);
        setBook(bookRes.data);

        // Fetch all books for recommendations
        const allBooksRes = await axios.get(`${import.meta.env.VITE_API_URL}/book`);
        setAllBooks(allBooksRes.data);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to fetch book details or recommendations.');
      }
    };

    if (id) fetchData();
  }, [id]);

  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (!book) return <div className="text-center p-10">Loading...</div>;

  // Filter out the current book from recommendations
  const recommendedBooks = allBooks.filter(b => b._id !== book._id).slice(0, 4); // Show up to 4 recommendations

  // Mock customer reviews
  const mockReviews = [
    { id: 1, user: "Alice", rating: 5, comment: "Absolutely loved this book! A must-read." },
    { id: 2, user: "Bob", rating: 4, comment: "Great story and well-written characters." },
    { id: 3, user: "Charlie", rating: 5, comment: "Couldn't put it down. Highly recommend!" },
  ];

  return (
    <div className='mt-20 max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <SingleItem book={book} />

      {recommendedBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recommended Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedBooks.map((item) => (
              <Cards item={item} key={item._id} />
            ))}
          </div>
        </div>
      )}

      {/* Customer Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
        {mockReviews.length > 0 ? (
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-slate-100 p-6 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">{review.user}</h3>
                  <div className="ml-auto flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No reviews yet for this book.</p>
        )}
      </div>
    </div>
  );
};

export default FullItemDetails;
