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
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="title">
          <h1>Experience</h1>
          <div className="underline"></div>
        </div>
        <LoadingSpinner />
      </>
    );
  }

  const { title, company, dates, duties } = experience[value];

  return (
    <main>
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>

      <div className="container">
        <section>
          <div className="tab-menu">
            {experience.map((item, index) => {
              return (
                <button
                  className={value === index ? "btn active" : "btn tab"}
                  key={item.id}
                  onClick={() => {
                    setValue(index);
                  }}
                >
                  {item.company}
                </button>
              );
            })}
          </div>
          <div className="experience">
            <h4> {title} </h4>
            <span>{company}</span>
            <p className="muted">{dates}</p>
            <div className="duties">
              {duties.map((duty, index) => {
                return (
                  <p key={index} className="duty">
                    <FaAngleDoubleRight className="icon" />
                    {duty}
                  </p>
                );
              })}
            </div>
          </div>
        </section>
        <button className="btn more-info">More Info</button>
      </div>
    </main>
  );
}

export default App;
