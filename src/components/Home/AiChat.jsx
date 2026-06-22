import { useEffect, useState } from "react";
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



  //  Jab login ho jaye, to automatically chat par navigate ho
  useEffect(() => {
    if (isLoggedIn && showLogin) {
      navigate("/ai-chat");
      setShowLogin(false);
    }
  }, [isLoggedIn, showLogin, navigate]);

  return (
    <>
      <div
        onClick={handleClick}
        className="w-full mx-auto overflow-hidden border-8 border-white cursor-pointer"
      >
        <img src="/aichathome.jpeg" className="w-full h-auto object-cover" />
      </div>

      {showLogin && (
        <UserLogin
          defaultOpen={true}
          onOpenChange={(open) => {
            setShowLogin(open);
            if (!open && isLoggedIn) {
              navigate("/ai-chat");
            }

          }}
        />
      )}
    </>
  );
};

export default AiChat;
