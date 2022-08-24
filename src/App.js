import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [experience, setExperience] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeExperience, setActiveExperience] = useState({});
  const [isActiveTab, setIsActiveTab] = useState("recAGJfiU4CeaV0HL");
  const { title, company, dates, duties } = activeExperience;

  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      setExperience(res);
      setActiveExperience(res[0]);
      setIsLoading(false);
    });
  }, []);
  
  console.log(experience);
  const filterExp = (id) => {
    const filteredExp = experience.filter((exp) => exp.id === id);
    setActiveExperience(filteredExp[0]);
    setIsActiveTab(id);
  };

  return (
    <main>
      <h1>Experience</h1>
      <div className="underline"></div>
      {isLoading 
      ? <LoadingSpinner />
      : <div className="container">
        <div className="tab-menu">
          {experience.map((item, index) => {
            return (
              <button
                className={isActiveTab === item.id ? "btn active" : "btn"}
                key={item.id}
                onClick={() => filterExp(item.id)}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        <div className="experience">
          <h4> {title} </h4>
          <span>{company}</span>
          <span>{dates}</span>
          <div className="duties">
            {duties.map((duty, index) => {
              return <p key={index}><span><FaAngleDoubleRight/></span>{duty}</p>;
            })}
          </div>
        </div>
      </div>
      }
    </main>
  );
}

export default App;
