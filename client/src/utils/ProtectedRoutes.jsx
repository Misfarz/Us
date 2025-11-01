 import { useState } from "react";
 import AgeVerification from "../modals/AgeVerification";
 
 const ProtectedRoute = ({ children }) => {

   const [isAgeVerified, setIsAgeVerified] = useState(false);
    if (!isAgeVerified) {
      return (
        <AgeVerification 
          onVerified={() => setIsAgeVerified(true)} 
          onDecline={() => {
            window.location.href = 'https://youtu.be/YAg5Dg2jSF8?si=Sa8F6L_NjaOIjXTy';
          }}
        />
      );
    }
    return children;
  };


  export default ProtectedRoute