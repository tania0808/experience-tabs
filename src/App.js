import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [experience, setExperience] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  
  const fetchData = async () => {
    const response = await fetch(url);
    const experience = await response.json();
    setExperience(experience);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData()
  }, []);

  if(isLoading) {
    return (
      <main>
        <h1>Experience</h1>
        <div className="underline"></div>
        <LoadingSpinner />
      </main>
    )
  }

  const { title, company, dates, duties} = experience[value];

  return (
    <main>
      <h1>Experience</h1>
      <div className="underline"></div>

      <div className="container">
        <div className="tab-menu">
          {experience.map((item, index) => {
            return (
              <button
                className={value === index ? "btn active" : "btn"}
                key={item.id}
                onClick={() => {
                  setValue(index)
                }}>
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
    </main>
  );
}

export default App;
