import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import { getTopTracksForArtist, getArtistsForGenre, getGenres, getTrack } from "../../src/services/deezerService";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("deezer service", () => {
  describe("getGenres", () => {

    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getGenres();
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch genres");
      }
    });

    test("returns genre names", async () => {
      fetch.mockResponseOnce(JSON.stringify([{name: "Pop"}, {name: "Rock"}]), {
        status: 200,
      });

      const genres = await getGenres();

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];


      expect(url).toEqual(`${BACKEND_URL}/music/genre`);
      expect(options.method).toEqual("GET");
      expect(genres[0].name).toEqual("Pop");
      expect(genres[1].name).toEqual("Rock");
    });
  });

  describe("getArtists", () => {

    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getArtistsForGenre(132);
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch artists");
      }
    });

    test("returns artist names", async () => {
      fetch.mockResponseOnce(JSON.stringify([{name: "Ed Sheeran"}, {name: "Justin Bieber"}]), {
        status: 200,
      });

      const artists = await getArtistsForGenre(132);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];


      expect(url).toEqual(`${BACKEND_URL}/music/genre/132/artists`);
      expect(options.method).toEqual("GET");
      expect(artists[0].name).toEqual("Ed Sheeran");
      expect(artists[1].name).toEqual("Justin Bieber");
    });
  });

  describe("getTracks", () => {
    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getTopTracksForArtist(288166);
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch top tracks for artist");
      }
    });

    test("returns track names", async () => {
      fetch.mockResponseOnce(JSON.stringify([{name: "Track 1", preview: "track1.mp3"}, {name: "Track 2", preview: "track2.mp3"}]), {
        status: 200,
      });

      const tracks = await getTopTracksForArtist(288166);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];


      expect(url).toEqual(`${BACKEND_URL}/music/artist/288166/top`);
      expect(options.method).toEqual("GET");
      expect(tracks[0].name).toEqual("Track 1");
      expect(tracks[0].preview).toEqual("track1.mp3");
      expect(tracks[1].name).toEqual("Track 2");
      expect(tracks[1].preview).toEqual("track2.mp3");
    });
  });

  describe("getTrack", () => {
    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getTrack(288166);
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch track");
      }
    });

    test("returns track name and preview", async () => {
      fetch.mockResponseOnce(JSON.stringify({title: "Track 1", preview: "track1.mp3"}), {
        status: 200,
      });

      const track = await getTrack(288166);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];


      expect(url).toEqual(`${BACKEND_URL}/music/track/288166`);
      expect(options.method).toEqual("GET");
      expect(track.title).toEqual("Track 1");
      expect(track.preview).toEqual("track1.mp3");
    });
  });
});
