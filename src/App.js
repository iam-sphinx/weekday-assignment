import "./App.css";
import useFetch from "./api/useFetch";
import Card from "./components/Card";

function App() {
  const { data, nextPage } = useFetch();
  console.log(data);
  return (
    <main className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 px-6 place-items-center gap-12">
      {data.map((item, idx) => {
        return <Card key={idx} {...item} />;
      })}
      <button onClick={nextPage}>Next page</button>
    </main>
  );
}

export default App;
