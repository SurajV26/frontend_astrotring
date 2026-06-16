import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AiChat = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.userAuth);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/ai-chat");
    } else {
      toast.error("Please login",);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full mx-auto overflow-hidden border-8 border-white cursor-pointer"
    >
      <img
        src="/aichathome.jpeg"
        alt="Chat with AI Astrologer"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default AiChat;