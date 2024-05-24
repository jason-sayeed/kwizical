import { render, screen, fireEvent } from "@testing-library/react";
import Answer from "../../src/components/Answer/Answer";
import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";

describe("Answer", () => {
  afterEach(() => {
    localStorage.clear();
  })

  test("All answers shown on page", () => {
    const selectedTrack = { artist: "correct-answer" };
    const shuffledArtistAnswerList = [
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "correct-answer",
    ];
    const mockOnAnswerButtonClick = vi.fn();
    render(
      <Answer
        selectedTrack={selectedTrack}
        shuffledArtistAnswerList={shuffledArtistAnswerList}
        onAnswerButtonClick={mockOnAnswerButtonClick}
      />
    );
    shuffledArtistAnswerList.forEach((artist) => {
      expect(screen.getByText(artist)).toBeInTheDocument();
    });
  });

    test('Button changes to green when correct answer is clicked', () => {
        const selectedTrack = {
            title: "Correct Track Title",
            artist: "Correct Artist",
            album: { title: "Correct Album Title" }
        };
        // const selectedTrack = {artist: "correct-answer"};
        const shuffledArtistAnswerList = ['Artist 1' , 'Artist 2', 'Artist 3', 'Correct Artist'];
        const mockOnAnswerButtonClick = vi.fn();
        render(
            <Answer
                selectedTrack={selectedTrack}
                shuffledArtistAnswerList={shuffledArtistAnswerList}
                onAnswerButtonClick={mockOnAnswerButtonClick}
            />
        );
        fireEvent.click(screen.getByText('Correct Artist'))
        expect(screen.getByText('Correct Artist')).toHaveClass('bg-correct-color')
    })

    test('Button changes to red when incorrect answer is clicked', () => {
        const selectedTrack = {
            title: "Correct Track Title",
            artist: "Correct Artist",
            album: { title: "Correct Album Title" }
        };
        // const selectedTrack = {artist: "correct-answer"};
        const shuffledArtistAnswerList = ['Artist 1' , 'Artist 2', 'Artist 3', 'Correct Artist'];
        const mockOnAnswerButtonClick = vi.fn();
        render(
            <Answer
                selectedTrack={selectedTrack}
                shuffledArtistAnswerList={shuffledArtistAnswerList}
                onAnswerButtonClick={mockOnAnswerButtonClick}
            />
        );
        fireEvent.click(screen.getByText('Artist 1'))
        expect(screen.getByText('Artist 1')).toHaveClass('bg-incorrect-color')
        fireEvent.click(screen.getByText('Artist 2'))
        expect(screen.getByText('Artist 2')).toHaveClass('bg-incorrect-color')
        fireEvent.click(screen.getByText('Artist 3'))
        expect(screen.getByText('Artist 3')).toHaveClass('bg-incorrect-color')
    })

  test("Score is 0 at the start", () => {
    const selectedTrack = { artist: "correct-answer" };
    const shuffledArtistAnswerList = [
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "correct-answer",
    ];
    const mockOnAnswerButtonClick = vi.fn();
    render(
      <Answer
        selectedTrack={selectedTrack}
        shuffledArtistAnswerList={shuffledArtistAnswerList}
        onAnswerButtonClick={mockOnAnswerButtonClick}
      />
    );
    expect(screen.getByText("Your Score: 0")).toBeInTheDocument();
  });

  test("Score is updated to 100 when correct answer is clicked, bonus of 50 points if less than 5 seconds", () => {
    const selectedTrack = { artist: "correct-answer" };
    const shuffledArtistAnswerList = [
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "correct-answer",
    ];
    const mockOnAnswerButtonClick = vi.fn();
    render(
      <Answer
        selectedTrack={selectedTrack}
        shuffledArtistAnswerList={shuffledArtistAnswerList}
        onAnswerButtonClick={mockOnAnswerButtonClick}
        time = {4}
      />
    );
    fireEvent.click(screen.getByText("correct-answer"));
    expect(screen.getByText("Your Score: 100")).toBeInTheDocument();
    expect(screen.getByText("Speed Bonus: 50")).toBeInTheDocument();
  });

  test("Score is updated to 100 when correct answer is clicked, no bonus if more than 5 seconds", () => {
    const selectedTrack = { artist: "correct-answer" };
    const shuffledArtistAnswerList = [
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "correct-answer",
    ];
    const mockOnAnswerButtonClick = vi.fn();
    render(
      <Answer
        selectedTrack={selectedTrack}
        shuffledArtistAnswerList={shuffledArtistAnswerList}
        onAnswerButtonClick={mockOnAnswerButtonClick}
        time = {6}
      />
    );
    fireEvent.click(screen.getByText("correct-answer"));
    expect(screen.getByText("Your Score: 100")).toBeInTheDocument();
    expect(screen.getByText("Speed Bonus: 0")).toBeInTheDocument();
  });

  test("Score stays at 0 when incorrect answer is clicked and less than 5 seconds", () => {
    const selectedTrack = { artist: "correct-answer" };
    const shuffledArtistAnswerList = [
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "correct-answer",

    ];
    const mockOnAnswerButtonClick = vi.fn();
    render(
      <Answer
        selectedTrack={selectedTrack}
        shuffledArtistAnswerList={shuffledArtistAnswerList}
        onAnswerButtonClick={mockOnAnswerButtonClick}
        time = {4}
      />
    );
    fireEvent.click(screen.getByText("Artist 1"));
    expect(screen.getByText("Your Score: 0")).toBeInTheDocument();
    expect(screen.getByText("Speed Bonus: 0")).toBeInTheDocument();
  });


  test("Score stays at 0 when incorrect answer is clicked and more than 5 seconds", () => {
    const selectedTrack = { artist: "correct-answer" };
    const shuffledArtistAnswerList = [
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "correct-answer",
      
    ];
    const mockOnAnswerButtonClick = vi.fn();
    render(
      <Answer
        selectedTrack={selectedTrack}
        shuffledArtistAnswerList={shuffledArtistAnswerList}
        onAnswerButtonClick={mockOnAnswerButtonClick}
        time = {6}
      />
    );
    fireEvent.click(screen.getByText("Artist 1"));
    expect(screen.getByText("Your Score: 0")).toBeInTheDocument();
    expect(screen.getByText("Speed Bonus: 0")).toBeInTheDocument();
  });

  test("Buttons are disabled when interactionDisabled is true", () => {
    const selectedTrack = { artist: "correct-answer" };
    const shuffledArtistAnswerList = [
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "correct-answer",
    ];
    const mockOnAnswerButtonClick = vi.fn();
    render(
      <Answer
        selectedTrack={selectedTrack}
        shuffledArtistAnswerList={shuffledArtistAnswerList}
        onAnswerButtonClick={mockOnAnswerButtonClick}
        interactionDisabled={true}
      />
    );
    fireEvent.click(screen.getByText("Artist 1"));
    expect(screen.getByText("Artist 1")).toBeDisabled();
    expect(screen.getByText("Artist 2")).toBeDisabled();
    expect(screen.getByText("Artist 3")).toBeDisabled();
    expect(screen.getByText("correct-answer")).toBeDisabled();
  });

  test("Score does not change when interactionDisabled is true", () => {
    const selectedTrack = { artist: "correct-answer" };
    const shuffledArtistAnswerList = [
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "correct-answer",
    ];
    const mockOnAnswerButtonClick = vi.fn();
    render(
      <Answer
        selectedTrack={selectedTrack}
        shuffledArtistAnswerList={shuffledArtistAnswerList}
        onAnswerButtonClick={mockOnAnswerButtonClick}
        interactionDisabled={true}
      />
    );
    fireEvent.click(screen.getByText("correct-answer"));
    expect(screen.getByText("Your Score: 0")).toBeInTheDocument();
  });

  test("Button colors reset after a certain time", async () => {
    const selectedTrack = { artist: "correct-answer" };
    const shuffledArtistAnswerList = [
      "Artist 1",
      "Artist 2",
      "Artist 3",
      "correct-answer",
    ];
    const mockOnAnswerButtonClick = vi.fn();
    render(
      <Answer
        selectedTrack={selectedTrack}
        shuffledArtistAnswerList={shuffledArtistAnswerList}
        onAnswerButtonClick={mockOnAnswerButtonClick}
      />
    );
    fireEvent.click(screen.getByText("correct-answer"));
    expect(screen.getByText("correct-answer")).toHaveClass("bg-correct-color");
    await new Promise((resolve) => setTimeout(resolve, 1600));
    expect(screen.getByText("correct-answer")).toHaveClass("bg-box-color");
  });
});
