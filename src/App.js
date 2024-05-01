import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./api/useFetch";
import Card from "./components/Card";
import MultipleSelect from "./components/MultipleSelect";
import SingleSelect from "./components/SingleSelect";
import {
  jobLocation,
  jobRoles,
  minBasePay,
  minExperience,
} from "./config/lists";
import Input from "./components/Input";

function App() {
  const { data, nextPage } = useFetch();

  // filter states
  const [minExp, setMinExp] = useState("0");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [roles, setRoles] = useState([""]);
  const [minBase, setMinBase] = useState("0L");

  const elementRef = useRef(null);
  const handleRoles = (data) => {
    setRoles(data);
  };

  const handleLocation = (data) => {
    setLocation(data);
  };

  const hanelExp = (exp) => {
    setMinExp(exp);
  };

  const handleBase = (base) => {
    setMinBase(base);
  };

  const handleCompany = (name) => {
    setCompanyName(name);
  };

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
      <div className="flex items-center gap-3 flex-wrap justify-center mb-6">
        <MultipleSelect
          setState={handleRoles}
          state={roles}
          list={jobRoles}
          label={"roles"}
        />
        <SingleSelect
          setState={handleLocation}
          state={location}
          list={jobLocation}
          label={"location"}
        />
        <SingleSelect
          state={minExp}
          setState={hanelExp}
          list={minExperience}
          label={"min exp"}
        />

        <SingleSelect
          state={minBase}
          setState={handleBase}
          list={minBasePay}
          label={"min base"}
        />
        <Input label={"company"} setState={handleCompany} state={companyName} />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 px-6 place-items-center gap-12">
        {data
          .filter(
            (item) =>
              roles.length === 1 ||
              roles.some(
                (value) => value.toLowerCase() === item?.jobRole.toLowerCase()
              )
          )
          // this filters out based on job location
          .filter((item) => {
            if (location === "Remote") {
              return item?.location === "remote";
            } else {
              return item?.location !== "remote";
            }
          })
          // this filters out based on minimum experience
          .filter((item) => {
            if (minExp === 0) {
              return item?.minExp == null || item?.minExp >= minExp;
            } else {
              return item?.minExp >= minExp;
            }
          })
          // this filters out based on minimum base salary
          .filter((item) => {
            if (minBase === "0L") {
              return (
                item?.minJdSalary == null ||
                item?.minJdSalary >= minBase?.slice(0, -1)
              );
            } else {
              return item?.minJdSalary >= minBase?.slice(0, -1);
            }
          })
          // this filters out based on job company
          // there isn't any company name listed on api so I have implemented using link
          .filter((item) => {
            return companyName.length == 0 || item?.jdLink === companyName;
          })
          .map((item, idx) => {
            return <Card key={idx} {...item} />;
          })}
      </div>
      <img
        src="/spinner.gif"
        ref={elementRef}
        className="size-20 mx-auto mt-6"
      />
    </main>
  );
}

export default App;
