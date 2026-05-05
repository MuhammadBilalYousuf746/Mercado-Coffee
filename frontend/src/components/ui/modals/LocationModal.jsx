import { useState, useEffect } from "react";

function LocationModal({ isOpen, onClose, onSelectLocation, currentLocation }) {
  const [input, setInput] = useState("");

  // jab modal open ho to current location show ho
  useEffect(() => {
    if (isOpen) {
      setInput(currentLocation || "");
    }
  }, [isOpen, currentLocation]);

  // empty ho to render hi na kare
  if (!isOpen) return null;

  const handleSave = () => {
    const value = input.trim();

    if (!value) return;

    onSelectLocation(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      
      {/* Modal Box */}
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-5 shadow-xl">

        {/* Title */}
        <h2 className="text-lg font-bold mb-4">
          Set Your Location
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter your area (e.g. DHA, Clifton)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md mb-4 outline-none focus:ring-2 focus:ring-black"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-sm rounded-md bg-black text-white hover:opacity-90 transition"
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
}

export default LocationModal;