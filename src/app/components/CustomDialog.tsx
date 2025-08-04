// // pages/index.tsx or your main component
// 'use client';

// import { useState } from "react";
// import CustomDialog from "@/components/CustomDialog";

// export default function HomePage() {
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const [dialogData, setDialogData] = useState({ title: "", message: "" });

//   const openDialog = () => {
//     // open with default content
//     setDialogData({ title: "Welcome!", message: "This is a default dialog." });
//     setDialogOpen(true);
//   };

//   const openDialogWithParams = (title: string, message: string) => {
//     setDialogData({ title, message });
//     setDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setDialogOpen(false);
//   };

//   return (
//     <div className="p-10 space-y-4">
//       <button
//         onClick={openDialog}
//         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//       >
//         Open Dialog (Default)
//       </button>

//       <button
//         onClick={() => openDialogWithParams("Custom Title", "This is a dialog with parameters.")}
//         className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//       >
//         Open Dialog (With Params)
//       </button>

//       <CustomDialog
//         isOpen={isDialogOpen}
//         onClose={closeDialog}
//         title={dialogData.title}
//         message={dialogData.message}
//       />
//     </div>
//   );
// }
