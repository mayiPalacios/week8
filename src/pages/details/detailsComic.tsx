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
    <section className="container__section--info">
      <div id="section__games--elements">
        <img
          alt=""
          id="img__post--games"
          src={`${details.details[0].thumbnail.path}.${details.details[0].thumbnail.extension}`}
        />
        {details.details.length > 0 ? details.details[0].title : ""}
        <span>Characters</span>
        {details.details[0].characters.items.map((comic) => (
          <div>{comic.name}</div>
        ))}
        <span>Stories</span>
        {details.details[0].stories.items.map((comic) => (
          <div>{comic.name}</div>
        ))}
      </div>
    </section>
  );
};

export default DetailsComic;
