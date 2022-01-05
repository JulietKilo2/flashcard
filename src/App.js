import "./App.css";
import CreateList from "./components/createlist/CreateList";

function App() {
  return (
    <div className="App">
      <header>
        <h1>플래시카드</h1>
      </header>
      <nav>
        <ul>
          <li>대시보드</li>
          <li>라이브러리</li>
          <li>만들기</li>
        </ul>
      </nav>
      <div>
        단어장 목록
        <CreateList />
        {/* 단어장이 있으면 목록으로 보여줌. */}
        {/* 단어장이 없으면 아무것도 없다는 것을 보여줌 */}
        {/* 각 단어장 컴포넌트들은 공부하기와 테스트하기 기능이 있음. */}
        {/* 공부하기 -> 단어 리스트 보여주기 */}
        {/* 테스트 -> 플래시카드 형식으로 단어 보여주기 */}
      </div>
    </div>
  );
}

export default App;
