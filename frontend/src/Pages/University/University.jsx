// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import search from "../../Images/search.png";
// import "./university.css";
// import { Helmet } from "react-helmet";

// const University = () => {
//   const [zones, setZones] = useState([]);
//   const [showMore, setShowMore] = useState({});
//   const [searchTerm, setSearchTerm] = useState(""); // ✅ New: state for search input

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });

//     const fetchUniversities = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.iirhe.org.in/api/all-multi-universities-accordign-zone"
//         );

//         if (response.data.success) {
//           setZones(response.data.data);
//           const initialShowMoreState = response.data.data.reduce(
//             (acc, zone) => ({
//               ...acc,
//               [zone.UniversityZone]: false,
//             }),
//             {}
//           );
//           setShowMore(initialShowMoreState);
//         }
//       } catch (error) {
//         console.error("Error fetching university data:", error);
//       }
//     };

//     fetchUniversities();
//   }, []);

//   const toggleVisibility = (zone) => {
//     setShowMore((prevState) => ({
//       ...prevState,
//       [zone]: !prevState[zone],
//     }));
//   };

//   // ✅ Filtered zones based on search
//   const filteredZones = zones.filter((zone) =>
//     zone.Universities?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <Helmet>
//         <title>University Search - Find Accredited Universities | IIRHE</title>
//         <meta
//           name="description"
//           content="Explore accredited universities and PhD programs across different zones in India. Find the best university that matches your professional aspirations."
//         />
//         <meta
//           name="keywords"
//           content="university search, accredited universities, PhD programs, UGC approved universities, NAAC accredited universities, higher education"
//         />
//         <meta name="author" content="Your Company Name" />
//       </Helmet>

//       <section className="univercityMain">
//         <div className="container">
//           <div className="documentShadow mx-auto text-center">
//             <img src={search} alt="mentors" />
//             <h3>Search Your University</h3>

//             {/* ✅ Search Input */}
//             <input
//               type="text"
//               placeholder="Type university name..."
//               className="universitySearchInput"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{
//                 marginTop: "10px",
//                 padding: "8px 12px",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 width: "80%",
//                 maxWidth: "500px",
//               }}
//             />
//           </div>

//           <p className="universityContent">
//             Our platform links students to a selection of universities that
//             match their interests and professional aspirations. During the
//             screening process of institutions, we verify that they are
//             accredited by NAAC and approved by UGC, demonstrating their
//             dedication to providing quality education and advancing research.
//             Our extensive database enables students to explore leading
//             universities that provide PhD programs, enabling a fulfilling
//             journey with promising research prospects. If you're seeking
//             positions or renowned schools to pursue your studies effectively and
//             efficiently.
//           </p>
//         </div>
//       </section>

//       <section className="northSouth">
//         <div className="container">
//           <div className="row">
//             {filteredZones.map((zone, index) => (
//               <div className="col-md-6 mb-3" key={index}>
//                 <div className="eastIndiaCard">
//                   <h2 className="mb-4">{zone.UniversityZone}</h2>

//                   <div
//                     className="content-box"
//                     dangerouslySetInnerHTML={{ __html: zone.Universities }}
//                   ></div>

//                   {zone.Link && (
//                     <a
//                       href={zone.Link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="viewfulllist"
//                       style={{ margin: "0px 4px" }}
//                     >
//                       View Link
//                     </a>
//                   )}
//                   <button
//                     className="viewfulllist"
//                     onClick={() => toggleVisibility(zone.UniversityZone)}
//                   >
//                     {showMore[zone.UniversityZone]
//                       ? "Show Less"
//                       : "View Full List"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default University;



import React, { useEffect, useState } from "react";
import axios from "axios";
import search from "../../Images/search.png";
import "./university.css";
import { Helmet } from "react-helmet";

const University = () => {
  const [zones, setZones] = useState([]);
  const [showMore, setShowMore] = useState({});
  const [zoneList, setZoneList] = useState([]); // Changed from universityList to zoneList
  const [selectedZone, setSelectedZone] = useState(""); // Changed from selectedUniversity to selectedZone

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          "https://api.iirhe.org.in/api/all-multi-universities-accordign-zone"
        );

        if (response.data.success) {
          const data = response.data.data;
          setZones(data);

          // Extract unique zone names
          const uniqueZones = [...new Set(data.map(zone => zone.UniversityZone))].sort();
          setZoneList(uniqueZones);

          // Initialize showMore state for each zone to false
          const initialShowMoreState = data.reduce(
            (acc, zone) => ({
              ...acc,
              [zone.UniversityZone]: false,
            }),
            {}
          );
          setShowMore(initialShowMoreState);
        }
      } catch (error) {
        console.error("Error fetching university data:", error);
      }
    };

    fetchUniversities();
  }, []);

  const toggleVisibility = (zone) => {
    setShowMore((prevState) => ({
      ...prevState,
      [zone]: !prevState[zone],
    }));
  };

  // Helper: Get partial HTML with first `limit` <li> items only
  const getPartialUniversitiesHTML = (htmlString, limit = 5) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const lis = [...tempDiv.querySelectorAll("li")];
    if (lis.length <= limit) return htmlString;

    const ul = document.createElement("ul");
    lis.slice(0, limit).forEach((li) => ul.appendChild(li.cloneNode(true)));

    return ul.outerHTML + `<p>...and more</p>`;
  };

  // Filter zones by selected zone from dropdown
  const filteredZones = selectedZone
    ? zones.filter((zone) => 
        zone.UniversityZone.toLowerCase().includes(selectedZone.toLowerCase())
      )
    : zones;

  return (
    <>
      <Helmet>
        <title>University Search - Find Accredited Universities | IIRHE</title>
        <meta
          name="description"
          content="Explore accredited universities and PhD programs across different zones in India."
        />
        <meta
          name="keywords"
          content="university search, accredited universities, PhD programs, UGC approved, NAAC accredited"
        />
        <meta name="author" content="IIRHE" />
      </Helmet>

      <section className="univercityMain">
        <div className="container">
          <div className="documentShadow mx-auto text-center">
            <img src={search} alt="search" />
            <h3>Search Your University</h3>

            {/* Dropdown for zones */}
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="universityDropdown"
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "80%",
                maxWidth: "500px",
              }}
            >
              <option value="">-- Select a university zone --</option>
              {zoneList.map((zone, idx) => (
                <option key={idx} value={zone}>
                  {zone}
                </option>
              ))}
            </select>

            {/* Clear Selection Button */}
            {selectedZone && (
              <button
                onClick={() => setSelectedZone("")}
                className="clearSelectionBtn"
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Clear Selection
              </button>
            )}
          </div>

          <p className="universityContent">
            Our platform links students to a selection of universities that match their interests and professional aspirations.
            All universities listed are NAAC accredited and UGC approved, offering quality education and research prospects.
          </p>
        </div>
      </section>

      <section className="northSouth">
        <div className="container">
          <div className="row">
            {filteredZones.length === 0 ? (
              <div className="text-center my-4">
                <p>No university zones found matching your selection.</p>
              </div>
            ) : (
              filteredZones.map((zone, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="eastIndiaCard">
                    <h2 className="mb-4">{zone.UniversityZone}</h2>

                    <div
                      className="content-box"
                      dangerouslySetInnerHTML={{
                        __html: showMore[zone.UniversityZone]
                          ? zone.Universities
                          : getPartialUniversitiesHTML(zone.Universities, 5),
                      }}
                    ></div>

                    {zone.Link && (
                      <a
                        href={zone.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="viewfulllist"
                        style={{ margin: "0px 4px" }}
                      >
                        View Link
                      </a>
                    )}

                    <button
                      className="viewfulllist"
                      onClick={() => toggleVisibility(zone.UniversityZone)}
                    >
                      {showMore[zone.UniversityZone] ? "Show Less" : "View Full List"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default University;