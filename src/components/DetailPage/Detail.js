import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dbService } from "../../fbase";
import { addDoc, collection } from "firebase/firestore";
import style from "./Detail.module.css"

function Detail({ isLoggedIn, userObj }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const bookTitle = data.title.split(':');
  const datetime = data.datetime.substr(0, 10);
  const discountRate = Math.floor((data.price - data.sale_price) / data.price * 100);

  const [clickToggle, setClickToggle] = useState(false);

  const handleToggle = () => {
    setClickToggle(!clickToggle);
  }

  const addMyLib = async () => {
    if (isLoggedIn) {
      let bookObj = {
        title: data.title,
        img: data.thumbnail,
        author: data.authors,
        isbn: data.isbn,
        userId: userObj.uid,
        userName: userObj.displayName
      };
      await addDoc(collection(dbService, "books"), bookObj);
      navigate('/profile');
    } else {
      if(window.confirm("로그인을 해주세요. 로그인 화면으로 이동합니다.")) {
        navigate('/auth');
      }
    }  
  }

  const onClickRecord = (title, img) => {
    navigate('/record', {
      state: {
        title: title,
        img: img
      }
    })
  }

  return (
    <div className={style.container}>
      <div className={style.bookImg}>
        <img src={data.thumbnail} />
      </div>
      <div className={style.info}>
        <div className={style.infoTop}>
          <div className={style.title}>
            <h2>{bookTitle[0]}</h2>
            {bookTitle[1]
              ? <h3>{bookTitle[1]}</h3>
              : null}
          </div>
          <span className={style.auth}>
            <span className={style.author}>{data.authors}</span><em />
            <span className={style.publisher}>{data.publisher}</span><em />
            <span className={style.datetime}>{datetime}</span>
          </span>
        </div>
        <div className={style.infoBottom}>
          <table>
            <colgroup>
              <col width="110" />
              <col width="*" />
            </colgroup>
            <caption style={{ display: "none" }}>책 가격 정보</caption>
            <tbody>
              <tr className={style.price}>
                <th scope="row">정가</th>
                <td><span>{data.price}원</span></td>
              </tr>
              <tr className={style.sale_price}>
                <th scope="row">판매가</th>
                <td>{data.sale_price}<span>원</span><span>({discountRate}% 할인)</span></td>
              </tr>
            </tbody>
          </table>
          <div className={style.summary}>
            <span>{data.contents.substr(0, 130)}</span>
            {clickToggle && <span>{data.contents.substr(130)}</span>}
            {data.contents.length > 130 && !clickToggle &&
              <span style={{ color: "#666", fontSize: "14px" }} onClick={handleToggle}>...더보기</span>
            }
          </div>
          <div className={style.btns}>
            <button className={style.addBtn} onClick={addMyLib}>내 서재에 추가</button>
            <button className={style.recordBtn} onClick={()=>onClickRecord(data.title, data.thumbnail)}>기록하기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;