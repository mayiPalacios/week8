import {
  IMarvelApiDetails,
  IMarvelApiDetailsComic,
  IMarvelApiDetailsStory,
} from "../interfaces/InterfacesMain";
import {
  IMarvelApiResponse,
  IMarvelApiResponseComics,
  IMarvelApiResponseStories,
} from "../interfaces/InterfacesMain";
import { get } from "./fetchInfo";

export const getCharacterCards = async () => {
  try {
    const request = await get<IMarvelApiResponse>(
      "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0"
    );

    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getCharactersbyComics = async (idComic: string) => {
  try {
    const request = await get<IMarvelApiResponse>(
      `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0&orderBy=name&limit=50&offset=0&comics=${idComic}`
    );
    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getCharacterDetails = async (id: string) => {
  try {
    const request = await get<IMarvelApiDetails>(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0`
    );

    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getCharactersbyStories = async (idStory: string) => {
  try {
    const request = await get<IMarvelApiResponse>(
      `https://gateway.marvel.com:443/v1/public/characters?stories=${idStory}&ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0`
    );
    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getCharacterbyName = async (character: string) => {
  try {
    const request = await get<IMarvelApiResponse>(
      `https://gateway.marvel.com:443/v1/public/characters?${character}&ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0`
    );
    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getComicsCard = async () => {
  try {
    const request = await get<IMarvelApiResponseComics>(
      "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0"
    );
    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getComicDetails = async (id: string) => {
  try {
    const request = await get<IMarvelApiDetailsComic>(
      `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0`
    );
    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getComicbyFormat = async (format: string) => {
  try {
    const request = await get<IMarvelApiResponseComics>(
      `https://gateway.marvel.com:443/v1/public/comics?format=${format}&ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0`
    );
    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getComicbyTitle = async (title: string) => {
  try {
    const request = await get<IMarvelApiResponseComics>(
      `https://gateway.marvel.com:443/v1/public/comics?${title}&ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0`
    );
    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getStoriesCard = async () => {
  try {
    const request = await get<IMarvelApiResponseStories>(
      "https://gateway.marvel.com:443/v1/public/stories?ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0"
    );

    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getStoriesbyCharacter = async (character: string) => {
  try {
    const request = await get<IMarvelApiResponseStories>(
      `https://gateway.marvel.com:443/v1/public/comics?characters=${character}&ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0`
    );
    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};

export const getStoryDetails = async (id: string) => {
  try {
    const request = await get<IMarvelApiDetailsStory>(
      `https://gateway.marvel.com:443/v1/public/stories/${id}?ts=1&apikey=cbd39dee0e578971ee9c3d1d61b054b1&hash=7c649688aa1cf28e7e8fd4db0c2603a0`
    );
    return request.data.data?.results;
  } catch (error) {
    console.log(error);
  }
};
