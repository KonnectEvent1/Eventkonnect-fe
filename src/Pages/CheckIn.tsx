// src/pages/CheckIn.tsx
import React, { useState } from "react";

const CheckIn: React.FC = () => {
  const [qrCode, setQrCode] = useState("");
  const [status, setStatus] = useState("");

  const handleCheckIn = async () => {
    try {
      const response = await fetch("YOUR_BACKEND_API/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrCode }),
      });
      const data = await response.json();
      setStatus(data.success ? "Check-in successful!" : "Invalid QR code.");
    } catch (err) {
      setStatus("Error connecting to server.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Smart Check-in</h1>
      <input
        type="text"
        placeholder="Scan or enter QR code"
        value={qrCode}
        onChange={(e) => setQrCode(e.target.value)}
        className="mb-4 p-3 border rounded-lg w-full max-w-md"
      />
      <button
        onClick={handleCheckIn}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Check-in
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default CheckIn;
