import React from 'react';
import { Star, User } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    date: '2024-02-15',
    comment: 'Amazing property with great amenities. The location is perfect for IT professionals.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    date: '2024-02-10',
    comment: 'Very well maintained property. The security is excellent. Only issue is the traffic during peak hours.',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    rating: 5,
    date: '2024-02-05',
    comment: 'Best apartment complex in the area. The gym and swimming pool are top-notch.',
  },
];

export const Reviews: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 text-gray-900"
              />
            ))}
          </div>
          <span className="text-gray-600">(4.7 average)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <div className="flex gap-2 items-center">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-gray-900"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};