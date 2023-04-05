import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/useRedux";
import { useEffect } from "react";
import { getStoryDetails } from "../../utils/fetchMethods";
import {
  GET_DETAIL_FAILURE_STORY,
  GET_DETAIL_REQUEST_STORY,
  GET_DETAIL_SUCCESS_STORY,
  GetDetailsSuccessAction,
} from "../../redux/ActionsMethods/storiesDetailType";
import { IDetailsStateStory } from "../../redux/useRedux/detailStoriesReducer";
const DetailsStories = () => {
  const dispatch = useDispatch();
  const details = useSelector(
    (state: State) => state.storyDetails
  ) as IDetailsStateStory;
  console.log(details.details);

  useEffect(() => {
    const fetchCharacter = async () => {
      dispatch({ type: GET_DETAIL_REQUEST_STORY });

      try {
        const idcard = localStorage.getItem("keyDetails");
        if (idcard !== null) {
          const request = await getStoryDetails(idcard);
          const results = request;
          if (results !== undefined) {
            const action: GetDetailsSuccessAction = {
              type: GET_DETAIL_SUCCESS_STORY,
              payload: results,
            };
            dispatch(action);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: GET_DETAIL_FAILURE_STORY,
            payload: error && error.message,
          });
        }
      }
    };
    fetchCharacter();
  }, [dispatch]);

  return (
    <section className="container_details-story">
      {details.details.length > 0 ? (
        <div className="container__story">
          <h2> {details.details.length > 0 ? details.details[0].title : ""}</h2>

          <div className="container__info">
            <span>Comics</span>

            {details.details[0].comics.items.map((comic) => (
              <div className="div__details--post">{comic.name}</div>
            ))}
          </div>

          <div className="container__info">
            <span>Characters</span>
            {details.details[0].characters.items.map((character) => (
              <div className="div__details">{character.name}</div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default DetailsStories;
