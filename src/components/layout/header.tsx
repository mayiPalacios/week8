import { useNavigate } from "react-router-dom";
import { showAllHideCards } from "../../redux/useRedux/hideReducer";
import { persistor } from "../../redux/store/store";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigate("/bookmark");
  };

  const handleNavigationHome = () => {
    navigate("/");
  };

  const handleShowHideCards = () => {
    dispatch(showAllHideCards());
    persistor.persist();
    window.location.reload();
  };
  return (
    <div className="container__header">
      <div>
        <img
          alt="logo"
          id="header__logo"
          src="https://i0.wp.com/www.tomosygrapas.com/wp-content/uploads/2016/07/marvelstudios-7611c.jpg"
        />
      </div>
      <div className="container__btn--header">
        <button onClick={handleShowHideCards}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/875/875643.png"
            alt="not-show"
          />
        </button>

        <button onClick={handleNavigation}>
          <h2>Bookmark</h2>
        </button>
        <button className="header__btn" onClick={handleNavigationHome}>
          <h2>Home</h2>
        </button>
      </div>
    </div>
  );
};

export default Header;
