import Item from "./Item";
import { useState } from "react";
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") {
    sortedItems = [...items];
  }
  if (sortBy === "description") {
    sortedItems = items.toSorted((a, b) =>
      a.description.localeCompare(b.description)
    );
  }
  if (sortBy === "packed") {
    sortedItems = items.toSorted((a, b) => Number(b.packed) - Number(a.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList} className="">
          Clear List
        </button>
      </div>
    </div>
  );
}
