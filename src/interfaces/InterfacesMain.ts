export interface IMarvelApiResponse {
  code: number;
  status: string;
  data: {
    results: IMarvelCharacter[];
  } | null;
}

export interface IMarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface Comic {
  resourceURI: string;
  name: string;
}

interface Story {
  resourceURI: string;
  name: string;
}

interface Character {
  resourceURI: string;
  name: string;
}

export interface IMarvelApiDetails {
  code: number;
  status: string;
  data: {
    results: ICharacterDetails;
  } | null;
}

export interface IMarvelApiDetailsComic {
  code: number;
  status: string;
  data: {
    results: IComicDetails;
  } | null;
}

export interface IMarvelApiDetailsStory {
  code: number;
  status: string;
  data: {
    results: IStoryDetails;
  } | null;
}

export interface IMarvelApiResponseComics {
  code: number;
  status: string;
  data: {
    results: IMarvelComics[];
  } | null;
}

export interface IMarvelComics {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface ICharacterDetails extends IMarvelCharacter {
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: Comic[];
  };
  stories: {
    available: number;
    collectionURI: string;
    items: Story[];
  };
}

export interface IComicDetails extends IMarvelComics {
  resourceURI: string;

  characters: {
    items: Character[];
  };
  stories: {
    available: number;
    collectionURI: string;
    items: Story[];
  };
}

export interface Ibookmark extends IMarvelCharacter, IMarvelComics {
  bookmarkedCards: boolean;
}

export interface IMarvelApiResponseStories {
  code: number;
  status: string;
  data: {
    results: IMarvelStories[];
  } | null;
}

export interface IMarvelStories {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface IStoryDetails extends IMarvelStories {
  resourceURI: string;

  characters: {
    items: Character[];
  };
  comics: {
    available: number;
    collectionURI: string;
    items: Comic[];
  };
}
