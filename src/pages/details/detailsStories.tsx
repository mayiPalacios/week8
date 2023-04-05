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
          const request = getStoryDetails(idcard);
          const results = request;
          /*  if (results !== undefined) {
            const action: GetDetailsSuccessAction = {
              type: GET_DETAIL_SUCCESS_STORY,
              payload: results,
            };
            dispatch(action);
          }*/
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

  /* {details.details.length > 0 ? details.details[0].name : ""}
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
        ))}*/

  return (
    <section className="container__section--info">
      <div id="section__games--elements"></div>
    </section>
  );
};

export default DetailsStories;
