import "../css/Component.css";
import { Link } from "react-router-dom";
const Menu = ({ title }) => {
  return (
    <div className="menu">
      <div className="item">
        <a href="#" className="link">
          <span>{title}</span>
          <svg viewBox="0 0 360 360" xmlSpace="preserve">
            <g id="SVGRepo_iconCarrier">
              <path
                id="XMLID_225_"
                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
              ></path>
            </g>
          </svg>
        </a>
        <div className="submenu">
          <div className="submenu-item">
            <Link to="/Signup">
              <a href="#" className="submenu-link">
                User
              </a>
            </Link>
          </div>

          <div className="submenu-item">
            <Link to="/DocSignup">
              <a href="#" className="submenu-link">
                Doctor
              </a>
            </Link>
          </div>
          <div className="submenu-item">
            <Link to="/AdminSign">
              <a href="#" className="submenu-link">
                Admin
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
