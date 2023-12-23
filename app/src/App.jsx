import React from "react";
import stylex from "@stylexjs/stylex";

const textStyles = stylex.create({
  headings: {
    color: "#eef4ed",
    fontFamily: "sans-serif",
    fontSize: "36px",
    fontWeight: "bold",
    lineHeight: 1.3,
    marginBottom: "10px",
  },
  paragraphs: {
    color: "#8da9c4",
    fontFamily: "sans-serif",
    fontSize: "14px",
    lineHeight: 1.75,
  },
});

const containerStyles = stylex.create({
  main: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#0b2545",
    borderRadius: "25px",
    boxShadow: "0px 10px 48px -13px rgba(0, 0, 0, 0.5)",
    padding: "50px",
    width: "350px",
  },
});

export function App() {
  return (
    <>
      <div {...stylex.props(containerStyles.main)}>
        <div {...stylex.props(containerStyles.content)}>
          <h1 {...stylex.props(textStyles.headings)}>My React & StyleX App!</h1>
          <p {...stylex.props(textStyles.paragraphs)}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus, pariatur illum amet debitis ut eius quas soluta iste
            tempora porro tempore quam harum itaque nostrum distinctio ratione!
            Quam nobis, laudantium at adipisci sequi ullam impedit?
          </p>
        </div>
      </div>
    </>
  );
}
