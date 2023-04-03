import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/useRedux";
import { useEffect, useState } from "react";
import _ from "lodash";
import {
  getComicbyFormat,
  getComicbyTitle,
  getComicsCard,
} from "../../utils/fetchMethods";
import {
  GET_COMICS_FAILURE,
  GET_COMICS_REQUEST,
  GetComicsSuccessAction,
} from "../../redux/ActionsMethods/comicActionType";
import { IcomicsState } from "../../redux/useRedux/comicReducer";
let cases = "";

const Comics = () => {
  const comics = useSelector((state: State) => state.comics) as IcomicsState;
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [comicsPerPage] = useState(5);
  const [comicFormat, setFormat] = useState("");
  const [title, setTitle] = useState("");

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
        let response = undefined;
        switch (cases) {
          case "":
            response = await getComicsCard();
            break;
          case "formats":
            response = await getComicbyFormat(comicFormat);
            break;
          case "title":
            response = await getComicbyTitle(title);
        }

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
  }, [dispatch, comicFormat, title]);

  const handleFormat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(event.target.value);
    cases = "formats";
  };

  const handleTitle = _.debounce((event) => {
    if (event.target.value !== "") {
      setTitle("titleStartsWith=" + event.target.value);
    } else {
      setTitle(event.target.value);
    }
    cases = "title";
  }, 1000);

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
          <select name="" id="" onChange={handleFormat}>
            <option value="">Select comic format</option>
            <option value="comic">comic</option>
            <option value="graphic%20novel">graphic novel</option>
            <option value="digital%20comic">Digital comic</option>
            <option value="trade%20paperback">trade paperback</option>
          </select>
        </div>
        <div>
          <input type="text" onChange={handleTitle} />
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
