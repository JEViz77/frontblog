// src/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand text-primary fw-bold" to="/">Blog</Link>
      </div>
    </nav>
  );
}

export default Navbar;
