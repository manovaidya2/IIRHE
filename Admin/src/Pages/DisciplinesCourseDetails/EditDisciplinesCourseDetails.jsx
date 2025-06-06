import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const EditDisciplinesCourseDetails = () => {
  const { id } = useParams(); // Assuming you're passing the course ID in the URL
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [disciplines, setDisciplines] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [formData, setFormData] = useState({
    Disciplines: '',
    DisciplinesCourseName: '',
    CourseOverView: '',
    Studentenrolledtaughtto: ''
  });

  useEffect(() => {
    // Fetch data for Disciplines and DisciplinesCourseName
    const fetchData = async () => {
      try {
        const disciplinesResponse = await axios.get('https://api.iirhe.org.in/api/all-discipline');
        const courseNamesResponse = await axios.get('https://api.iirhe.org.in/api/all-disciplines-course-make-product');
        setDisciplines(disciplinesResponse.data.data);
        setCourseNames(courseNamesResponse.data.data);

        // Fetch the existing course details
        const courseResponse = await axios.get(`https://api.iirhe.org.in/api/single-disciplines-course-details/${id}`);
        setFormData(courseResponse.data.data);
        setFilteredCourses(courseNamesResponse.data.data.filter(course => course.Disciplines._id === courseResponse.data.data.Disciplines));
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Disciplines') {
      // Filter courses based on selected discipline
      const filtered = courseNames.filter(course => course.Disciplines._id === value);
      setFilteredCourses(filtered);
      setFormData({ ...formData, [name]: value, DisciplinesCourseName: '' }); // Reset course name
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, Studentenrolledtaughtto: content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`https://api.iirhe.org.in/api/update-disciplines-course-details/${id}`, formData);
      toast.success("Disciplines Course Details updated successfully");
      navigate('/all-discipline-course-details'); // Redirect to list after success
    } catch (error) {
      toast.error("Error updating details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Edit Disciplines Course Details</h4>
        </div>
        <div className="links">
          <Link to="/all-discipline-course-details" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="Disciplines" className="form-label">Disciplines<span className='text-danger'>*</span></label>
            <select
              name='Disciplines'
              className="form-select"
              id="Disciplines"
              value={formData.Disciplines}
              onChange={handleChange}>
              <option value="" disabled>Select Disciplines</option>
              {disciplines.map((discipline) => (
                <option key={discipline._id} value={discipline._id}>{discipline.DisciplinesName}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="DisciplinesCourseName" className="form-label">Course Name<span className='text-danger'>*</span></label>
            <select
              name='DisciplinesCourseName'
              className="form-select"
              id="DisciplinesCourseName"
              value={formData.DisciplinesCourseName}
              onChange={handleChange}
              disabled={!filteredCourses.length}>
              <option value="" disabled>Select Course Name</option>
              {filteredCourses.map((course) => (
                <option key={course._id} value={course._id}>{course.DisciplinesCourseName}</option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="CourseOverView" className="form-label">Course Overview<span className='text-danger'>*</span></label>
            <textarea
              name='CourseOverView'
              className="form-control"
              id="CourseOverView"
              value={formData.CourseOverView}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="Studentenrolledtaughtto" className="form-label">Students Enrolled / Taught To<span className='text-danger'>*</span></label>
            <JoditEditor
              value={formData.Studentenrolledtaughtto}
              onChange={handleEditorChange}
            />
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className={`${isLoading ? 'not-allowed' : 'allowed'}`}
              disabled={isLoading}>
              {isLoading ? "Please Wait..." : "Update Details"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditDisciplinesCourseDetails;
