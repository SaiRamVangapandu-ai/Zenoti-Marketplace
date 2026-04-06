"use client";

const slots = [
  "9:00 AM", "10:30 AM", "12:00 PM",
  "2:00 PM", "4:30 PM", "6:00 PM",
];

interface TimeSlotSelectorProps {
  selected: string | null;
  onSelect: (slot: string) => void;
}

export default function TimeSlotSelector({ selected, onSelect }: TimeSlotSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          className={`rounded-xl py-2.5 text-sm font-medium transition-all ${
            selected === slot
              ? "bg-violet-600 text-white ring-2 ring-violet-600 ring-offset-2"
              : "bg-gray-50 text-gray-700 hover:bg-violet-50 hover:text-violet-600"
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
