export default function Filter({ value, onChange, options }) {
  return (
    <select className="filter" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
