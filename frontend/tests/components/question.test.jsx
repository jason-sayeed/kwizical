import { screen, render } from "@testing-library/react";
import Question from "../../src/components/Question/Question";
import "@testing-library/jest-dom";

describe("Question component", () => {
  test("Question is generated for track title", () => {
    render(<Question questionType={0} />);
    expect(screen.queryByText("Name the track")).toBeInTheDocument();
  });

  test("Question is generated for artist name", () => {
    render(<Question questionType={1} />);
    expect(screen.queryByText("Name the artist")).toBeInTheDocument();
  });

  test("Question is generated for album title", () => {
    render(<Question questionType={2} />);
    expect(screen.queryByText("Name the album")).toBeInTheDocument();
  });

  test("Question is generated for release date", () => {
    render(<Question questionType={3} />);
    expect(screen.queryByText("Guess the year")).toBeInTheDocument();
  });
});
