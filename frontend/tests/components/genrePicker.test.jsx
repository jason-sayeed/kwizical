import GenrePicker from "../../src/components/GenrePicker/GenrePicker";
import { vi } from 'vitest';
import { render, fireEvent, screen } from "@testing-library/react";

describe('GenrePicker Component', () => {
    const mockOnGenreSelect = vi.fn();

    test('calls onGenreSelect with correct genre ID when a genre button is clicked', () => {
        const genreId = 132;
        render(<GenrePicker onGenreSelect = {mockOnGenreSelect} />);
        const playButton = screen.getByText('Pop');
        fireEvent.click(playButton); 
        expect(mockOnGenreSelect).toHaveBeenCalledWith(genreId, "bg-pop");
    });

    test('all the buttons for all genres are created', () => {
        render(<GenrePicker onGenreSelect = {mockOnGenreSelect} />);
        expect(screen.getByText('Pop')).toBeTruthy();
        expect(screen.getByText('Rap/Hiphop')).toBeTruthy();
        expect(screen.getByText('RnB')).toBeTruthy();
        expect(screen.getByText('Dance')).toBeTruthy();
        expect(screen.getByText('Films/Games')).toBeTruthy();
        expect(screen.getByText('Metal')).toBeTruthy();
    })
});


