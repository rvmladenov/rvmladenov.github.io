export interface Book {
  url: string; //"https://anapioficeandfire.com/api/books/1",
  name: string;
  isbn: string; // "978-0553103540",
  authors: string[];
  numberOfPages: number;
  publisher: string; //"Bantam Books",
  country: string; //"United States",
  mediaType: string; //"Hardcover",
  released: string; // "1996-08-01T00:00:00",
  characters: string[];
  povCharacters: string[];
}

export interface Character {
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}

export interface House {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string;
  heir: string;
  overlord: string;
  founded: string;
  founder: string;
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: string[];
  swornMembers: string[];
}

export interface Favorite {
  id: string;
  type: 'book' | 'character' | 'house';
  entry: Book | Character | House;
}
