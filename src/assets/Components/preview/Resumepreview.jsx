import React, { useContext } from "react";
import { ResumeContext } from "../../Resumecontext.jsx";
import "./Resumepreview.css";

function ResumePreview() {
  const { resume_data } = useContext(ResumeContext);
  const personal = resume_data.personal || {};

  return (
    <div className="resume_preview_container">
      <div className="resume_header">
        <div className="resume_name">{personal.full_name || "Your Name"}</div>
        <div className="resume_contact">
          {personal.email_address} | {personal.phone_number} |{" "}
          {personal.home_address}
          <br />
          {personal.linkedin_link && (
            <a href={personal.linkedin_link} target="_blank">
              LinkedIn
            </a>
          )}{" "}
          {personal.github_link && (
            <a href={personal.github_link} target="_blank">
              GitHub
            </a>
          )}{" "}
          {personal.coding_profile_link && (
            <a href={personal.coding_profile_link} target="_blank">
              Leetcode
            </a>
          )}
        </div>
      </div>

      {resume_data.education?.length > 0 && (
        <>
          <div className="resume_section_title">Education</div>
          {resume_data.education.map((edu, idx) => (
            <div className="resume_entry" key={idx}>
              <div className="resume_entry_left">
                <strong>{edu.institute}</strong>
                <br />
                <div style={{fontStyle:"italic"}}>{edu.degree}</div>
              </div>
              <div className="resume_entry_right">
                {edu.duration}
                <br />
                CGPA: {edu.cgpa}
              </div>
            </div>
          ))}
        </>
      )}

      {resume_data.experience_and_projects?.length > 0 && (
        <>
          <div className="resume_section_title">Experience & Projects</div>
          {resume_data.experience_and_projects.map((item, idx) => (
            <div className="resume_entry" key={idx}>
              <div className="resume_entry_left">
                <div>
                  <strong style={{ fontSize: "15px" }}>{item.heading}</strong>
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    fontStyle: "italic",
                    display: "inline",
                  }}
                >
                  {item.subheading}
                </div>

                {item.link && (
                  <>
                    <br />
                    <a href={item.link} target="_blank">
                      Project Link
                    </a>
                  </>
                )}
                <ul className="resume_bullets">
                  {item.points.map((pt, pidx) => (
                    <li key={pidx}>--{pt}</li>
                  ))}
                </ul>
              </div>
              <div className="resume_entry_right">{item.duration}</div>
            </div>
          ))}
        </>
      )}

      {resume_data.technical_skills?.length > 0 && (
        <>
          <div className="resume_section_title">Technical Skills</div>
          <ul className="resume_bullets">
            {resume_data.technical_skills.map((skill, idx) => (
              <li key={idx}>--{skill}</li>
            ))}
          </ul>
        </>
      )}

      {resume_data.positions_of_responsibility?.length > 0 && (
        <>
          <div className="resume_section_title">
            Positions of Responsibility
          </div>
          {resume_data.positions_of_responsibility.map((pos, idx) => (
            <div className="resume_entry" key={idx}>
              <div className="resume_entry_left">
                <strong>{pos.title}</strong>
                <ul className="resume_bullets">
                  {pos.points.map((pt, pidx) => (
                    <li key={pidx}>--{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </>
      )}

      {resume_data.achievements?.length > 0 && (
        <>
          <div className="resume_section_title">Achievements</div>
          <ul className="resume_bullets">
            {resume_data.achievements.map((item, idx) => (
              <li key={idx}>--{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ResumePreview;
