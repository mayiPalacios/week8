import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/useRedux";
import { GetCharactersSuccessAction } from "../../redux/ActionsMethods/characterActionTypes";
import { GET_CHARACTERS_FAILURE } from "../../redux/ActionsMethods/characterActionTypes";
import { GET_CHARACTERS_REQUEST } from "../../redux/ActionsMethods/characterActionTypes";
import { useEffect, useState } from "react";
import _ from "lodash";
import { IcharactersState } from "../../redux/useRedux/characterReducer";
import {
  getCharacterCards,
  getCharacterbyName,
  getCharactersbyComics,
  getCharactersbyStories,
} from "../../utils/fetchMethods";
import { IMarvelCharacter } from "../../interfaces/InterfacesMain";
import {
  addBookmark,
  removeBookmark,
} from "../../redux/useRedux/bookMarkReducer";
import { persistor, store } from "../../redux/store/store";
import { hideCard, showAllHideCards } from "../../redux/useRedux/hideReducer";

let cases = "";
const Characters = () => {
  const characters = useSelector(
    (state: State) => state.characters
  ) as IcharactersState;
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(5);
  const [filterbyComic, setFilterbycomic] = useState("");
  const [filterbyStory, setFilterbyStory] = useState("");
  const [search, setSearch] = useState("");
  const [hide, setHideCard] = useState<number[]>();
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
        let response = undefined;
        switch (cases) {
          case "":
            response = await getCharacterCards();
            break;
          case "comic":
            response = await getCharactersbyComics(filterbyComic);
            break;
          case "story":
            response = await getCharactersbyStories(filterbyStory);
            break;
          case "name":
            response = await getCharacterbyName(search);
            break;
        }

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
  }, [dispatch, filterbyComic, filterbyStory, search]);

  const handleSelectCharactersbyComic = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterbycomic(event.target.value);
    cases = "comic";
  };

  const handleSelectCharactersbyStory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterbyStory(event.target.value);
    cases = "story";
  };

  const handleCharacterbyName = _.debounce((event) => {
    if (event.target.value !== "") {
      setSearch("name=" + event.target.value);
    } else {
      setSearch("");
    }
    cases = "name";
  }, 1000);

  const handleSaveCard = (card: IMarvelCharacter) => {
    const bookmarks = store.getState().bookmark.bookmarks;
    const index = bookmarks.findIndex((bookmark) => bookmark.id === card.id);
    if (index !== -1) {
      dispatch(removeBookmark(index));
    } else {
      dispatch(addBookmark(card));
      persistor.persist();
    }
    window.location.reload();
  };

  const handleHide = (id: number) => {
    dispatch(hideCard(id));
    persistor.persist();
    setHideCard(store.getState().hideCard.id);
  };

  const handleShowHideCards = () => {
    dispatch(showAllHideCards());
    persistor.persist();
    setHideCard([]);
  };

  const getBookmarkImageUrl = (idCharacter: number) => {
    const exist = store.getState().bookmark.bookmarks;
    const favorite = exist.findIndex((favorite) => favorite.id === idCharacter);
    if (favorite !== -1) {
      return "https://cdn-icons-png.flaticon.com/512/5668/5668020.png";
    } else {
      return "https://cdn-icons-png.flaticon.com/512/5662/5662990.png";
    }
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button key={number} onClick={() => setCurrentPage(number)}>
        {number}
      </button>
    );
  });

  useEffect(() => {
    setHideCard(store.getState().hideCard.id);
  }, []);

  return (
    <div className="container__cards--home">
      <div>
        <button onClick={handleShowHideCards}>Show all hide cards</button>
      </div>
      <div>
        <div>{renderPageNumbers}</div>
        <div>
          <select
            name="select__character--comic"
            id="select__character--comic"
            onChange={handleSelectCharactersbyComic}
          >
            <option>Filter characters by comic</option>
            <option value="7250">Amazing Spider-Man #1</option>
            <option value="7088">Avengers #1</option>
            <option value="486">Captain America #100</option>
            <option value="6150">Daredevil #1</option>
            <option value="480">Fantastic Four #1</option>
            <option value="22506">Avengers: Disassembled</option>
            <option value="406">Iron Man #1</option>
            <option value="1866">The Mighty Thor #337</option>
            <option value="10109">The Uncanny X-Men #1 </option>
            <option value="20325">Wolverine #1</option>
          </select>
        </div>
        <div>
          <select
            name=""
            id="select__character--story"
            onChange={handleSelectCharactersbyStory}
          >
            <option value="">filter characters by stories</option>
            <option value="635">Avengers Disassembled</option>
            <option value="21216">Civil War II</option>
            <option value="24139">Secret Invasion</option>
            <option value="346">Siege</option>
            <option value="238">Fear Itself</option>
            <option value="527">Avengers Vs. X-Men</option>
            <option value="405">Infinity</option>
            <option value="405">Original Sin</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            id="inpt__search--character"
            onChange={handleCharacterbyName}
          />
        </div>
      </div>

      <div className="container__cards">
        {currentCharacters &&
          currentCharacters
            .filter((noHide) => !hide?.some((hidden) => hidden === noHide.id))
            .map((character) => (
              <div key={character.id} className="container__card--character">
                <div>
                  <img
                    className="img__character"
                    alt={character.name}
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  />
                </div>
                <div className="container__btn--title">
                  <h2>{character.name}</h2>

                  <button onClick={() => handleSaveCard(character)}>
                    <img
                      src={getBookmarkImageUrl(character.id)}
                      alt="saveCard"
                    />
                  </button>
                  <button onClick={() => handleHide(character.id)}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9794/9794281.png"
                      alt="not-show"
                    />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
export default Characters;
