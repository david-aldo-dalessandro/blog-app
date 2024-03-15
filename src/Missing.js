import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="Missing">
      <h2>Page Not Found</h2>
      <p>
        <Link to="/">Return Home</Link>
      </p>
    </main>
  );
};

export default Missing;
