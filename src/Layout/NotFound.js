import React from "react";
import { Link } from "react-router-dom";

//displays a not found page with a link to the home when a bad URL is used
function NotFound() {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <Link to="/"> Return Home</Link>
    </div>
  );
}

export default NotFound;
