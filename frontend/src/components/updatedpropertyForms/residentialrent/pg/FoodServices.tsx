import React, { useState } from 'react';
import { Coffee, UtensilsCrossed, Copy, Check, X } from 'lucide-react';

interface MealTime {
  id: keyof DayMeals;
  label: string;
  time: string;
}

interface MealEntry {
  name: string;
  time: string;
}

interface DayMeals {
  breakfast: MealEntry;
  lunch: MealEntry;
  dinner: MealEntry;
}

type WeekMeals = {
  [key: string]: DayMeals;
};

interface FoodServicesProps {
  foodServices: {
    available: boolean;
    includeSnacks?: boolean;
    weekMeals?: WeekMeals;
    mealTimesState?: { [key: string]: string };
    snackItems?: { morning: string; evening: string };
  };
  onFoodServicesChange: (val: any) => void;
}

const FoodServices: React.FC<FoodServicesProps> = ({ foodServices, onFoodServicesChange }) => {
  // Use props for all form data
  const isEnabled = foodServices.available;
  const includeSnacks = foodServices.includeSnacks || false;
  const snackItems = foodServices.snackItems || { morning: '', evening: '' };
  const weekMeals = foodServices.weekMeals || {
    monday: { breakfast: { name: '', time: '' }, lunch: { name: '', time: '' }, dinner: { name: '', time: '' } },
    tuesday: { breakfast: { name: '', time: '' }, lunch: { name: '', time: '' }, dinner: { name: '', time: '' } },
    wednesday: { breakfast: { name: '', time: '' }, lunch: { name: '', time: '' }, dinner: { name: '', time: '' } },
    thursday: { breakfast: { name: '', time: '' }, lunch: { name: '', time: '' }, dinner: { name: '', time: '' } },
    friday: { breakfast: { name: '', time: '' }, lunch: { name: '', time: '' }, dinner: { name: '', time: '' } },
    saturday: { breakfast: { name: '', time: '' }, lunch: { name: '', time: '' }, dinner: { name: '', time: '' } },
    sunday: { breakfast: { name: '', time: '' }, lunch: { name: '', time: '' }, dinner: { name: '', time: '' } },
  };
  const mealTimesState = foodServices.mealTimesState || { breakfast: '', lunch: '', dinner: '' };


  // When a meal time changes, update all days for that meal type
  const handleMealTimeChange = (mealId: keyof DayMeals, value: string) => {
    const newMealTimesState = { ...mealTimesState, [mealId]: value };
    const updatedWeekMeals = { ...weekMeals };
    Object.keys(updatedWeekMeals).forEach(day => {
      updatedWeekMeals[day] = {
        ...updatedWeekMeals[day],
        [mealId]: {
          ...updatedWeekMeals[day][mealId],
          time: value,
        },
      };
    });
    onFoodServicesChange({
      ...foodServices,
      mealTimesState: newMealTimesState,
      weekMeals: updatedWeekMeals
    });
  };


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

  const handleMealChange = (day: string, meal: keyof DayMeals, field: 'name' | 'time', value: string) => {
    const updatedWeekMeals = { ...weekMeals };
    updatedWeekMeals[day] = {
      ...updatedWeekMeals[day],
      [meal]: {
        ...updatedWeekMeals[day][meal],
        [field]: value,
      },
    };
    onFoodServicesChange({
      ...foodServices,
      weekMeals: updatedWeekMeals
    });
  };


  const copyMealToAllDays = (meal: keyof DayMeals, sourceDay: string) => {
    const mealValue = weekMeals[sourceDay][meal];
    const newWeekMeals = { ...weekMeals };
    days.forEach((day) => {
      newWeekMeals[day] = {
        ...newWeekMeals[day],
        [meal]: mealValue,
      };
    });
    onFoodServicesChange({
      ...foodServices,
      weekMeals: newWeekMeals
    });
  };


  return (
    <div className="space-y-6">
      {/* Food Services Toggle */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-gray-200">
        <div>
          <h2 className="text-base font-medium text-gray-900">Food Services</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enable if your PG offers food services to residents
          </p>
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isEnabled}
            onChange={() => onFoodServicesChange({
              ...foodServices,
              available: !isEnabled
            })}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
        </label>
      </div>

      {isEnabled && (
        <div className="space-y-6">
          {/* Snacks Service Option */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-start mb-4">
              <div className={`p-2 rounded-md mr-3 ${includeSnacks ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                <Coffee className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Snacks & Beverages
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Tea, coffee, and snacks between main meals
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={includeSnacks}
                      onChange={() => onFoodServicesChange({
                        ...foodServices,
                        includeSnacks: !includeSnacks
                      })}
                    />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {includeSnacks && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Morning Snacks (11:00 AM)</label>
                  <input
                    type="text"
                    value={snackItems.morning}
                    onChange={(e) => onFoodServicesChange({
                      ...foodServices,
                      snackItems: { ...snackItems, morning: e.target.value }
                    })}
                    placeholder="Tea, coffee, biscuits, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Evening Snacks (5:00 PM)</label>
                  <input
                    type="text"
                    value={snackItems.evening}
                    onChange={(e) => onFoodServicesChange({
                      ...foodServices,
                      snackItems: { ...snackItems, evening: e.target.value }
                    })}
                    placeholder="Cookies, sandwiches, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder-gray-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Meal Schedule Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-md bg-black text-white mr-3">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-gray-900">Weekly Meal Schedule</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left font-medium text-gray-600">Day</th>
                    {mealTimes.map((meal) => (
                      <th key={meal.id} className="p-3 text-left font-medium text-gray-600">
                        <div>
                          <span>{meal.label}</span>
                          <div className="text-xs text-gray-500 font-normal">Default: {meal.time}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                  {/* Single Time Input Row */}
                  <tr className="bg-gray-100">
                    <td className="p-3 text-left font-medium text-gray-600">Time</td>
                    {mealTimes.map((meal) => (
                      <td key={meal.id + '-time'} className="p-3">
                        <input
                          type="time"
                          value={mealTimesState[meal.id] || ''}
                          onChange={(e) => handleMealTimeChange(meal.id, e.target.value)}
                          className="w-full px-3 py-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder-gray-300 text-xs"
                        />
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {days.map((day) => (
                    <tr key={day} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 capitalize font-medium text-gray-700">{day}</td>
                      {mealTimes.map((meal) => (
                        <td key={`${day}-${meal.id}`} className="p-3">
                          <div className="relative mb-1">
                            <input
                              type="text"
                              value={weekMeals[day][meal.id as keyof DayMeals].name}
                              onChange={(e) => handleMealChange(day, meal.id as keyof DayMeals, 'name', e.target.value)}
                              placeholder="Enter menu items"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder-gray-400 pr-8 mb-1"
                            />
                            {day === 'monday' && (
                              <button
                                type="button"
                                onClick={() => copyMealToAllDays(meal.id as keyof DayMeals, day)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black p-1"
                                title="Copy to all days"
                              >
                                <Copy className="w-4 h-4" />
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
          </div>

          {/* Selected Meals Summary */}
          {days.some(day => Object.values(weekMeals[day]).some(meal => meal.name.trim() !== '' || meal.time.trim() !== '')) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <div className="p-1.5 rounded-md bg-gray-100 text-gray-700 mr-2">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                Weekly Menu Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {days.map((day) => {
                  const hasMeals = Object.values(weekMeals[day]).some(meal => meal.name.trim() !== '' || meal.time.trim() !== '');
                  if (!hasMeals) return null;

                  return (
                    <div key={day} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                      <h4 className="capitalize font-medium text-gray-900 mb-2">{day}</h4>
                      <div className="space-y-1.5">
                        {mealTimes.map((meal) => {
                          const mealEntry = weekMeals[day][meal.id as keyof DayMeals];
                          if (!mealEntry.name.trim() && !mealEntry.time.trim()) return null;

                          return (
                            <div key={meal.id} className="flex flex-col text-sm">
                              <span className="font-medium text-gray-700 min-w-[80px]">{meal.label}:</span>
                              {mealEntry.name && <span className="text-gray-600 ml-2">Menu: {mealEntry.name}</span>}
                              {mealEntry.time && <span className="text-gray-500 ml-2">Time: {mealEntry.time}</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {includeSnacks && (snackItems.morning || snackItems.evening) && (
                <div className="mt-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-2">Daily Snacks</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {snackItems.morning && (
                      <div className="text-sm flex">
                        <span className="font-medium text-gray-700 min-w-[80px]">Morning:</span>
                        <span className="text-gray-600 ml-2">{snackItems.morning}</span>
                      </div>
                    )}
                    {snackItems.evening && (
                      <div className="text-sm flex">
                        <span className="font-medium text-gray-700 min-w-[80px]">Evening:</span>
                        <span className="text-gray-600 ml-2">{snackItems.evening}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {!isEnabled && (
        <div className="flex items-center justify-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <div className="text-center text-gray-500">
            <UtensilsCrossed className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-600 font-medium">Food Services Disabled</p>
            <p className="text-sm text-gray-500 mt-1">Toggle the switch above to add meal options</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodServices;