import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { QuizPage } from "../../src/pages/Quiz/QuizPage";
import { afterEach, describe, vi } from "vitest";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  return { useNavigate: () => navigateMock };
});

beforeAll(() => {
    vi.mock("../../helpers/answer_generator", () => {
        const mockAnswers = vi.fn();
        mockAnswers.mockResolvedValue({
            selectedTrack: {
                title: "Correct Track Title",
                artist: "Correct Artist",
                album: { title: "Correct Album Title" },
                preview: "examplePreviewUrl"
            },
            shuffledArtistAnswerList: ['Artist 1' , 'Artist 2', 'Artist 3', 'Correct Artist'],
            questionType: 1
        });
        return {
            answers: () => mockAnswers()
        };
    });
});

afterEach(() => {
  localStorage.clear();
});

describe("Genre page transition", () => {
  test("Page transitions from genre selection to quiz page correctly", async () => {
    render(<QuizPage />);
    expect(screen.getByText("Metal")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Casual Mode"));
    expect(screen.getByText("Question 1 of 5")).toBeInTheDocument();
  });
});

describe("Audio button component", () => {
  test("Play button is accessible on the page", () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Casual Mode"));
    const playButton = screen.getByRole("button");
    expect(playButton.textContent).toBe("▶");
  });

  test("Pause button is accessible on the page", () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Casual Mode"));
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    expect(playButton.textContent).toBe("❚❚");
  });

  test("AudioButton changes state to play when clicked", () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Casual Mode"));
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    fireEvent.click(playButton);
    expect(playButton.textContent).toBe("▶");
  });

  test("Audio playback starts when play button is clicked", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Casual Mode"));
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    await waitFor(() => expect(screen.getByText("❚❚")).toBeInTheDocument());
  });

  test("Audio playback stops when play button is clicked", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Expert Mode"));
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    fireEvent.click(playButton);
    await waitFor(() => expect(screen.getByText("▶")).toBeInTheDocument());
  });
});

describe("Question component", () => {
    test("Question displays on page", async () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        fireEvent.click(screen.getByText("Casual Mode"));
        await waitFor(() => expect(screen.queryByText("Name the artist")).toBeInTheDocument());
    });

  test("After selecting an answer, another question is generated on the page", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Casual Mode"));
    await waitFor(() => screen.getByText("Question 1 of 5"));
    fireEvent.click(screen.getByText("Correct Artist"));
    await waitFor(() =>
      expect(screen.getByText("Question 2 of 5")).toBeInTheDocument()
    );
  });
});

describe("Answer component", () => {
    test("All answers are shown on the page", async () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        fireEvent.click(screen.getByText("Casual Mode"));
        await waitFor(() => screen.getByText("Artist 1"));
        expect(screen.getByText("Artist 1")).toBeInTheDocument();
        expect(screen.getByText("Artist 2")).toBeInTheDocument();
        expect(screen.getByText("Artist 3")).toBeInTheDocument();
        expect(screen.getByText("Correct Artist")).toBeInTheDocument();
    });

    test("Button changes to green when correct answer is clicked on the page", async () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        fireEvent.click(screen.getByText("Casual Mode"));
        await waitFor(() => screen.getByText("Artist 1"));
        fireEvent.click(screen.getByText('Correct Artist'))
        expect(screen.getByText('Correct Artist')).toHaveClass('bg-correct-color')
    })

  test("Button changes to red when incorrect answer is clicked on the page", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Casual Mode"));
    await waitFor(() => screen.getByText("Artist 1"));
    fireEvent.click(screen.getByText("Artist 2"));
    expect(screen.getByText("Artist 2")).toHaveClass("bg-incorrect-color");
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  test("After answering five questions the player should be taken to the score page", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Casual Mode"));
    await waitFor(() => screen.getByText("Question 1 of 5"));
    fireEvent.click(screen.getByText("Correct Artist"));
    await waitFor(() => screen.getByText("Question 2 of 5"));
    fireEvent.click(screen.getByText("Artist 1"));
    await waitFor(() => screen.getByText("Question 3 of 5"));
    fireEvent.click(screen.getByText("Artist 2"));
    await waitFor(() => screen.getByText("Question 4 of 5"));
    fireEvent.click(screen.getByText("Artist 3"));
    await waitFor(() => screen.getByText("Question 5 of 5"));
    fireEvent.click(screen.getByText("Correct Artist"));
    await delay(2000);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/score");
  }, 7000);
});

describe("Timer component", () => {
  test("If answered immediately, bonus points are awarded", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    fireEvent.click(screen.getByText("Casual Mode"));
    await waitFor(() => screen.getByText("Artist 1")); 
    fireEvent.click(screen.getByText("Correct Artist"));
    expect(screen.getByText("Speed Bonus: 50")).toBeInTheDocument();
  }); 
});