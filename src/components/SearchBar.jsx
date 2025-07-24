export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search book title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
