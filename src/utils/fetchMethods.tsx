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
