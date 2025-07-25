import React, { useEffect, useState } from "react";
import BookList from "./BookList";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import SummaryStats from "./SummaryStats";
import Charts from "./Charts";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("https://openlibrary.org/search.json?q=fantasy&limit=50");
      const json = await res.json();
      setBooks(json.docs);
    };
    fetchBooks();
  }, []);

  const filtered = books
    .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => {
      const year = b.first_publish_year;
      if (!year) return false;

      if (yearFilter === "All") return true;
      if (yearFilter === "Before 1950") return year < 1950;
      if (yearFilter === "1950-1999") return year >= 1950 && year <= 1999;
      if (yearFilter === "2000-2009") return year >= 2000 && year <= 2009;
      if (yearFilter === "2010-2025") return year >= 2010 && year <= 2025;

      return true;
    });

  const yearRanges = [
    "All",
    "Before 1950",
    "1950-1999",
    "2000-2009",
    "2010-2025",
  ];

  return (
    <div className="main-content">
      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <Filter value={yearFilter} onChange={setYearFilter} options={yearRanges} />
      </div>
      <SummaryStats data={filtered} />
      <Charts data={filtered} />
      <BookList books={filtered.slice(0, 51)} />
    </div>
  );
}
