import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./assets/Resumecontext.jsx";
import Home from "./assets/Components/Home/Home.jsx"; 
import Page1 from "./assets/Components/page1/Page1.jsx";
import Page2 from "./assets/Components/page2/Page2.jsx";
import Page3 from "./assets/Components/page3/Page3.jsx";
import Page4 from "./assets/Components/page4/Page4.jsx";

export default function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}

