import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/useRedux";
import { useEffect, useState } from "react";
import { IstoriesState } from "../../redux/useRedux/storiesReducer";
import _ from "lodash";
import {
  GET_STORIES_REQUEST,
  GetStoriesSuccessAction,
} from "../../redux/ActionsMethods/storiesActionType";
import {
  getStoriesCard,
  getStoriesbyCharacter,
} from "../../utils/fetchMethods";
import { GET_STORIES_FAILURE } from "../../redux/ActionsMethods/storiesActionType";

const Stories = () => {
  const story = useSelector((state: State) => state.storys) as IstoriesState;
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [storyPerPage] = useState(5);

  const indexOfLastStory = currentPage * storyPerPage;
  const indexOfFirStory = indexOfLastStory - storyPerPage;
  const [character, setCharacter] = useState("");
  let cases = "";
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
      <button
        className="pagination__btn"
        key={number}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </button>
    );
  });

  useEffect(() => {
    const fetchStories = async () => {
      dispatch({ type: GET_STORIES_REQUEST });
      try {
        let response = undefined;
        if (character) {
          response = await getStoriesbyCharacter(character);
        } else {
          response = await getStoriesCard();
        }

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
  }, [dispatch, cases, character]);

  const handleCharacter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCharacter(event.target.value);

    cases = "character";
  };

  return (
    <div className="container__cards--home">
      <div className="container__filters--story">
        <div className="container__pagination--story">{renderPageNumbers}</div>
        <div>
          <select name="" id="" onChange={handleCharacter}>
            <option value="">select character</option>
            <option value="1009610">Spiderman</option>
            <option value="1009368">Iron Man</option>
            <option value="1009220">Captain America</option>
            <option value="1009189">Black Widow</option>
          </select>
        </div>
      </div>

      <div className="container__cards--story">
        {currentStory &&
          currentStory.map((story) => (
            <div key={story.id} className="container__card--story">
              <h2>{story.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stories;
