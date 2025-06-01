import { useState } from "react";
import PackingList from "./PackingList";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";
export default function App() {
  const [items, setItems] = useState([]);
  // const [check, setCheck] = useState(false);

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(item) {
    setItems((items) =>
      items.filter((searchItem) => searchItem.id !== item.id)
    );
  }
  function handleCheck(itemId) {
    setItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clearList() {
    const confirmed = window.confirm("Are you sure to clear the list");
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleCheck}
        onClearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
