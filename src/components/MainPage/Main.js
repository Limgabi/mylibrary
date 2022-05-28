import React, { useEffect, useState } from "react";
import { bookSearch } from "../../api";
import BookList from "./BookList";

function Main() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

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
      size: 10,
      target: 'title',
    };
    const { data } = await bookSearch(params);
    if (reset) {
      setBooks(data.documents);
      console.log(books)
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
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <h1>My Library</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={search}
            onChange={onChange}
            placeholder="책 이름을 입력하세요"
          />
          <button>검색</button>
        </form>
      </div>
      <div>
        {
          books.length > 0
            ? <BookList books={books} />
            : null
        }
      </div>
    </>
  )
}

export default Main;