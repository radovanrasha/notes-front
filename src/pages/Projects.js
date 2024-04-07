import portfolio from "../assets/portfolio.png";
import weatherapp from "../assets/weatherapp.png";

const Projects = () => {
  return (
    <div className="container">
      <p className="header-div"> &lt;Projects/&gt;</p>
      <div class="container">
        <div class="profile-wrapper">
          <div class="profile">
            <div class="profile-image">
              <img src={portfolio} alt="Profile" />
            </div>
            <ul class="social-icons">
              <li>
                <a
                  href="https://radovanrasha.onrender.com"
                  title="Portfolio Website"
                >
                  <svg
                    style={{ color: "black" }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7,6 L3,12 L7,18"></path>
                    <path d="M10,18 L14,6"></path>
                    <path d="M17,6 L21,12 L17,18"></path>
                  </svg>
                </a>
              </li>
            </ul>
            <div class="profile-name">
              <h2>Portfolio website</h2>
              <div class="profile-bio">
                This is my personal portfolio website. On this site i presented
                myself and all of my skills.
              </div>
            </div>
          </div>
        </div>
        <div class="profile-wrapper">
          <div class="profile">
            <div class="profile-image">
              <img src={weatherapp} alt="Profile" />
            </div>
            <ul class="social-icons">
              <li>
                <a
                  href="https://weatherapp-radovanrasha.onrender.com"
                  title="Weather Website"
                >
                  <svg
                    style={{ color: "black" }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7,6 L3,12 L7,18"></path>
                    <path d="M10,18 L14,6"></path>
                    <path d="M17,6 L21,12 L17,18"></path>
                  </svg>
                </a>
              </li>
            </ul>
            <div class="profile-name">
              <h2>Weather website</h2>
              <div class="profile-bio">
                This is website that I made using React and two free APIs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
