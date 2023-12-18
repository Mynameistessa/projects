// import React, { createContext, useState, useEffect } from "react";
// import { Entry, ProjectsList } from "@/types/projectDetails";

// // upper case because it is actually a component
// export const FeedsContext = createContext([]);

// const MyContextProvider = ({ children }) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // fetch project names
//         const response = await fetch("/api/projects");
//         const result: ProjectsList = await response.json();

//         // for each project name, fetch details to get the feeds count...
//         // result.projectNames.

//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []); // Run the effect only once when the component mounts

//   const contextValue = {
//     data,
//   };

//   return (
//     <FeedsContext.Provider value={contextValue}>
//       {children}
//     </FeedsContext.Provider>
//   );
// };

// export { FeedsContext, MyContextProvider };
