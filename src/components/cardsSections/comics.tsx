import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/useRedux";
import { useEffect, useState } from "react";
import { getComicsCard } from "../../utils/fetchMethods";
import {
  GET_COMICS_FAILURE,
  GET_COMICS_REQUEST,
  GetComicsSuccessAction,
} from "../../redux/ActionsMethods/comicActionType";
import { IcomicsState } from "../../redux/useRedux/comicReducer";

const Comics = () => {
  const comics = useSelector((state: State) => state.comics) as IcomicsState;
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [comicsPerPage] = useState(5);

  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstCharacter = indexOfLastComic - comicsPerPage;
  const currentComics =
    comics.comics &&
    comics.comics.slice(indexOfFirstCharacter, indexOfLastComic);
  const pageNumbers = [];

  if (comics.comics !== null) {
    for (
      let i = 1;
      i <= Math.ceil(comics.comics?.length / comicsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
  }

  useEffect(() => {
    const fetchComic = async () => {
      dispatch({ type: GET_COMICS_REQUEST });
      try {
        const response = await getComicsCard();
        const result = response;
        if (result !== undefined) {
          const action: GetComicsSuccessAction = {
            type: "GET_COMICS_SUCCESS",
            payload: result,
          };
          dispatch(action);
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: GET_COMICS_FAILURE,
            payload: error && error.message,
          });
        }
      }
    };
    fetchComic();
  }, [dispatch]);

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button key={number} onClick={() => setCurrentPage(number)}>
        {number}
      </button>
    );
  });

  return (
    <div className="container__cards--home">
      <div>
        <div>{renderPageNumbers}</div>
        <div>
          <select name="" id="">
            <option value="comic">comic</option>
            <option value="graphic">graphic novel</option>
            <option value="digital%20comic">Digital comic</option>
            <option value="trade%20paperback">trade paperback</option>
          </select>
        </div>
      </div>

      <div className="container__cards">
        {currentComics &&
          currentComics.map((comic) => (
            <div key={comic.id} className="container__card--character">
              <div>
                <img
                  className="img__character"
                  alt={comic.title}
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                />
              </div>

              <h2>{comic.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Comics;
