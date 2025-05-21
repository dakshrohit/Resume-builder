import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeContext } from "../../Resumecontext.jsx";
import ResumePreview from "../preview/Resumepreview.jsx";
import "./Page3.css";

function Page3() {
  const navigate = useNavigate();
  const { resume_data, set_resume_data } = useContext(ResumeContext);

  const [work_entries, set_work_entries] = useState([
    {
      heading: "",
      subheading: "",
      duration: "",
      link: "",
      points: [""],
    },
  ]);

  // Set initial entries only once on mount
  useEffect(() => {
    if (
      resume_data.experience_and_projects &&
      resume_data.experience_and_projects.length > 0
    ) {
      set_work_entries(resume_data.experience_and_projects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update context whenever local state changes
  useEffect(() => {
    set_resume_data((prev) => ({
      ...prev,
      experience_and_projects: work_entries,
    }));
  }, [work_entries]);

  const update_field = (index, event) => {
    const updated = [...work_entries];
    updated[index][event.target.name] = event.target.value;
    set_work_entries(updated);
  };

  const update_point = (entry_index, point_index, value) => {
    const updated = [...work_entries];
    updated[entry_index].points[point_index] = value;
    set_work_entries(updated);
  };

  const add_entry = () => {
    set_work_entries([
      ...work_entries,
      {
        heading: "",
        subheading: "",
        duration: "",
        link: "",
        points: [""],
      },
    ]);
  };

  const remove_entry = (index) => {
    const updated = [...work_entries];
    updated.splice(index, 1);
    set_work_entries(updated);
  };

  const add_point = (index) => {
    const updated = [...work_entries];
    updated[index].points.push("");
    set_work_entries(updated);
  };

  const go_to_next = () => {
    set_resume_data({ ...resume_data, experience_and_projects: work_entries });
    navigate("/page4");
  };

  const go_to_previous = () => {
    set_resume_data({ ...resume_data, experience_and_projects: work_entries });
    navigate("/page2");
  };

  return (
    <div className="page3_container">
      <div className="page3_form">
        <h1>Work Experience & Projects</h1>
        {work_entries.map((entry, index) => (
          <div key={`${index}-${entry.heading}`} className="work_entry">
            <label>Heading</label>
            <input
              type="text"
              name="heading"
              value={entry.heading}
              onChange={(e) => update_field(index, e)}
              placeholder="eg: E-commerce website..."
            />
            <label>Subheading</label>
            <input
              type="text"
              name="subheading"
              placeholder="introduction..."
              value={entry.subheading}
              onChange={(e) => update_field(index, e)}
            />
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="eg: 2022-24"
              value={entry.duration}
              onChange={(e) => update_field(index, e)}
            />
            <label>Project/Company Link</label>
            <input
              type="text"
              name="link"
              placeholder="eg: github repo link..."
              value={entry.link}
              onChange={(e) => update_field(index, e)}
            />
            <label>Bullet Points</label>
            {entry.points.map((point, p_index) => (
              <input
                key={`${index}-point-${p_index}`}
                type="text"
                value={point}
                onChange={(e) => update_point(index, p_index, e.target.value)}
                placeholder="About project..."
              />
            ))}
            <button className="add_button" onClick={() => add_point(index)}>
              Add Point
            </button>
            {work_entries.length > 1 && (
              <button
                className="remove_button"
                onClick={() => remove_entry(index)}
              >
                Remove Entry
              </button>
            )}
          </div>
        ))}
        <button className="add_button" onClick={add_entry}>
          Add Work/Project
        </button>
        <div className="navigation_buttons">
          <button className="prev" onClick={go_to_previous}>
            Previous
          </button>
          <button className="next" onClick={go_to_next}>
            Next
          </button>
        </div>
      </div>
      <div className="page3_preview">
        <ResumePreview />
      </div>
    </div>
  );
}

export default Page3;
