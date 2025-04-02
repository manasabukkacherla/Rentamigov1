import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const TransportNearby: React.FC = () => {
  const [transportData, setTransportData] = useState<
    { name: string; distance: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { name: "Kundalahalli Bus Stop", distance: "1.3 km" },
        { name: "Whitefield Metro Station", distance: "2.5 km" },
        { name: "Marathahalli Bridge", distance: "3.2 km" },
        { name: "ITPL Bus Stop", distance: "2.0 km" },
        { name: "Bellandur Gate", distance: "4.5 km" },
      ];
      setTransportData(data);
    };

    fetchData();
  }, []);

  const containerStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: "100%",
    width: "100%",
  };

  const headerStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const subHeaderStyle: React.CSSProperties = {
    color: "#777",
    fontSize: "14px",
    marginBottom: "15px",
  };

  const transportFlexStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    listStyle: "none",
    padding: 0,
  };

  const flexItemStyle: React.CSSProperties = {
    flex: "1 1 calc(33.33% - 20px)", // Default: 3 items per row
    maxWidth: "calc(33.33% - 20px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "6px",
    border: "1px solid #eee",
    boxSizing: "border-box",
  };

  const transportNameStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
  };

  const distanceStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#888",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>What's nearby?</div>
      <div style={subHeaderStyle}>
        See nearby utilities, facilities, transport, hospitals, etc.
      </div>

      <div>
        <ul style={transportFlexStyle}>
          {transportData.map((item, index) => (
            <li key={index} style={flexItemStyle}>
              <div style={transportNameStyle}>
                <FaMapMarkerAlt style={{ color: "#555" }} /> {item.name}
              </div>
              <div style={distanceStyle}>{item.distance}</div>
            </li>
          ))}
        </ul>
      </div>
      <style>
        {`
          /* Default: 3 items per row */
          li {
            flex: 1 1 calc(33.33% - 20px);
            max-width: calc(33.33% - 20px);
          }

          /* Medium screens: 2 items per row */
          @media (max-width: 992px) {
            li {
              flex: 1 1 calc(50% - 20px);
              max-width: calc(50% - 20px);
            }
          }

          /* Small screens: 1 item per row */
          @media (max-width: 768px) {
            li {
              flex: 1 1 100%;
              max-width: 100% !important; /* Ensure full width */
            }

            ul {
              gap: 15px; /* Add spacing between items */
            }
          }
        `}
      </style>
    </div>
  );
};

export default TransportNearby;
