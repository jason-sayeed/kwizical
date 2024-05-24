import Difficulty from '../../src/components/Difficulty/difficulty';
import { vi } from 'vitest';
import { render, fireEvent, screen } from "@testing-library/react";

describe('GenrePicker Component', () => {
    const mockOnDifficultySelect = vi.fn();

    test('calls onDifficultySelect with correct ID when a difficulty mode button is clicked', () => {
        const id = 1;
        render(<Difficulty onDifficultySelect = {mockOnDifficultySelect} />);
        const playButton = screen.getByText('Casual Mode');
        fireEvent.click(playButton); 
        expect(mockOnDifficultySelect).toHaveBeenCalledWith(id);
    });

    test('all the buttons for difficulty are created', () => {
        render(<Difficulty onDifficultySelect = {mockOnDifficultySelect} />);
        expect(screen.getByText('Casual Mode')).toBeTruthy();
        expect(screen.getByText('Expert Mode')).toBeTruthy();
      
    })
});