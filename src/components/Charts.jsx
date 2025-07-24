import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function Charts({ data }) {
  const yearData = data.reduce((acc, book) => {
    const year = book.first_publish_year;
    if (!year) return acc;
    const found = acc.find((a) => a.year === year);
    if (found) found.count++;
    else acc.push({ year, count: 1 });
    return acc;
  }, []);

  const authorData = data.reduce((acc, book) => {
    const name = book.author_name ? book.author_name[0] : "Unknown";
    const found = acc.find((a) => a.name === name);
    if (found) found.count++;
    else acc.push({ name, count: 1 });
    return acc;
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1"];

  return (
    <div className="charts">
      <div className="chart-box">
        <h3>📅 Books by Year</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearData.sort((a, b) => a.year - b.year)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>👤 Top Authors</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={authorData.sort((a, b) => b.count - a.count).slice(0, 5)}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {authorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
