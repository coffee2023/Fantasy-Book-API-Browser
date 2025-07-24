export default function SummaryStats({ data }) {
  if (!data.length) return <p>No books match.</p>;

  const years = data.map((b) => b.first_publish_year).filter(Boolean);
  const avgYear = (
    years.reduce((a, b) => a + b, 0) / years.length
  ).toFixed(0);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const authorCounts = data.reduce((acc, book) => {
    const name = book.author_name?.[0] || "Unknown";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const topAuthor = Object.entries(authorCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="summary">
      <div className="stats-row">
        <div className = "stat-block">
            <p> 📖 Books Displayed:</p>
            <p>{data.length}</p>
        </div>
        <div className = "stat-block">
            <p> 📆 Publication Stats:</p>
            <p>Earliest: {minYear} | Latest: {maxYear}</p>
        </div>
        <div className = "stat-block">
            <p>🧝 Most Common Author:</p>
            <p>{topAuthor?.[0]} ({topAuthor?.[1]} books)</p>
        </div>
      </div>
      <br></br>
    </div>
  );
}
