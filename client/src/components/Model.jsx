import React, { useEffect, useState } from 'react'
import Modal from "./modal/modal";

const Model = () => {
     const [showWelcomeModal, setShowWelcomeModal] = useState(false);
     const user = JSON.parse(localStorage.getItem("user") || "{}");
       useEffect(() => {
        
         const isLoggedIn = checkLoggedIn();

        
         const hasShownModal = localStorage.getItem("hasShownWelcomeModal");

         if (isLoggedIn && !hasShownModal) {

           setShowWelcomeModal(true);
       
           localStorage.setItem("hasShownWelcomeModal", true);
         }
       }, []);

       const checkLoggedIn = () => {
        
         const user = JSON.parse(localStorage.getItem("user") || "{}");
         var username = user.name;
         console.log(username);
         return !!user; 
       };

       const handleCloseModal = () => {
         setShowWelcomeModal(false);
       };
  return (
    <div>
      <Modal
        showModal={showWelcomeModal}
        handleCloseModal={handleCloseModal}
        user={user}
      />{" "}
    </div>
  );
}

export default Model