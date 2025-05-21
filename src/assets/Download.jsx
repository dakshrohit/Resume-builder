// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// export default function Download() {
//   const handleDownload = () => {
//     const input = document.getElementById("resume-preview");
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const width = pdf.internal.pageSize.getWidth();
//       const height = (canvas.height * width) / canvas.width;
//       pdf.addImage(imgData, "PNG", 0, 0, width, height);
//       pdf.save("resume.pdf");
//     });
//   };

//   return <button onClick={handleDownload}>Download as PDF</button>;
// }
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PageFour = () => {
  const download_resume_pdf = async () => {
    const preview_element = document.getElementById("resume_preview");

    const canvas = await html2canvas(preview_element, {
      scale: 2,
      useCORS: true,
    });

    const img_data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height], // auto height for single page
    });

    pdf.addImage(img_data, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("resume.pdf");
  };

  return (
    <div className="page_four">
      {/* Your live preview container */}
      <div id="resume_preview">{/* Rendered resume content here */}</div>

      {/* Download Button */}
      <button onClick={download_resume_pdf}>Download PDF</button>
    </div>
  );
};

export default PageFour;
