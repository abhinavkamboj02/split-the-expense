export default function Stats({ items }) {
  if (items.length === 0) {
    return <p className="stats">Add items for journey ✈️</p>;
  }
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentagePacked = Math.round((packedItems / totalItems) * 100);
  return (
    <footer className="stats">
      {percentagePacked === 100 ? (
        <em>Hurray!! Ready for Journey ✈️ </em>
      ) : (
        <em>
          You Have {totalItems} Items on your list,and already packed{" "}
          {percentagePacked} % of items
        </em>
      )}
    </footer>
  );
}
