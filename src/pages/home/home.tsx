import { Fragment } from "react";
import Characters from "../../components/cardsSections/characters";
import Comics from "../../components/cardsSections/comics";
import Stories from "../../components/cardsSections/stories";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/bookmark");
  };

  return (
    <div>
      <div>
        <button onClick={handleNavigation}>Bookmark</button>
      </div>
      <Fragment>
        <Characters />
        <Comics />
        <Stories />
      </Fragment>
    </div>
  );
};

export default Home;
