import React from "react";

export default function Library({ data }) {
  return (
    <div>
      <h1>라이브러리에요.</h1>
      {data &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.items.length}</p>
            </div>
          );
        })}
    </div>
  );
}
