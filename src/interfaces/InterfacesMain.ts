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
