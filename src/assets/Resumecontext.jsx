import React, { createContext, useState } from "react";

export const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resume_data, set_resume_data] = useState({
    personal: {},
    education: [],
    experience_and_projects: [],
    technical_skills: [],
    positions_of_responsibility: [],
    achievements: [],
  });

  return (

    // resume provider --> gives access evrything inside it to make changes or make updates in the context 





    <ResumeContext.Provider value={{ resume_data, set_resume_data }}>
            {children}
    </ResumeContext.Provider>
  );
}
