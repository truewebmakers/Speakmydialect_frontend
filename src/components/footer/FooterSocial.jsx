import { Link } from "react-router-dom";

export default function FooterSocial() {
  return (
    <>
      <div className="social-widget text-center text-md-end">
        <div className="social-style1">
          <Link className="text-white me-2 fw500 fz17" to="/">
            Follow us
          </Link>
          <a>
            <i className="fab fa-facebook-f list-inline-item" />
          </a>
          <a>
            <i className="fab fa-instagram list-inline-item" />
          </a>
          <a>
            <i className="fab fa-linkedin-in list-inline-item" />
          </a>
        </div>
      </div>
    </>
  );
}
