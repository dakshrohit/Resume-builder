import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeContext } from "../../Resumecontext.jsx";
import ResumePreview from "../preview/Resumepreview.jsx";
import "./Page1.css";

function Page1() {
  
  const navigate = useNavigate();
  const { resume_data, set_resume_data } = useContext(ResumeContext);
  const [personal_details, set_personal_details] = useState({
    full_name: "",
    email_address: "",
    phone_number: "",
    home_address: "",
    linkedin_link: "",
    github_link: "",
    coding_profile_link: "",
  });



  

  useEffect(() => {
    set_personal_details(resume_data.personal || {});
  }, [resume_data]);

  const handle_input_change = (event) => {
    const { name, value } = event.target;
    const updated_details = { ...personal_details, [name]: value };
    set_personal_details(updated_details);
    
  
    
    set_resume_data({ ...resume_data, personal: updated_details });
  };

  
  const go_to_next_page = () => {
    set_resume_data({ ...resume_data, personal: personal_details });
    navigate("/page2");
  };

  return (
    <div className="page1_container">
      <div className="page1_form">
        <h1>Personal Details</h1>
        <label>Full Name</label>
        <input
          type="text"
          name="full_name"
          value={personal_details.full_name}
          onChange={handle_input_change}
        />
        <label>Email Address</label>
        <input
          type="email"
          name="email_address"
          value={personal_details.email_address}
          onChange={handle_input_change}
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={personal_details.phone_number}
          onChange={handle_input_change}
        />
        <label>Home Address</label>
        <input
          type="text"
          name="home_address"
          value={personal_details.home_address}
          onChange={handle_input_change}
        />
        <label>LinkedIn Profile</label>
        <input
          type="text"
          name="linkedin_link"
          value={personal_details.linkedin_link}
          onChange={handle_input_change}
        />
        <label>GitHub Profile</label>
        <input
          type="text"
          name="github_link"
          value={personal_details.github_link}
          onChange={handle_input_change}
        />
        <label>Leetcode / Codeforces Profile</label>
        <input
          type="text"
          name="coding_profile_link"
          value={personal_details.coding_profile_link}
          onChange={handle_input_change}
        />
          <button onClick={go_to_next_page}className="next-btn">Next</button>
      </div>
      <div className="page1_preview">
        <ResumePreview />
      </div>
    </div>
  );
}

export default Page1;
