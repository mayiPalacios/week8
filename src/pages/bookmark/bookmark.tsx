import MainBookMark from "../../components/bookMarkHideComponents/mainBookmark";
import { useNavigate } from "react-router-dom";

const Bookmark = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <div>
      <div>
        <button onClick={handleNavigation}>Home</button>
      </div>
      <MainBookMark />
    </div>
  );
};

export default Bookmark;
