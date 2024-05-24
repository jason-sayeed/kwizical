import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import ScorePage from "../../src/pages/Score/ScorePage";
import '@testing-library/jest-dom';
import { useNavigate } from "react-router-dom";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { 
        ...actual,
        useNavigate: useNavigateMock 
    };
});

beforeAll(() => {
    // Mocking the score service
    vi.mock("../../src/services/scoreService.js", () => {
    const getUsersForLeaderboardMock = vi.fn();
    getUsersForLeaderboardMock.mockResolvedValue([{name: "testUser", score: 100}]);
    return { getUsersForLeaderboard: getUsersForLeaderboardMock };
  });
});

describe("Score page", () => {
    test('retrieves data from local storage', () => {
        localStorage.setItem('genreID', '116');
        localStorage.setItem('score', '300');
        localStorage.setItem('bonus', '50');

        render(<ScorePage />);

        expect(screen.getByText('ROUND SCORE: 300')).toBeInTheDocument();
        expect(screen.getByText('PERFECT ROUND BONUS: 0')).toBeInTheDocument();
        expect(screen.getByText('SPEED BONUS: 50')).toBeInTheDocument();
        expect(screen.getByText('YOUR SCORE: 350')).toBeInTheDocument();
    })

    test('retrieves data from local storage and displays a rating', () => {
        localStorage.setItem('genreID', '132');
        localStorage.setItem('score', '0');
        localStorage.setItem('bonus', '0');

        render(<ScorePage />);

        expect(screen.getByText('ROUND SCORE: 0')).toBeInTheDocument();
        expect(screen.getByText('PERFECT ROUND BONUS: 0')).toBeInTheDocument();
        expect(screen.getByText('SPEED BONUS: 0')).toBeInTheDocument();
        expect(screen.getByText('YOUR SCORE: 0')).toBeInTheDocument();
        expect(screen.getByText('Do you even moonwalk?')).toBeInTheDocument();
    })

    test('handles empty localStorage', () => {
        localStorage.clear();
        render(<ScorePage />);

        expect(screen.getByText("ROUND SCORE:")).toBeInTheDocument();
        expect(screen.getByText(/PERFECT ROUND BONUS: 0/)).toBeInTheDocument();
        expect(screen.getByText("SPEED BONUS:")).toBeInTheDocument();
        expect(screen.getByText(/YOUR SCORE: 0/)).toBeInTheDocument();
        expect(screen.getByText(/Default rating message/)).toBeInTheDocument();
    });
});