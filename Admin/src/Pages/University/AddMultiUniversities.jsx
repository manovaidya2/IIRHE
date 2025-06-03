import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const AddMultiUniversities = () => {
  const [universityZone, setUniversityZone] = useState("");
  const [universities, setUniversities] = useState('');
  const [allUniversityZones, setAllUniversityZones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 const [externalLink, setExternalLink] = useState("");
  // Fetch available UniversityZones when component mounts
  useEffect(() => {
    const fetchUniversityZones = async () => {
      try {
        const response = await axios.get(
          "https://api.iirhe.org/api/all-universities"
        ); // Backend endpoint for UniversityZone
        setAllUniversityZones(response.data.data);
      } catch (error) {
        console.error("Error fetching UniversityZones", error);
      }
    };

    fetchUniversityZones();
  }, []);

  // Handle university name input
  const handleUniversityChange = (e, index) => {
    const newUniversities = [...universities];
    newUniversities[index] = e.target.value;
    setUniversities(newUniversities);
  };

  // Add new university input field
  const addUniversityField = () => {
    setUniversities([...universities, ""]);
  };

  // Remove university input field
  const removeUniversityField = (index) => {
    const newUniversities = universities.filter((_, i) => i !== index);
    setUniversities(newUniversities);
  };
  const handleEditorChange = (content) => {
    setUniversities(content);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!universityZone || !universities) {
      Swal.fire(
        "Error",
        "Please select a University Zone and provide university names",
        "error"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.iirhe.org/api/add-multi-universities",
        {
          UniversityZone: universityZone,
          Universities: universities,
          Link: externalLink
        }
      );

      Swal.fire("Success", "Universities added successfully", "success");
      // Reset form after successful submission
      setUniversityZone("");
      setUniversities("");
      navigate("/all-university"); // Redirect to the universities list page
    } catch (error) {
      Swal.fire("Error", "Failed to add universities", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bread">
        <div className="head">
          <h4>Add Multiple Universities</h4>
        </div>
        <div className="links">
          <Link to="/all-university" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form onSubmit={handleSubmit} className="row g-3">
          {/* University Zone Selection */}
          <div className="col-md-6">
            <label htmlFor="universityZone" className="form-label">
              University Zone
            </label>
            <select
              id="universityZone"
              className="form-control"
              value={universityZone}
              onChange={(e) => setUniversityZone(e.target.value)}
              required
            >
              <option value="">Select University Zone</option>
              {allUniversityZones.map((zone) => (
                <option key={zone._id} value={zone._id}>
                  {zone.UniversityZone}
                </option>
              ))}
            </select>
          </div>

          {/* Universities Input Fields */}
          {/* <div className="col-md-6">
                        <label className="form-label">Universities</label>
                        {universities.map((university, index) => (
                            <div key={index} className="university-input">
                                <input
                                    type="text"
                                    className="form-control mb-1"
                                    value={university}
                                    onChange={(e) => handleUniversityChange(e, index)}
                                    placeholder="Enter University Name"
                                    required
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeUniversityField(index)}
                                        className="btn btn-danger mt-1 mb-1"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" className="btn btn-success mt-1" onClick={addUniversityField}>
                            Add Another University
                        </button>

                    </div> */}

          <div className="col-12">
            <label htmlFor="Universities" className="form-label">
              University Details<span className="text-danger">*</span>
            </label>
            <JoditEditor
              value={universities}
              onChange={handleEditorChange}
              required
            />
          </div>
         
            <div className="col-12">
              <label htmlFor="Link" className="form-label">
                Add Link<span className="text-danger">*</span>
              </label>
             <textarea
  name="link"
  className="form-control"
  id="CourseOverView"
  value={externalLink}
  onChange={(e) => setExternalLink(e.target.value)}
  placeholder="Add Link"
  required
/>
            </div>
      
          {/* Submit Button */}
          <div className="col-12 text-center">
            <button
              type="submit"
              className={`${isLoading ? "not-allowed" : "allowed"}`}
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMultiUniversities;
