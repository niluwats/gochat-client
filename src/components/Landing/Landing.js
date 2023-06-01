import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="landing-heading-container">
          <p className="landing-title">GET STARTED WITH GO CHAT...</p>
        </div>

        <div className="btn-container">
          <div className="btn1-container">
            <button
              className="btn btn-lg btn-primary"
              onClick={() => navigate(`login`)}
            >
              Login
            </button>
          </div>
          <div className="btn2-container">
            <button
              className="btn btn-lg btn-secondary"
              onClick={() => navigate(`signup`)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
