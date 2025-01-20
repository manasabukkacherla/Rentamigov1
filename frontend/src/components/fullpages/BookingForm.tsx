import React, { useState } from 'react';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    whatsappNotifications: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div
      style={{
        width: '40%',
        maxWidth: '400px',
        backgroundColor: '#000',
        padding: '20px',
        borderRadius: '10px',
        color: '#fff',
        boxSizing: 'border-box',
        margin: '20px auto',
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', textAlign: 'center' }}>Book your visit today!</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="fullName" style={{ display: 'block', marginBottom: '5px', fontSize: '1rem' }}>
            Your full name*
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="contactNumber" style={{ display: 'block', marginBottom: '5px', fontSize: '1rem' }}>
            Your contact number*
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            placeholder="+91-0000000000"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontSize: '1rem' }}>
            Your mail ID*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="sample@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="whatsappNotifications"
            name="whatsappNotifications"
            checked={formData.whatsappNotifications}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          <label htmlFor="whatsappNotifications" style={{ fontSize: '1rem' }}>
            Click to get "WhatsApp" notifications from us
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#ff4d4d',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Book a visit now!
        </button>
      </form>

      <style>
        {`
          @media (max-width: 768px) {
            div {
              width: 100% !important;
              padding: 15px !important;
            }

            h2 {
              font-size: 1.25rem !important;
            }

            input, button {
              font-size: 0.9rem !important;
              padding: 8px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BookingForm;
