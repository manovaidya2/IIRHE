import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import FocusAreaSlider from "../FocusAreaSlider/FocusAreaSlider";
import HowSupport from "../../Pages/HowSupport/HowSupport";
import axios from "axios";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [zones, setZones] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [showMore, setShowMore] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch universities data
        const universitiesResponse = await axios.get(
          "https://api.iirhe.org.in/api/all-multi-universities-accordign-zone"
        );

        // Fetch disciplines data
        const disciplinesResponse = await axios.get(
          "https://api.iirhe.org.in/api/all-discipline"
        );

        if (universitiesResponse.data.success) {
          setZones(universitiesResponse.data.data);
          const initialShowMoreState = universitiesResponse.data.data.reduce(
            (acc, zone) => ({
              ...acc,
              [zone.UniversityZone]: false,
            }),
            {}
          );
          setShowMore(initialShowMoreState);
        }

        if (disciplinesResponse.status === 200) {
          setDisciplines(disciplinesResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleVisibility = (zone) => {
    setShowMore((prevState) => ({
      ...prevState,
      [zone]: !prevState[zone],
    }));
  };

  const getPartialUniversitiesHTML = (htmlString, limit = 5) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const lis = [...tempDiv.querySelectorAll("li")];
    if (lis.length <= limit) return htmlString;

    const ul = document.createElement("ul");
    lis.slice(0, limit).forEach((li) => ul.appendChild(li.cloneNode(true)));

    return ul.outerHTML + `<p>...and more</p>`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(true);
    }
  };

  // Filter disciplines based on search term
  const filteredDisciplines = disciplines.filter((discipline) =>
    discipline.DisciplinesName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="homeBanner">
        <div className="overlay">
          <div className="container-fluid">
            <div className="heroContent">
              <h2>
                Personalized Mentorship, Expert Guidance, and Complete Support
                for Aspiring and Pursuing PhD Students.
              </h2>
              <form onSubmit={handleSearch} className="position-relative heroSearchbar">
                <i className="bi bi-search position-absolute search-icon"></i>
                <input
                  type="text"
                  placeholder="Search for disciplines..."
                  className="form-control heroInput"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="position-absolute search-button"
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#fff'
                  }}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Show search results if search was performed */}
      {showResults && (
        <section className="northSouth">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
             <h3 style={{ color: 'white' }}>Search Results for "{searchTerm}"</h3>
            </div>
            <div className="row">
              {filteredDisciplines.length === 0 ? (
                <div className="text-center my-4">
                  <p>No disciplines found matching your search.</p>
                </div>
              ) : (
                filteredDisciplines.map((discipline, index) => (
                  <div className="col-6 col-md-4 col-lg-3 mb-4" key={index}>
                    <Link 
                      to={`/courses/course-overview/${discipline.DisciplinesName}`} 
                      className="text-decoration-none"
                    >
                      <div className="focus-area-tile text-center p-3 shadow-sm bg-white rounded">
                        <img
                          src={`https://api.iirhe.org.in/${discipline.DisciplinesLogo}`}
                          alt={discipline.DisciplinesName}
                          className="img-fluid mb-2"
                          style={{ height: "80px", objectFit: "contain" }}
                        />
                        <p className="m-0">{discipline.DisciplinesName}</p>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
            
            {/* Back to Home Button */}
            <div className="text-center mt-4">
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setShowResults(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary back-to-home-btn"
                style={{
                  padding: "10px 25px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "green",
                  color: "white",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  marginTop: "30px"
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Only show these sections if no search was performed */}
      {!showResults && (
        <>
          <section className="univercityAbout">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="univercityAboutBox">
                    <h4>MENTORSHIP</h4>
                    <p>
                      Our mentors guide you through every phase of your PhD journey,
                      breaking down complex steps into manageable tasks and keeping
                      you motivated to achieve your goals.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="univercityAboutBox">
                    <h4>TOPIC SELECTION</h4>
                    <p>
                      We help you choose a meaningful and impactful research topic
                      that aligns with your goals and sets the foundation for a
                      successful PhD journey.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="univercityAboutBox">
                    <h4>RESEARCH GUIDANCE</h4>
                    <p>
                      We provide clear guidance on structuring your research
                      documents—proposals, synopses, and more—so you stay organized
                      and present your work professionally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FocusAreaSlider />
          <HowSupport />
        </>
      )}
    </>
  );
};

export default Hero;