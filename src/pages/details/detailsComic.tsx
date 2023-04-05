import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/useRedux";
import { useEffect } from "react";
import { getComicDetails } from "../../utils/fetchMethods";
import {
  GET_DETAIL_FAILURE_COMIC,
  GetDetailsSuccessAction,
} from "../../redux/ActionsMethods/comicDetailTypes";
import { IDetailsState } from "../../redux/useRedux/detailComicReducer";
import {
  GET_DETAIL_REQUEST_COMIC,
  GET_DETAIL_SUCCESS_COMIC,
} from "../../redux/ActionsMethods/comicDetailTypes";

const DetailsComic = () => {
  const dispatch = useDispatch();
  const details = useSelector(
    (state: State) => state.comicDetails
  ) as IDetailsState;

  useEffect(() => {
    const fetchCharacter = async () => {
      dispatch({ type: GET_DETAIL_REQUEST_COMIC });

      try {
        const idcard = localStorage.getItem("keyDetails");
        if (idcard !== null) {
          const request = await getComicDetails(idcard);
          const results = request;
          if (results !== undefined) {
            const action: GetDetailsSuccessAction = {
              type: GET_DETAIL_SUCCESS_COMIC,
              payload: results,
            };
            dispatch(action);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: GET_DETAIL_FAILURE_COMIC,
            payload: error && error.message,
          });
        }
      }
    };
    fetchCharacter();
  }, [dispatch]);

  return (
    <div className="container__section--comic">
      {details.details.length > 0 ? (
        <div className="container_details">
          <img
            alt=""
            id="img__detail"
            src={`${
              details.details.length > 0
                ? details.details[0].thumbnail.path
                : ""
            }.${
              details.details.length > 0
                ? details.details[0].thumbnail.extension
                : ""
            }`}
          />

          <h2> {details.details.length > 0 ? details.details[0].title : ""}</h2>
          <div className="container__info">
            <span>Characters</span>
            {details.details[0].characters.items.map((comic) => (
              <div className="div__details--post">{comic.name}</div>
            ))}
          </div>
          <div className="container__info">
            <span>Stories</span>
            {details.details.length > 0
              ? details.details[0].stories.items.map((comic) => (
                  <div className="div__details">{comic.name}</div>
                ))
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DetailsComic;
