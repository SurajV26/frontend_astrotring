// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { openLoginModal } from "@/redux/slice/uiSlice";

// const AiChat = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useSelector((state) => state.userAuth);



//   return (
//     <div
//       onClick={}
//       className="w-full mx-auto overflow-hidden border-8 border-white cursor-pointer"
//     >
//       <img
//         src="/aichathome.jpeg"
//         alt="Chat with AI Astrologer"
//         className="w-full h-auto object-cover"
//       />
//     </div>
//   );
// };

// export default AiChat;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserLogin from "../UserLogin";


const AiChat = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/ai-chat");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <div onClick={handleClick} className="w-full mx-auto overflow-hidden border-8 border-white cursor-pointer">
        <img src="/aichathome.jpeg" className="w-full h-auto object-cover" />
      </div>

      {showLogin && (
        <UserLogin
          defaultOpen={true}
          onOpenChange={(open) => !open && setShowLogin(false)}
          
        />
      )}
    </>
  );
};

 export default AiChat;