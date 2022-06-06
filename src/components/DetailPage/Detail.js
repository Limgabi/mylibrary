import React from "react";
import { useLocation, useParams } from "react-router-dom";

function Detail() {
  const {id} = useParams();
  const location = useLocation();
  const data = location.state;

  console.log(data);
  return (
    <div style={{
      width: "60%",
      margin: "32px auto",
      textAlign: "center",
      padding: "16px",
      border: "1px solid black"
    }}>
      <img src={data.thumbnail}/>
      <p>{data.title}</p>
      <p>{data.contents}</p>
    </div>
  )
} 

export default Detail;