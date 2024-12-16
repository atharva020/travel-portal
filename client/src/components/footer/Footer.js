import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <h2>Travel Guide</h2>
            <p>
              Convenience is our priority to satisfy our customers, and we
              provide all the features you can easily and quickly.
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li>
              <Link to="">How to Book</Link>
            </li>
            <li>
              <Link to="">Contact Us</Link>
            </li>
            <li>
              <Link to="">Help Center</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Products</h3>
          <ul>
            <li>
              <Link to="/">Destination</Link>
            </li>
            <li>
              <Link to="/">Flight</Link>
            </li>
            <li>
              <Link to="/">Lodging</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Social</h3>
          <ul>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <Link to="">Privacy Policy</Link>
          <p>Copyright © 2024 Travel Guide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
