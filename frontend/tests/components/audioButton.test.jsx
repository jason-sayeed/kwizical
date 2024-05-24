import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import AudioButton from "../../src/components/AudioButton/AudioButton";
import "@testing-library/jest-dom";

describe("AudioButton", () => {
  test("AudioButton before clicked", () => {
    const mockOnPlayPause = vi.fn();
    render(
      <AudioButton
        trackPreview="test-preview"
        onPlayPause={mockOnPlayPause}
        playButtonState={false}
      />
    );
    const playButton = screen.getByRole("button");
    expect(playButton.textContent).toBe("▶");
  });

  test("AudioButton changes state to pause when play button state is true", () => {
    const playStub = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(() => {});
    const mockOnPlayPause = vi.fn();
    render(
      <AudioButton
        trackPreview="test-preview"
        onPlayPause={mockOnPlayPause}
        playButtonState={true}
      />
    );
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    expect(playStub).toHaveBeenCalled();
    expect(mockOnPlayPause).toHaveBeenCalled();
    expect(playButton.textContent).toBe("❚❚");
    playStub.mockRestore();
  });

  test("AudioButton changes state to play when clicked", () => {
    const playStub = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(() => {});
    const mockOnPlayPause = vi.fn();
    render(
      <AudioButton
        trackPreview="test-preview"
        onPlayPause={mockOnPlayPause}
        playButtonState={false}
      />
    );
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    expect(playStub).toHaveBeenCalled();
    expect(mockOnPlayPause).toHaveBeenCalled();
    expect(playButton.textContent).toBe("▶");
    playStub.mockRestore();
  });
});
