import React, { useEffect, useState } from "react";
import { bookSearch } from "../../api";
import BookList from "./BookList";
import { AiOutlineSearch } from "react-icons/ai";

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
    <div style={{ margin: "32px auto", width: "80%" }}>
      <div style={{ textAlign: "center" }}>
        <h1>My Library</h1>
        <form onSubmit={onSubmit}>
          <input
            style={{
              width: "300px",
              height: "50px",
              borderRadius: "5px",
              display: "inline",
              boxSizing: "borderBox",
              outline: "none",
              fontSize: "1em",
              paddingLeft: "16px"
            }}
            type="text"
            value={search}
            onChange={onChange}
            placeholder="책 이름을 입력하세요"
          />
          <button style={{
            backgroundColor: "inherit",
            height: "50px",
            border: "none",
            padding: "8px 3px",
            marginLeft: "-40px",
            display: "inline",
            boxSizing: "borderBox",
            fontSize: "1em"
          }}><AiOutlineSearch/></button>
        </form>
      </div>
      <div>
        {
          books.length > 0
            ? <BookList books={books} />
            : null
        }
      </div>
    </div>
  )
}

export default Main;