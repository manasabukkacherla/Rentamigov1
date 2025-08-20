import React from 'react';
import { UtensilsCrossed, Clock, Leaf } from 'lucide-react';

const MealServices: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Meal Services Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Average Meal Rating</h2>
            <UtensilsCrossed className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">4.3/5</p>
          <p className="text-sm text-gray-500 mt-2">Based on resident feedback</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">On-time Delivery</h2>
            <Clock className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">96%</p>
          <p className="text-sm text-gray-500 mt-2">Meals served on schedule</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Dietary Options</h2>
            <Leaf className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">4</p>
          <p className="text-sm text-gray-500 mt-2">Different meal plans available</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Meal Type Distribution</h2>
          <div className="space-y-4">
            {[
              { type: "Vegetarian", percentage: 60, color: "bg-green-500" },
              { type: "Non-Vegetarian", percentage: 25, color: "bg-red-500" },
              { type: "Jain", percentage: 10, color: "bg-yellow-500" },
              { type: "Special Diet", percentage: 5, color: "bg-purple-500" }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
                  <span className="text-sm font-medium text-gray-700">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${item.color} h-2.5 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Meal Timings</h2>
          <div className="space-y-4">
            {[
              { meal: "Breakfast", timing: "7:00 AM - 9:00 AM" },
              { meal: "Lunch", timing: "12:30 PM - 2:30 PM" },
              { meal: "Evening Snacks", timing: "4:30 PM - 5:30 PM" },
              { meal: "Dinner", timing: "8:00 PM - 10:00 PM" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="font-medium text-gray-700">{item.meal}</span>
                </div>
                <span className="text-gray-600">{item.timing}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Meal Feedback</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">PG Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Meal</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rating</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Comments</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  pg: "Sunshine PG",
                  meal: "Breakfast",
                  rating: "4.5",
                  comments: "Great variety and fresh items"
                },
                {
                  pg: "Green Valley",
                  meal: "Lunch",
                  rating: "4.2",
                  comments: "Tasty but could be served hotter"
                },
                {
                  pg: "City Living",
                  meal: "Dinner",
                  rating: "4.8",
                  comments: "Excellent quality and quantity"
                }
              ].map((feedback, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{feedback.pg}</td>
                  <td className="py-3 px-4">{feedback.meal}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{feedback.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{feedback.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MealServices;