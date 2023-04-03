import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/useRedux";
import { GetCharactersSuccessAction } from "../../redux/ActionsMethods/characterActionTypes";
import { GET_CHARACTERS_FAILURE } from "../../redux/ActionsMethods/characterActionTypes";
import { GET_CHARACTERS_REQUEST } from "../../redux/ActionsMethods/characterActionTypes";
import { useEffect, useState } from "react";
import { IcharactersState } from "../../redux/useRedux/characterReducer";
import { getCharacterCards } from "../../utils/fetchMethods";
const Characters = () => {
  const characters = useSelector(
    (state: State) => state.characters
  ) as IcharactersState;
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(5);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters =
    characters.characters &&
    characters.characters.slice(indexOfFirstCharacter, indexOfLastCharacter);
  const pageNumbers = [];

  if (characters.characters !== null) {
    for (
      let i = 1;
      i <= Math.ceil(characters.characters?.length / charactersPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
  }

  useEffect(() => {
    const fetchCharacter = async () => {
      dispatch({ type: GET_CHARACTERS_REQUEST });
      try {
        const response = await getCharacterCards();
        console.log(response);
        const results = response;
        if (results !== undefined) {
          const action: GetCharactersSuccessAction = {
            type: "GET_CHARACTERS_SUCCESS",
            payload: results,
          };
          dispatch(action);
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch({
            type: GET_CHARACTERS_FAILURE,
            payload: error && error.message,
          });
        }
      }
    };
    fetchCharacter();
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
      <div>{renderPageNumbers}</div>
      <div className="container__cards">
        {currentCharacters &&
          currentCharacters.map((character) => (
            <div key={character.id} className="container__card--character">
              <div>
                <img
                  className="img__character"
                  alt={character.name}
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                />
              </div>

              <h2>{character.name}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Characters;
