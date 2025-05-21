import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeContext } from "../../Resumecontext.jsx";
import ResumePreview from "../preview/Resumepreview.jsx";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./Page4.css";

function Page4() {
  const navigate = useNavigate();
  const { resume_data, set_resume_data } = useContext(ResumeContext);
  const preview_ref = useRef();

  const [technical_skills, set_technical_skills] = useState([""]);
  const [positions, set_positions] = useState([{ title: "", points: [""] }]);
  const [achievements, set_achievements] = useState([""]);

  useEffect(() => {
    if (resume_data.technical_skills) {
      set_technical_skills(resume_data.technical_skills);
    }
    if (resume_data.positions_of_responsibility) {
      set_positions(resume_data.positions_of_responsibility);
    }
    if (resume_data.achievements) {
      set_achievements(resume_data.achievements);
    }
  }, [resume_data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      set_resume_data((prev) => ({
        ...prev,
        technical_skills,
        positions_of_responsibility: positions,
        achievements,
      }));
    }, 100);

    return () => clearTimeout(timeout);
  }, [technical_skills, positions, achievements]);

  const update_point = (list, setter, index, value) => {
    const updated = [...list];
    updated[index] = value;
    setter(updated);
  };

  const update_nested_point = (index, point_index, value) => {
    const updated = [...positions];
    updated[index].points[point_index] = value;
    set_positions(updated);
  };

  const add_position = () => {
    set_positions([...positions, { title: "", points: [""] }]);
  };

  const add_point_to_position = (index) => {
    const updated = [...positions];
    updated[index].points.push("");
    set_positions(updated);
  };

  const update_resume_data = () => {
    set_resume_data({
      ...resume_data,
      technical_skills,
      positions_of_responsibility: positions,
      achievements,
    });
  };

  const handle_download = async () => {
    update_resume_data();
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for preview to update

    if (!preview_ref.current) {
      console.error("Preview ref not found");
      return;
    }

    try {
      const canvas = await html2canvas(preview_ref.current, {
        scale: 2,
        useCORS: true,
        logging: true,
      });

      const img_data = canvas.toDataURL("image/png");

      // Use canvas size directly for one-page PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(img_data, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const go_to_previous = () => {
    update_resume_data();
    navigate("/page3");
  };
//   const handle_alert=()=>{
//     alert("THANK YOU FOR DOWNLOADING...");
//   }

  return (
    <div className="page4_container">
      <div className="page4_form">
        <h2>Technical Skills</h2>
        {technical_skills.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            placeholder=" eg: Languages: Reactjs.."
            onChange={(e) =>
              update_point(
                technical_skills,
                set_technical_skills,
                index,
                e.target.value
              )
            }
          />
        ))}
        <button
          className="add_btn"
          onClick={() => set_technical_skills([...technical_skills, ""])}
        >
          Add Skill
        </button>

        <h2>Positions of Responsibility</h2>
        {positions.map((pos, index) => (
          <div key={index} className="position_block">
            <input
              type="text"
              placeholder=" eg: EDC : ATH HEAD"
              value={pos.title}
              onChange={(e) => {
                const updated = [...positions];
                updated[index].title = e.target.value;
                set_positions(updated);
              }}
            />
            {pos.points.map((point, p_index) => (
              <input
                key={p_index}
                type="text"
                value={point}
                placeholder=" describe.."
                onChange={(e) =>
                  update_nested_point(index, p_index, e.target.value)
                }
              />
            ))}
            <button
              className="add_btn"
              onClick={() => add_point_to_position(index)}
            >
              Add Point
            </button>
          </div>
        ))}
        <button className="add_btn" onClick={add_position}>
          Add Position
        </button>

        <h2>Achievements</h2>
        {achievements.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            placeholder=" mention your achievements here.."
            onChange={(e) =>
              update_point(
                achievements,
                set_achievements,
                index,
                e.target.value
              )
            }
          />
        ))}
        <button
          className="add_btn"
          onClick={() => set_achievements([...achievements, ""])}
        >
          Add Achievement
        </button>

        <div className="navigation_buttons">
          <button className="prev" onClick={go_to_previous}>
            Previous
          </button>
          <button className="download" onClick={handle_download}>
            Download PDF
          </button>
        </div>
      </div>

      <div className="page4_preview" ref={preview_ref}>
        <ResumePreview />
      </div>
    </div>
  );
}

export default Page4;
