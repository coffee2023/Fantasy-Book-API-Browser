import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">🏠 Dashboard</Link>
    </div>
  );
}