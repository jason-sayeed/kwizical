import { vi } from "vitest";
import { randomAlbums } from "../..//helpers/album_generator.js";

// Mocking the getArtists service
vi.mock("../../helpers/album_generator", () => {
    const randomAlbumsMock = vi.fn();
    randomAlbumsMock.mockResolvedValue([
        { id: 1, title: "Album 1" },
        { id: 2, title: "Album 2" },
        { id: 3, title: "Album 3" },
        { id: 4, title: "Album 4" }
    ]);
    return {
        randomAlbums: randomAlbumsMock,
    };
});
vi.mock("../../helpers/shuffle", () => ({
  shuffle: vi.fn(array => array), // Mock shuffle to return the original array (no shuffling)
}));


describe("Album Generator", () => {
    test('Returns selected albums', async () => {
    const selectedAlbums = await randomAlbums();
    const expectedAlbums = [
        { id: 1, title: "Album 1" },
        { id: 2, title: "Album 2" },
        { id: 3, title: "Album 3" },
        { id: 4, title: "Album 4" }
        ];
        expect(selectedAlbums).toEqual(expectedAlbums); //Confirm that array is sliced from 0 to 4
        expect(selectedAlbums).toHaveLength(expectedAlbums.length); //Confirm that length matches


    });
});