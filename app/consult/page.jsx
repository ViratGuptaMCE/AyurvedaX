'use client'
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mock data for available doctors
  const doctors = [
    {
      id: 1,
      name: "Vishwas Gaur",
      specialty: "General Practitioner",
      avatar: "/images/doc1.png",
    },
    {
      id: 2,
      name: "Mahant Prabhu",
      specialty: "Cardiologist",
      avatar: "/svg/doc1.svg",
    },
    {
      id: 3,
      name: "Rishi Vashishtha",
      specialty: "Dermatologist",
      avatar: "/images/doc2.png",
    },
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);

  // Mock data - some slots are available, some are filled
  const generateTimeSlots = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const slots = [];

    // Generate hourly slots from 9 AM to 5 PM
    for (let hour = 9; hour <= 17; hour++) {
      // Seed with date to make it consistent but semi-random
      const dateSeed = parseInt(dateString.replace(/-/g, ""));
      const hourSeed = hour + dateSeed;

      // 30% chance slot is already filled
      const isFilled = hourSeed % 10 < 3;

      slots.push({
        id: `${dateString}-${hour}`,
        time: `${hour}:00 ${hour >= 12 ? "PM" : "AM"}`.replace("0 PM", "12 PM"),
        filled: isFilled,
      });

      // Add 30-minute intervals too
      const isHalfFilled = (hourSeed * 2) % 10 < 3;
      slots.push({
        id: `${dateString}-${hour}-30`,
        time: `${hour}:30 ${hour >= 12 ? "PM" : "AM"}`.replace("0 PM", "12 PM"),
        filled: isHalfFilled,
      });
    }

    return slots;
  };

  const [timeSlots, setTimeSlots] = useState(generateTimeSlots(selectedDate));

  useEffect(() => {
    setTimeSlots(generateTimeSlots(selectedDate));
    setSelectedSlot(null);
  }, [selectedDate]);

  // Generate dates for calendar view
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Day of week of first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDay.getDay();

    // Array for all days to display
    const days = [];

    // Add empty days for padding at the start
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    // Add all days in the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({
        date: date,
        isCurrentMonth: true,
        isToday: date.toDateString() === new Date().toDateString(),
        isPast: date < new Date(new Date().setHours(0, 0, 0, 0)),
      });
    }

    return days;
  };

  const calendar = generateCalendarDays();

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);

      // Reset form after a delay
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setEmail("");
        setPhone("");
        setReason("");
        setSelectedSlot(null);
      }, 3000);
    }, 1500);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">Book Your Medical Consultation</h1>
          <p className="mt-2">
            Select a date and time for your online appointment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 divide-x divide-gray-200">
          {/* Calendar Section */}
          <div className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 flex items-center">
                <Calendar className="mr-2" size={20} />
                Select Date
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={prevMonth}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  &larr;
                </button>
                <div className="font-medium">
                  {currentMonth.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <button
                  onClick={nextMonth}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  &rarr;
                </button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}

              {calendar.map((day, index) => (
                <div key={index} className="aspect-square p-1">
                  {day.date && (
                    <button
                      disabled={day.isPast}
                      onClick={() => setSelectedDate(day.date)}
                      className={`w-full h-full flex items-center justify-center rounded-full text-sm
                        ${
                          day.isPast
                            ? "text-gray-300 cursor-not-allowed"
                            : "hover:bg-blue-50"
                        } 
                        ${day.isToday ? "ring-2 ring-blue-500" : ""} 
                        ${
                          selectedDate &&
                          day.date &&
                          selectedDate.toDateString() ===
                            day.date.toDateString()
                            ? "bg-blue-600 text-white"
                            : ""
                        }`}
                    >
                      {day.date.getDate()}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Doctor selection */}
            <div className="mt-6">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center">
                <User className="mr-2" size={20} />
                Select Doctor
              </h2>
              <div className="space-y-2">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer
                      ${
                        selectedDoctor.id === doctor.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-gray-500">
                        {doctor.specialty}
                      </div>
                    </div>
                    {selectedDoctor.id === doctor.id && (
                      <CheckCircle
                        className="ml-auto text-blue-500"
                        size={20}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="p-6 bg-white">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="mr-2" size={20} />
              Available Time Slots
            </h2>

            <div className="mb-4">
              <div className="text-lg font-medium text-gray-800">
                {formatDate(selectedDate)}
              </div>
              <div className="text-sm text-gray-500">
                with {selectedDoctor.name}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  disabled={slot.filled}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg border text-left
                    ${
                      slot.filled
                        ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                        : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                    }
                    ${
                      selectedSlot && selectedSlot.id === slot.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{slot.time}</span>
                    {slot.filled ? (
                      <span className="text-xs font-medium text-gray-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        Filled
                      </span>
                    ) : (
                      <span
                        className={`text-xs font-medium flex items-center ${
                          selectedSlot && selectedSlot.id === slot.id
                            ? "text-white"
                            : "text-green-600"
                        }`}
                      >
                        <CheckCircle size={14} className="mr-1" />
                        Available
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Key/Legend */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg text-sm">
              <div className="flex items-center justify-around">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white border border-gray-200 rounded-sm mr-2"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-sm mr-2"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-100 rounded-sm mr-2"></div>
                  <span>Filled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 bg-white">
            <h2 className="font-semibold text-gray-800 mb-4">
              Your Information
            </h2>

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="mr-2" size={20} />
                  <span className="font-medium">Appointment Confirmed!</span>
                </div>
                <p className="mt-2 text-sm">
                  Your appointment has been successfully booked. We've sent a
                  confirmation to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {selectedSlot ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="font-medium text-gray-800">
                        Selected Time:
                      </div>
                      <div className="flex items-center mt-1">
                        <Calendar size={16} className="mr-2 text-blue-600" />
                        <span>
                          {formatDate(selectedDate)}, {selectedSlot.time}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <User size={16} className="mr-2 text-blue-600" />
                        <span>{selectedDoctor.name}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-sm">
                      Please select an available time slot to continue.
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="johndoe@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Appointment
                    </label>
                    <div className="relative">
                      <MessageSquare
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Briefly describe the reason for your appointment"
                        rows={3}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedSlot || submitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Booking..." : "Book Appointment"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
