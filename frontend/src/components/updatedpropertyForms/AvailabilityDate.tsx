"use client"

import { useState } from "react"
import { ArrowRight, Calendar } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface AvailabilityDateProps {
  availability: {
    type: "immediate" | "specific"
    date?: string
  }
  onAvailabilityChange?: (availability: {
    type: "immediate" | "specific"
    date?: string
  }) => void
}

const AvailabilityDate = ({ availability, onAvailabilityChange }: AvailabilityDateProps) => {
  const [availabilityType, setAvailabilityType] = useState<"immediate" | "specific">(availability.type)
  const [specificDate, setSpecificDate] = useState<Date | null>(availability.date ? new Date(availability.date) : null)

  const handleTypeChange = (type: "immediate" | "specific") => {
    setAvailabilityType(type)
    onAvailabilityChange?.({
      type,
      date: type === "specific" ? specificDate?.toISOString() : undefined,
    })
  }

  const handleDateChange = (date: Date | null) => {
    setSpecificDate(date)
    if (date) {
      onAvailabilityChange?.({
        type: availabilityType,
        date: date.toISOString(),
      })
    }
  }

  // Get today's date for min attribute
  const today = new Date()

  return (
    <div className="transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-2xl font-semibold text-black">Availability Date</h3>
        <ArrowRight className="text-black/60" size={20} />
        <span className="text-sm text-black/70">When will the property be available?</span>
      </div>

      <div className="space-y-8 max-w-2xl">
        <div className="bg-white p-8 rounded-xl border border-black/20 space-y-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => handleTypeChange("immediate")}
              className={`flex-1 px-6 py-5 rounded-xl border ${
                availabilityType === "immediate" 
                  ? "border-black" 
                  : "border-black/20"
              } bg-[#f5f5f5] text-black hover:scale-105 hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-center gap-3">
                <Calendar size={22} className="text-black" />
                <span className="font-medium">Immediate</span>
              </div>
              <p className="text-sm mt-2 text-black/70">
                Available right now
              </p>
            </button>

            <button
              onClick={() => handleTypeChange("specific")}
              className={`flex-1 px-6 py-5 rounded-xl border ${
                availabilityType === "specific" 
                  ? "border-black" 
                  : "border-black/20"
              } bg-[#f5f5f5] text-black hover:scale-105 hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-center gap-3">
                <Calendar size={22} className="text-black" />
                <span className="font-medium">Specific Date</span>
              </div>
              <p className="text-sm mt-2 text-black/70">
                Available from a future date
              </p>
            </button>
          </div>

          {availabilityType === "specific" && (
            <div className="relative mt-6 animate-fadeIn">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Calendar size={20} className="text-black" />
              </div>
              <DatePicker
                selected={specificDate}
                onChange={handleDateChange}
                minDate={today}
                placeholderText="Select availability date"
                dateFormat="dd/MM/yyyy"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-black/20 outline-none text-black placeholder:text-black/60"
                wrapperClassName="w-full"
                calendarClassName="!bg-white !border-black/20 !text-black"
                showPopperArrow={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AvailabilityDate

