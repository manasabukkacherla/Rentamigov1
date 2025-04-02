import React, { useState } from 'react';
import { Coffee, UtensilsCrossed } from 'lucide-react';

interface MealTime {
  id: string;
  label: string;
  time: string;
}

interface DayMeals {
  breakfast: string;
  lunch: string;
  dinner: string;
}

type WeekMeals = {
  [key: string]: DayMeals;
};

const FoodServices = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [includeSnacks, setIncludeSnacks] = useState(false);
  const [snackItems, setSnackItems] = useState({ morning: '', evening: '' });
  const [weekMeals, setWeekMeals] = useState<WeekMeals>({
    monday: { breakfast: '', lunch: '', dinner: '' },
    tuesday: { breakfast: '', lunch: '', dinner: '' },
    wednesday: { breakfast: '', lunch: '', dinner: '' },
    thursday: { breakfast: '', lunch: '', dinner: '' },
    friday: { breakfast: '', lunch: '', dinner: '' },
    saturday: { breakfast: '', lunch: '', dinner: '' },
    sunday: { breakfast: '', lunch: '', dinner: '' },
  });

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const mealTimes: MealTime[] = [
    { id: 'breakfast', label: 'Breakfast', time: '8:00 AM - 9:30 AM' },
    { id: 'lunch', label: 'Lunch', time: '1:00 PM - 2:30 PM' },
    { id: 'dinner', label: 'Dinner', time: '8:00 PM - 9:30 PM' },
  ];

  const handleMealChange = (day: string, meal: keyof DayMeals, value: string) => {
    setWeekMeals((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: value,
      },
    }));
  };

  const copyMealToAllDays = (meal: keyof DayMeals, sourceDay: string) => {
    const mealValue = weekMeals[sourceDay][meal];
    setWeekMeals((prev) => {
      const newWeekMeals = { ...prev };
      days.forEach((day) => {
        newWeekMeals[day] = {
          ...newWeekMeals[day],
          [meal]: mealValue,
        };
      });
      return newWeekMeals;
    });
  };

  return (
    <div className="p-6 bg-black text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Food Services</h1>
        <div className="flex items-center space-x-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-white">Enable Food Services</span>
          </label>
        </div>
      </div>

      {isEnabled && (
        <div className="space-y-6">
          {/* Snacks Service Option */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-start space-x-4 mb-4">
              <Coffee className="w-6 h-6 flex-shrink-0 mt-1" />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <label htmlFor="snacks" className="font-medium">
                    Snacks/Tea/Coffee Service
                  </label>
                  <input
                    type="checkbox"
                    id="snacks"
                    checked={includeSnacks}
                    onChange={() => setIncludeSnacks(!includeSnacks)}
                    className="h-5 w-5 border-white rounded bg-black checked:bg-white checked:border-white focus:ring-white focus:ring-2"
                  />
                </div>
              </div>
            </div>
            
            {includeSnacks && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Morning Snacks (11:00 AM)</label>
                  <input
                    type="text"
                    value={snackItems.morning}
                    onChange={(e) => setSnackItems(prev => ({ ...prev, morning: e.target.value }))}
                    placeholder="Enter morning snack items"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Evening Snacks (5:00 PM)</label>
                  <input
                    type="text"
                    value={snackItems.evening}
                    onChange={(e) => setSnackItems(prev => ({ ...prev, evening: e.target.value }))}
                    placeholder="Enter evening snack items"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Meal Schedule Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900">
                  <th className="p-3 text-left">Day</th>
                  {mealTimes.map((meal) => (
                    <th key={meal.id} className="p-3 text-left">
                      <div>
                        <span>{meal.label}</span>
                        <div className="text-xs text-gray-400 font-normal">
                          {meal.time}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day} className="border-b border-gray-800">
                    <td className="p-3 capitalize">{day}</td>
                    {mealTimes.map((meal) => (
                      <td key={`${day}-${meal.id}`} className="p-3">
                        <div className="relative">
                          <input
                            type="text"
                            value={weekMeals[day][meal.id as keyof DayMeals]}
                            onChange={(e) => handleMealChange(day, meal.id as keyof DayMeals, e.target.value)}
                            placeholder="Enter menu items"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                          />
                          {day === 'monday' && (
                            <button
                              onClick={() => copyMealToAllDays(meal.id as keyof DayMeals, day)}
                              className="absolute right-2 top-2 text-xs text-gray-400 hover:text-white"
                              title="Copy to all days"
                            >
                              Copy ↓
                            </button>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selected Meals Summary */}
          <div className="border-t border-gray-800 mt-8 pt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <UtensilsCrossed className="w-5 h-5 mr-2" />
              Weekly Menu
            </h2>
            <div className="space-y-4">
              {days.map((day) => {
                const hasMeals = Object.values(weekMeals[day]).some(meal => meal.trim() !== '');
                if (!hasMeals) return null;

                return (
                  <div key={day} className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="capitalize font-medium mb-2">{day}</h3>
                    <div className="space-y-2">
                      {mealTimes.map((meal) => {
                        const mealItems = weekMeals[day][meal.id as keyof DayMeals];
                        if (!mealItems.trim()) return null;

                        return (
                          <div key={meal.id} className="text-sm">
                            <span className="font-medium">{meal.label}</span>:{' '}
                            <span className="text-gray-400">{mealItems}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {includeSnacks && (snackItems.morning || snackItems.evening) && (
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Daily Snacks</h3>
                  {snackItems.morning && (
                    <div className="text-sm">
                      <span className="font-medium">Morning Snacks</span>:{' '}
                      <span className="text-gray-400">{snackItems.morning}</span>
                    </div>
                  )}
                  {snackItems.evening && (
                    <div className="text-sm">
                      <span className="font-medium">Evening Snacks</span>:{' '}
                      <span className="text-gray-400">{snackItems.evening}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodServices;