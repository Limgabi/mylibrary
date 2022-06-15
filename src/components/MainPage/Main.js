import React, { useEffect, useState } from "react";
import { bookSearch } from "../../api";
import BookList from "./BookList";
import Pagination from "./Pagination";
import style from "./Main.module.css";
import { AiOutlineSearch } from "react-icons/ai";

function Main() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [currPage, setCurrPage] = useState(1);
  const [bookLimit, setBookLimit] = useState(10); // 한 페이지에 책 10개 

  const idxOfLast = currPage * bookLimit;
  const idxOfFirst = idxOfLast - bookLimit;
  const currBooks = (books) => {
    let currBooks = 0;
    currBooks = books.slice(idxOfFirst, idxOfLast);
    return currBooks;
  }

  useEffect(() => {
    if (query.length > 0) {
      bookSearchHandler(query, true);
    }
  }, [query]);

  const bookSearchHandler = async (query, reset) => {
    const params = {
      query: search,
      sort: 'accuracy',
      page: 1,
      size: 50,
      target: 'title',
    };
    const { data } = await bookSearch(params);
    if (reset) {
      setBooks(data.documents);
    } else {
      setBooks(books.concat(data.documents));
    }
  }

  const onChange = (e) => {
    setSearch(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <>
      <div style={{ margin: "32px auto", width: "80%" }}>
        <div className={style.search}>
          <form onSubmit={onSubmit}>
            <input
              className={style.searchBar}
              type="text"
              value={search}
              onChange={onChange}
              placeholder="책 이름을 입력하세요"
            />
            <button className={style.searchBtn}><AiOutlineSearch /></button>
          </form>
        </div>
        <div>
          {
            books.length > 0
              ? (<>
                <BookList books={currBooks(books)} />
                <Pagination
                  bookLimit={bookLimit}
                  totalBooks={books.length}
                  paginate={setCurrPage}
                />
              </>)
              : null
          }
        </div>
      </div>
    </>
  )
}

export default Main;