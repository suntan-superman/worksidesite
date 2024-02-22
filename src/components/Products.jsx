import * as React from "react";
import "../index.css";

const Products = () => {
  return (
    <div className="w-full h-[90vh]">
      <img
        src={process.env.PUBLIC_URL + "background.jpg"}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="max-w-[1140px] m-auto">
        <div className="absolute top-[15%] w-full md:-[50%] max-w-[75%] h-full flex flex-col text-white p-4 ">
          {/* <div className="absolute top-[15%] w-full md:-[50%] max-w-[75%] h-full flex flex-col text-white p-4 overflow-auto hover:overflow-scroll"> */}
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Workside Software Flagship Product
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl italic">
            Your Efficiency Partner
          </h2>
          <br />
          <embed
            src={process.env.PUBLIC_URL + "WORKSIDE.pdf"}
            type="application/pdf"
            className="top-[5%] w-full md:-[50%] max-w-[75%] h-[60%] max-h-[75%] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Products;

// import { useState } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

// const Products = () => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };
//   const goToPrevPage = () =>
//     setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

//   const goToNextPage = () =>
//     setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

//   return (
//     <div className="w-full h-[90vh]">
//       <img
//         src={process.env.PUBLIC_URL + "background.jpg"}
//         alt="Background"
//         className="w-full h-full object-cover"
//       />
//       <div className="max-w-[1140px] m-auto">
//         <div className="absolute top-[15%] w-full md:-[50%] max-w-[600px] h-full flex flex-col text-white p-4">
//           <nav>
//             <button onClick={goToPrevPage}>Prev</button>
//             <button onClick={goToNextPage}>Next</button>
//             <p>
//               Page {pageNumber} of {numPages}
//             </p>
//           </nav>

//           <Document
//             file={process.env.PUBLIC_URL + "WORKSIDE.pdf"}
//             onLoadSuccess={onDocumentLoadSuccess}
//           >
//             <Page pageNumber={pageNumber} />
//           </Document>
//           {/* <iframe
//             src={process.env.PUBLIC_URL + "WORKSIDE.pdf"}
//             title="Workside Software"
//             className="w-full h-full object-cover"
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
