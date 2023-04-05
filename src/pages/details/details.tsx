import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/useRedux";
import { useEffect } from "react";
import {
  GET_DETAIL_FAILURE,
  GET_DETAIL_REQUEST,
} from "../../redux/ActionsMethods/characterDetailTypes";
import { getCharacterDetails } from "../../utils/fetchMethods";
import { GetDetailsSuccessAction } from "../../redux/ActionsMethods/characterDetailTypes";
import { GET_DETAIL_SUCCESS } from "../../redux/ActionsMethods/characterDetailTypes";
import { IDetailsState } from "../../redux/useRedux/detailCharacterReducer";

const Details = () => {
  const dispatch = useDispatch();
  const details = useSelector(
    (state: State) => state.characterDetails
  ) as IDetailsState;
  console.log(details.details);

  useEffect(() => {
    const fetchCharacter = async () => {
      dispatch({ type: GET_DETAIL_REQUEST });

      try {
        const idcard = localStorage.getItem("keyDetails");
        if (idcard !== null) {
          const request = await getCharacterDetails(idcard);
          const results = request;
          if (results !== undefined) {
            const action: GetDetailsSuccessAction = {
              type: GET_DETAIL_SUCCESS,
              payload: results,
            };
            dispatch(action);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: GET_DETAIL_FAILURE,
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
        {details.details.length > 0 ? details.details[0].name : ""}
        <img
          alt=""
          id="img__post--games"
          src={`${details.details[0].thumbnail.path}.${details.details[0].thumbnail.extension}`}
        />
        <span>Comics</span>

        {details.details[0].comics.items.map((comic) => (
          <div>{comic.name}</div>
        ))}

        <span>Stories</span>
        {details.details[0].stories.items.map((story) => (
          <div>{story.name}</div>
        ))}
      </div>
    </section>
  );
};

export default Details;
