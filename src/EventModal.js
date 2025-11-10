import React, { useEffect } from "react";

const EventModal = ({ event, onClose }) => {
  const dateParts = event.date.split(" ");
  const month = dateParts[0].toUpperCase();
  const day = dateParts[1].replace(",", "");

  useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

  return (
    <div
      style={{
        borderRadius: 24,
        boxShadow: "0 4px 24px rgba(128,0,0,0.08)",
        overflow: "hidden",
        background: "#fff",
        maxWidth: 480, // smaller modal
        margin: "40px auto",
        fontFamily: "'Montserrat', serif",
        position: "relative"
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 16,
          right: 24,
          fontSize: 32,
          background: "none",
          border: "none",
          color: "#F7E36B", // gold color
          cursor: "pointer",
          zIndex: 2
        }}
      >
        ×
      </button>
      <div
        style={{
          background: "linear-gradient(180deg, #8B1B1B 0%, #A32B2B 100%)",
          padding: "24px 0 16px 0",
          textAlign: "center",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderTop: "6px solid #F7E36B"
        }}
      >
        <div
          style={{
            color: "#F7E36B",
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: 1,
            marginBottom: 8
          }}
        >
          {month}
        </div>
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1
          }}
        >
          {day}
        </div>
      </div>
      <div style={{ padding: "28px 32px 24px 32px" }}>
        <div
          style={{
            color: "#8B1B1B",
            fontWeight: 700,
            fontSize: 32,
            fontFamily: "'Lora', serif",
            marginBottom: 20
          }}
        >
          {event.title}
        </div>
        <div
          style={{
            color: "#757575",
            fontSize: 20,
            fontWeight: 400,
            marginBottom: 24,
            lineHeight: 1.4
          }}
        >
          {event.description}
        </div>
        <div style={{ fontSize: 18, lineHeight: 2 }}>
          <span style={{ color: "#8B1B1B", fontWeight: 700 }}>Date:</span> {event.date}
          <br />
          <span style={{ color: "#8B1B1B", fontWeight: 700 }}>Time:</span> {event.time}
          <br />
          <span style={{ color: "#8B1B1B", fontWeight: 700 }}>Location:</span> {event.location}
          <br />
          <a
            href={event.venueLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#A32B2B",
              fontWeight: 600,
              textDecoration: "underline"
            }}
          >
            Open in Google Maps
          </a>
        </div>
        <div style={{ marginTop: 24 }}>
          <iframe
            title="Google Map"
            width="100%"
            height="180"
            frameBorder="0"
            style={{ border: 0, borderRadius: 12 }}
            src={`https://www.google.com/maps?q=${event.coordinates.lat},${event.coordinates.lng}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EventModal;