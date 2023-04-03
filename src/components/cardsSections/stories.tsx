import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/useRedux";
import { useEffect, useState } from "react";
import { IstoriesState } from "../../redux/useRedux/storiesReducer";
import {
  GET_STORIES_REQUEST,
  GetStoriesSuccessAction,
} from "../../redux/ActionsMethods/storiesActionType";
import { getStoriesCard } from "../../utils/fetchMethods";
import { GET_STORIES_FAILURE } from "../../redux/ActionsMethods/storiesActionType";

const Stories = () => {
  const story = useSelector((state: State) => state.storys) as IstoriesState;
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [storyPerPage] = useState(5);

  const indexOfLastStory = currentPage * storyPerPage;
  const indexOfFirStory = indexOfLastStory - storyPerPage;
  const currentStory =
    story.story && story.story.slice(indexOfFirStory, indexOfLastStory);
  const pageNumbers = [];

  if (story.story !== null) {
    for (let i = 1; i <= Math.ceil(story.story?.length / storyPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button key={number} onClick={() => setCurrentPage(number)}>
        {number}
      </button>
    );
  });

  useEffect(() => {
    const fetchStories = async () => {
      dispatch({ type: GET_STORIES_REQUEST });
      try {
        const response = await getStoriesCard();
        const result = response;
        if (result !== undefined) {
          const action: GetStoriesSuccessAction = {
            type: "GET_STORIES_SUCCESS",
            payload: result,
          };
          dispatch(action);
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: GET_STORIES_FAILURE,
            payload: error && error.message,
          });
        }
      }
    };
    fetchStories();
  }, [dispatch]);
  return (
    <div className="container__cards--home">
      <div>{renderPageNumbers}</div>
      <div className="container__cards">
        {currentStory &&
          currentStory.map((story) => (
            <div key={story.id} className="container__card--character">
              <div></div>

              <h2>{story.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stories;
