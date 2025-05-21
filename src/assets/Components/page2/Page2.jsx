import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeContext } from "../../Resumecontext.jsx";
import ResumePreview from "../preview/Resumepreview.jsx";
import "./Page2.css";

function Page2() {
  const navigate = useNavigate();
  const { resume_data, set_resume_data } = useContext(ResumeContext);

  const [education_list, set_education_list] = useState([
    { degree: "", institute: "", cgpa: "", duration: "" },
  ]);

  useEffect(() => {
    if (resume_data.education?.length > 0) {
      set_education_list(resume_data.education);
    }
    // Run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    set_resume_data((prev) => ({
      ...prev,
      education: education_list,
    }));
  }, [education_list]);
  
  

  const update_field = (index, event) => {
    const updated_list = [...education_list];
    updated_list[index][event.target.name] = event.target.value;
    set_education_list(updated_list);
  };

  const add_education = () => {
    set_education_list([
      ...education_list,
      { degree: "", institute: "", cgpa: "", duration: "" },
    ]);
  };

  const remove_education = (index) => {
    const updated_list = [...education_list];
    updated_list.splice(index, 1);
    set_education_list(updated_list);
  };

  const go_to_next = () => {
    set_resume_data({ ...resume_data, education: education_list });
    navigate("/page3");
  };

  const go_to_previous = () => {
    set_resume_data({ ...resume_data, education: education_list });
    navigate("/page1");
  };

  return (
    <div className="page2_container">
      <div className="page2_form">
        <h2>Education Details</h2>

        {education_list.map((education, index) => (
          <div key={index} className="education_entry">
            <label>Degree</label>
            <input
              type="text"
              name="degree"
              value={education.degree}
              onChange={(e) => update_field(index, e)}
              placeholder="e.g., B.Tech in Computer Science"
            />

            <label>Institute</label>
            <input
              type="text"
              name="institute"
              value={education.institute}
              onChange={(e) => update_field(index, e)}
              placeholder="e.g., NIT Durgapur"
            />

            <label>CGPA</label>
            <input
              type="text"
              name="cgpa"
              value={education.cgpa}
              onChange={(e) => update_field(index, e)}
              placeholder="e.g., 8.5"
            />

            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={education.duration}
              onChange={(e) => update_field(index, e)}
              placeholder="e.g., 2021 - 2025"
            />

            {education_list.length > 1 && (
              <button
                className="remove_button"
                onClick={() => remove_education(index)}
              >
                Remove
              </button>
            )}

            <hr />
          </div>
        ))}

        <button className="add_button" onClick={add_education}>
          + Add More
        </button>

        <div className="navigation_buttons">
        <button className="prev" onClick={go_to_previous}>Previous</button>
        <button className="next" onClick={go_to_next}>Next</button>
        </div>


      </div>

      <div className="page2_preview">
        <ResumePreview />
      </div>
    </div>
  );
}

export default Page2;
