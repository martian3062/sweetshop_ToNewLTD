export default function SearchBar({ setQuery }) {
  return (
    <input
      placeholder="Search sweets..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
