import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dbService } from '../../fbase';
import style from "./Record.module.css";

function Record({ isLoggedIn, userObj }) {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const books = JSON.parse(localStorage.getItem("books"));
  const [bookTitle, setBookTitle] = useState([]);
  const [selected, setSelected] = useState("");
  const [recordContent, setRecordContent] = useState('');

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    let bookArr = [];
    books.map((book) => (
      bookArr.push(book.title)
    ))
    setBookTitle(bookArr);
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    let record = {};
    if (!data) {
      record = {
        title: selected,
        content: recordContent,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        creatorName: userObj.displayName,
      }
    } else {
      record = {
        title: data.title,
        content: recordContent,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        creatorName: userObj.displayName,
      }
    }
    await addDoc(collection(dbService, "records"), record);
    setRecordContent('');
    alert("글이 정상적으로 등록되었습니다.");
    navigate("/");
  }

  return (
    <div className={style.container}>
      <h2>{`${userObj.displayName}님의 📝`}</h2>
      <form onSubmit={onSubmit}>
        {!data && (
          <>
            <select onChange={handleSelect} value={selected}>
              <option>기록할 책을 선택하세요</option>
              {bookTitle.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <h3>{selected}</h3>
          </>
        )
        }
        {data && <h3>{data.title}</h3>}
        <textarea className={style.content} value={recordContent} placeholder="느낀 점을 기록하세요" onChange={(e) => { setRecordContent(e.target.value) }} />
        <input type="submit" className={style.submitBtn} value="리뷰 작성" />
      </form>
    </div>
  );
}

export default Record;