import React from "react";

export default function NotFoundPage() {
  return (
    <div style={containerStyle}>
      <div className="content">
        <div className="number">404</div>
        <div className="subtitle">Page Not Found</div>
        <div className="description">
          Oops! We can&apos;t seem to find the page you&apos;re looking for.
        </div>
      </div>
      {/* CSS-in-JS for animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          60% {
            opacity: 0.8;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes rotateGlow {
          0% {
            text-shadow: 0 0 10px #ff6b6b, 0 0 20px #ff6b6b, 0 0 30px #ff6b6b;
            transform: rotate(0deg);
          }
          50% {
            text-shadow: 0 0 20px #fbc531, 0 0 30px #fbc531, 0 0 40px #fbc531;
            transform: rotate(3deg);
          }
          100% {
            text-shadow: 0 0 10px #ff6b6b, 0 0 20px #ff6b6b, 0 0 30px #ff6b6b;
            transform: rotate(0deg);
          }
        }
        .content {
          text-align: center;
          animation: fadeInScale 1.2s ease-out;
        }
        .number {
          font-size: 10rem;
          font-weight: bold;
          color: #333;
          animation: rotateGlow 3s infinite linear;
          margin: 0;
        }
        .subtitle {
          font-size: 2rem;
          margin-top: 20px;
          color: #555;
          font-weight: 500;
        }
        .description {
          font-size: 1.2rem;
          margin-top: 10px;
          color: #777;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff", // crisp white background
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "20px",
};
