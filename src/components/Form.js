import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [num, SetNum] = useState(1);

  function submitHandler(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, num, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    SetNum(1);
  }
  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your trip</h3>
      <select value={num} onChange={(e) => SetNum(() => e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(() => e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}
