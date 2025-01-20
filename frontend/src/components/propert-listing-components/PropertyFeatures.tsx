import React from "react";
import { theme } from "../../theme";

// Define the data interface
interface PropertyFeaturesData {
  bedrooms: number;
  balconies: number;
  floorNumber: string;
  totalFloors: number;
  furnishingStatus: "Furnished" | "Unfurnished" | "Semi-Furnished" | "";
  bathrooms: number;
  superBuiltUp: number;
  builtUp: number;
  carpetArea: number;
  ageOfTheProperty: "<5 Years" | "5-10 Years" | ">10 Years" | "";
}

// Define props interface
interface PropertyFeaturesProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  data: PropertyFeaturesData;
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({
  onChange,
  data,
}) => (
  <div style={styles.section}>
    <h2 style={styles.heading}>Property Features</h2>
    <input
      type="number"
      name="bedrooms"
      placeholder="Number of Bedrooms"
      onChange={onChange}
      value={data.bedrooms}
      style={styles.input}
    />
    <input
      type="number"
      name="balconies"
      placeholder="Number of Balconies"
      onChange={onChange}
      value={data.balconies}
      style={styles.input}
    />
    <input
      type="text"
      name="floorNumber"
      placeholder="Floor Number"
      onChange={onChange}
      value={data.floorNumber}
      style={styles.input}
    />
    <input
      type="number"
      name="totalFloors"
      placeholder="Total Floors"
      onChange={onChange}
      value={data.totalFloors}
      style={styles.input}
    />
    <select
      name="furnishingStatus"
      onChange={onChange}
      value={data.furnishingStatus}
      style={styles.input}
    >
      <option value="">Select Furnishing Status</option>
      <option value="Furnished">Furnished</option>
      <option value="Unfurnished">Unfurnished</option>
      <option value="Semi-Furnished">Semi-Furnished</option>
    </select>
    <input
      type="number"
      name="bathrooms"
      placeholder="Number of Bathrooms"
      onChange={onChange}
      value={data.bathrooms}
      style={styles.input}
    />
    <input
      type="number"
      name="superBuiltUp"
      placeholder="Super Built-up Area (sq ft)"
      onChange={onChange}
      value={data.superBuiltUp}
      style={styles.input}
    />
    <input
      type="number"
      name="builtUp"
      placeholder="Built-up Area (sq ft)"
      onChange={onChange}
      value={data.builtUp}
      style={styles.input}
    />
    <input
      type="number"
      name="carpetArea"
      placeholder="Carpet Area (sq ft)"
      onChange={onChange}
      value={data.carpetArea}
      style={styles.input}
    />
    <select
      name="ageOfTheProperty"
      onChange={onChange}
      value={data.ageOfTheProperty}
      style={styles.input}
    >
      <option value="">Select Age of Property</option>
      <option value="<5 Years">&lt;5 Years</option>
      <option value="5-10 Years">5-10 Years</option>
      <option value=">10 Years">&gt;10 Years</option>
    </select>
  </div>
);

const styles = {
  section: {
    marginBottom: theme.spacing.large,
  },
  heading: {
    fontSize: theme.fontSizes.large,
    marginBottom: theme.spacing.medium,
  },
  input: {
    width: "100%",
    padding: theme.spacing.small,
    marginBottom: theme.spacing.small,
    fontSize: theme.fontSizes.medium,
    border: `1px solid ${theme.colors.border}`,
  },
};

export default PropertyFeatures;

// return (
//   <form onSubmit={handleSubmit} style={styles.form}>
//     <h1 style={styles.mainHeading}>Property Listing Form</h1>

//     <section style={styles.section}>
//       <h2 style={styles.heading}>Personal Details</h2>
//       <select
//         name="ownerType"
//         onChange={handleChange}
//         value={formData.ownerType}
//         style={styles.input}
//       >
//         <option value="">Select Owner Type</option>
//         <option value="Owner">Owner</option>
//         <option value="Agent">Agent</option>
//         <option value="Builder">Builder</option>
//       </select>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         onChange={handleChange}
//         value={formData.name}
//         style={styles.input}
//       />
//       <input
//         type="tel"
//         name="whatsappNumber"
//         placeholder="WhatsApp Number"
//         onChange={handleChange}
//         value={formData.whatsappNumber}
//         style={styles.input}
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//         value={formData.email}
//         style={styles.input}
//       />
//     </section>

//     <section style={styles.section}>
//       <h2 style={styles.heading}>Property Details</h2>
//       <select
//         name="listingType"
//         onChange={handleChange}
//         value={formData.listingType}
//         style={styles.input}
//       >
//         <option value="">Select Listing Type</option>
//         <option value="Sale">Sale</option>
//         <option value="Rent/Lease">Rent/Lease</option>
//         <option value="PG/Hostel">PG/Hostel</option>
//       </select>
//       <select
//         name="propertyType"
//         onChange={handleChange}
//         value={formData.propertyType}
//         style={styles.input}
//       >
//         <option value="">Select Property Type</option>
//         <option value="Apartment">Apartment</option>
//         <option value="Standalone Building">Standalone Building</option>
//         <option value="Villa">Villa</option>
//         <option value="Row House">Row House</option>
//       </select>
//       <select
//         name="societySize"
//         onChange={handleChange}
//         value={formData.societySize}
//         style={styles.input}
//       >
//         <option value="">Select Society Size</option>
//         <option value="<50">&lt;50</option>
//         <option value="50-100">50-100</option>
//         <option value=">100">&gt;100</option>
//       </select>
//     </section>

//     <section style={styles.section}>
//       <h2 style={styles.heading}>Location Details</h2>
//       <input
//         type="text"
//         name="city"
//         placeholder="City"
//         onChange={handleChange}
//         value={formData.city}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="projectName"
//         placeholder="Project Name"
//         onChange={handleChange}
//         value={formData.projectName}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="latitude"
//         placeholder="Latitude"
//         onChange={handleChange}
//         value={formData.latitude}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="longitude"
//         placeholder="Longitude"
//         onChange={handleChange}
//         value={formData.longitude}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="locality"
//         placeholder="Locality"
//         onChange={handleChange}
//         value={formData.locality}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="area"
//         placeholder="Area"
//         onChange={handleChange}
//         value={formData.area}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="pinCode"
//         placeholder="Pin Code"
//         onChange={handleChange}
//         value={formData.pinCode}
//         style={styles.input}
//       />
//     </section>

//     <section style={styles.section}>
//       <h2 style={styles.heading}>Property Features</h2>
//       <input
//         type="number"
//         name="bedrooms"
//         placeholder="Number of Bedrooms"
//         onChange={handleChange}
//         value={formData.bedrooms}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="bathrooms"
//         placeholder="Number of Bathrooms"
//         onChange={handleChange}
//         value={formData.bathrooms}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="balconies"
//         placeholder="Number of Balconies"
//         onChange={handleChange}
//         value={formData.balconies}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="studyRoom"
//         placeholder="Study Room"
//         onChange={handleChange}
//         value={formData.studyRoom}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="servantRoom"
//         placeholder="Servant Room"
//         onChange={handleChange}
//         value={formData.servantRoom}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="pujaRoom"
//         placeholder="Puja Room"
//         onChange={handleChange}
//         value={formData.pujaRoom}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="theaterRoom"
//         placeholder="Theater Room"
//         onChange={handleChange}
//         value={formData.theaterRoom}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="gymRoom"
//         placeholder="Gym Room"
//         onChange={handleChange}
//         value={formData.gymRoom}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="floorOfTheProperty"
//         placeholder="Floor of the Property"
//         onChange={handleChange}
//         value={formData.floorOfTheProperty}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="totalNoOfFloors"
//         placeholder="Total Number of Floors"
//         onChange={handleChange}
//         value={formData.totalNoOfFloors}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="superBuiltUp"
//         placeholder="Super Built-up Area (sq ft)"
//         onChange={handleChange}
//         value={formData.superBuiltUp}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="builtUp"
//         placeholder="Built-up Area (sq ft)"
//         onChange={handleChange}
//         value={formData.builtUp}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="carpetArea"
//         placeholder="Carpet Area (sq ft)"
//         onChange={handleChange}
//         value={formData.carpetArea}
//         style={styles.input}
//       />
//       <select
//         name="ageOfTheProperty"
//         onChange={handleChange}
//         value={formData.ageOfTheProperty}
//         style={styles.input}
//       >
//         <option value="">Select Age of Property</option>
//         <option value="<5 Years">&lt;5 Years</option>
//         <option value="5-10 Years">5-10 Years</option>
//         <option value=">10 Years">&gt;10 Years</option>
//       </select>
//     </section>

//     <section style={styles.section}>
//       <h2 style={styles.heading}>Rental Details</h2>
//       <input
//         type="number"
//         name="monthlyRent"
//         placeholder="Monthly Rent"
//         onChange={handleChange}
//         value={formData.monthlyRent}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="maintenance"
//         placeholder="Maintenance"
//         onChange={handleChange}
//         value={formData.maintenance}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         name="maintenanceAmount"
//         placeholder="Maintenance Amount"
//         onChange={handleChange}
//         value={formData.maintenanceAmount}
//         style={styles.input}
//       />
//       <select
//         name="maintenanceFrequency"
//         onChange={handleChange}
//         value={formData.maintenanceFrequency}
//         style={styles.input}
//       >
//         <option value="">Select Maintenance Frequency</option>
//         <option value="Monthly">Monthly</option>
//         <option value="Quarterly">Quarterly</option>
//         <option value="Yearly">Yearly</option>
//       </select>
//       <input
//         type="number"
//         name="securityDeposit"
//         placeholder="Security Deposit"
//         onChange={handleChange}
//         value={formData.securityDeposit}
//         style={styles.input}
//       />
//     </section>

//     <section style={styles.section}>
//       <h2 style={styles.heading}>Photo Upload</h2>
//       {photoCategories.map((category) => (
//         <div key={category} style={styles.category}>
//           <h3 style={styles.subheading}>{category}</h3>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handlePhotoUpload(category, e.target.files[0])}
//             style={styles.fileInput}
//           />
//           {formData.photos[category]?.map((photo, index) => (
//             <div key={index} style={styles.photoPreview}>
//               <img
//                 src={URL.createObjectURL(photo)}
//                 alt={`${category} ${index + 1}`}
//                 style={styles.previewImage}
//               />
//             </div>
//           ))}
//         </div>
//       ))}
//     </section>

//     <section style={styles.section}>
//       <h2 style={styles.heading}>Additional Details</h2>
//       <input
//         type="text"
//         name="propertyName"
//         placeholder="Property Name"
//         onChange={handleChange}
//         value={formData.propertyName}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="flatNo"
//         placeholder="Flat Number"
//         onChange={handleChange}
//         value={formData.flatNo}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="line1"
//         placeholder="Address Line 1"
//         onChange={(e) => handleNestedChange("address", e)}
//         value={formData.address.line1}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="line2"
//         placeholder="Address Line 2"
//         onChange={(e) => handleNestedChange("address", e)}
//         value={formData.address.line2}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="line3"
//         placeholder="Address Line 3"
//         onChange={(e) => handleNestedChange("address", e)}
//         value={formData.address.line3}
//         style={styles.input}
//       />
//       <input
//         type="date"
//         name="date"
//         onChange={(e) => handleNestedChange("availability", e)}
//         value={formData.availability.date}
//         style={styles.input}
//       />
//       <select
//         name="status"
//         onChange={(e) => handleNestedChange("availability", e)}
//         value={formData.availability.status}
//         style={styles.input}
//       >
//         <option value="">Select Availability Status</option>
//         <option value="Available">Available</option>
//         <option value="Unavailable">Unavailable</option>
//       </select>
//       <input
//         type="text"
//         name="exteriorView"
//         placeholder="Exterior View Description"
//         onChange={handleChange}
//         value={formData.exteriorView}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="livingRoom"
//         placeholder="Living Room Description"
//         onChange={handleChange}
//         value={formData.livingRoom}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="kitchen"
//         placeholder="Kitchen Description"
//         onChange={handleChange}
//         value={formData.kitchen}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="diningRoom"
//         placeholder="Dining Room Description"
//         onChange={handleChange}
//         value={formData.diningRoom}
//         style={styles.input}
//       />
//       {["bedroom1", "bedroom2", "bedroom3", "bedroom4"].map((bedroom) => (
//         <input
//           key={bedroom}
//           type="text"
//           name={bedroom}
//           placeholder={`${
//             bedroom.charAt(0).toUpperCase() + bedroom.slice(1)
//           } Description`}
//           onChange={handleChange}
//           value={formData[bedroom]}
//           style={styles.input}
//         />
//       ))}
//       {["bathroom1", "bathroom2", "bathroom3", "bathroom4"].map(
//         (bathroom) => (
//           <input
//             key={bathroom}
//             type="text"
//             name={bathroom}
//             placeholder={`${
//               bathroom.charAt(0).toUpperCase() + bathroom.slice(1)
//             } Description`}
//             onChange={handleChange}
//             value={formData[bathroom]}
//             style={styles.input}
//           />
//         )
//       )}
//       {["balcony1", "balcony2", "balcony3", "balcony4"].map((balcony) => (
//         <input
//           key={balcony}
//           type="text"
//           name={balcony}
//           placeholder={`${
//             balcony.charAt(0).toUpperCase() + balcony.slice(1)
//           } Description`}
//           onChange={handleChange}
//           value={formData[balcony]}
//           style={styles.input}
//         />
//       ))}
//       <input
//         type="text"
//         name="utilityArea"
//         placeholder="Utility Area Description"
//         onChange={handleChange}
//         value={formData.utilityArea}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         name="propertyVideo"
//         placeholder="Property Video URL"
//         onChange={handleChange}
//         value={formData.propertyVideo}
//         style={styles.input}
//       />
//     </section>

//     <button type="submit" style={styles.submitButton}>
//       Submit Property Listing
//     </button>
//   </form>
// );
