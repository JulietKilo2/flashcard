import React from "react";
import indexCardsImg from "../../assets/indexcards.jpg";
import createListImg from "../../assets/createListImg.png";
import libraryImg from "../../assets/libraryImg.png";
import flashfrontImg from "../../assets/flashfront.png";
import flashbackImg from "../../assets/flashback.png";
import "./Home.scss";

export default function Home() {
  return (
    <div>
      <article className="home-article">
        <img src={indexCardsImg} alt="index cards" />
        <p>Flashbook은 암기학습을 도와주는 웹 앱입니다.</p>
        <p>북미에서 인기있는 학용품 Index Card를 참고하였습니다.</p>
        <p>
          PC와 모바일에서 손쉽게 단어장을 작성하여 언제든지 학습할수 있도록
          도와드립니다.
        </p>
      </article>
      <article className="home-article">
        <img src={createListImg} alt="create list page" />
        <p>먼저 '만들기' 탭에서 단어장을 만드세요.</p>
        <p>꼭 '완성하기' 버튼을 누르셔야 저장이 됩니다!</p>
      </article>
      <article className="home-article">
        <img src={libraryImg} alt="library page" />
        <p>'라이브러리'에서 단어장들을 관리합니다.</p>
        <p>'테스트' 버튼을 누르면 플래시카드로 이동합니다.</p>
      </article>
      <article className="home-article">
        <img src={flashfrontImg} alt="front side of flash card" />
        <p>플래시카드 앞면은 항상 단어 이름을 보여줍니다.</p>
        <p>'이전'과 '다음' 버튼으로 목록사이를 이동합니다.</p>
        <img src={flashbackImg} alt="back side of flash card" />
        <p>'뒤집기'를 누르면 단어 뜻을 보여줍니다.</p>
      </article>
    </div>
  );
}
