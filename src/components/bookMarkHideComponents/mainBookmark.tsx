import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeAllBookmarks,
  selectBookmarks,
} from "../../redux/useRedux/bookMarkReducer";
import { useState } from "react";
import { Ibookmark } from "../../interfaces/InterfacesMain";
import { store } from "../../redux/store/store";
import { removeBookmark } from "../../redux/useRedux/bookMarkReducer";

const MainBookMark = () => {
  const bookmarks = useSelector(selectBookmarks);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(5);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters =
    bookmarks && bookmarks.slice(indexOfFirstCharacter, indexOfLastCharacter);
  const pageNumbers = [];

  if (bookmarks !== null) {
    for (
      let i = 1;
      i <= Math.ceil(bookmarks?.length / charactersPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
  }

  const handleRemoveCard = (card: Ibookmark) => {
    const bookmarks = store.getState().bookmark.bookmarks;
    const index = bookmarks.findIndex((bookmark) => bookmark.id === card.id);

    dispatch(removeBookmark(index));

    console.log(store.getState().bookmark.bookmarks);
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button key={number} onClick={() => setCurrentPage(number)}>
        {number}
      </button>
    );
  });

  const handleRemoveAllcards = () => {
    dispatch(removeAllBookmarks());
  };

  const handleHide = () => {};

  return (
    <div className="container__cards--home">
      <div>
        <button onClick={handleRemoveAllcards}>Remove All</button>
      </div>
      <div>{renderPageNumbers}</div>

      <div className="container__cards">
        {currentCharacters &&
          currentCharacters.map((bookmark) => (
            <div key={bookmark.id} className="container__card--character">
              <div>
                <img
                  className="img__character"
                  src={`${bookmark.thumbnail.path}.${bookmark.thumbnail.extension}`}
                  alt={bookmark.name}
                />
              </div>
              <div className="container__btn--title">
                <h2>
                  {bookmark.name === undefined ? bookmark.title : bookmark.name}
                </h2>

                <button onClick={() => handleRemoveCard(bookmark)}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5662/5662990.png"
                    alt="saveCard"
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainBookMark;
