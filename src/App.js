import { useEffect, useRef } from "react";
import "./App.css";
import useFetch from "./api/useFetch";
import Card from "./components/Card";

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function App() {
  const { data, nextPage } = useFetch();
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Run the function you want to run
        nextPage();
        console.log("Element is in viewport");
      }
    });

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 px-6 place-items-center gap-12">
        {data.map((item, idx) => {
          return <Card key={idx} {...item} />;
        })}
      </div>
      <img src="/spinner.gif" ref={elementRef} className="size-20 mx-auto mt-6" />
    </main>
  );
}

export default App;
