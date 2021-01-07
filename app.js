"use strict";

const Database = require('better-sqlite3')
const axios = require("axios");

const getWords = () => {
  const words = [];

  const SQL_LOOKUPS = `
    select WORDS.stem, WORDS.word, LOOKUPS.usage, LOOKUPS.timestamp
    from LOOKUPS left join WORDS
    on WORDS.id = LOOKUPS.word_key
    left join BOOK_INFO
    on BOOK_INFO.id = LOOKUPS.book_key
    where BOOK_INFO.title = (?)`;

  const db = new Database("./vocab.db")
  const rows = db.prepare('SELECT * from BOOK_INFO').all()
  rows.forEach((row, i) => {
    // console.log(`[${i + 1}]`, row.title)

    const lookups = db.prepare(SQL_LOOKUPS).all(row.title);
    // console.log(lookups);
    lookups.forEach((wordObj) => words.push({
      word: wordObj.word,
      usage: wordObj.usage
    }));
  });
  return words;
};

const getDefinitions = async () => {
  const words = await getWords();

  var options = {
    method: 'GET',
    url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
    headers: {
      'x-rapidapi-key': '6462f57ff1msh411b7dd96139ab3p137b3fjsna42eca8d77ff',
      'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
    }
  };

  for (const {word, usage} of words.slice(0,5)) {
    options.params = {term: word};

    const response = await axios.request(options);
    const list = response.data.list;
    list.sort((def1, def2) => {
      (def2.thumbs_up-def2.thumbs_down) - (def1.thumbs_up-def1.thumbs_down)
    });
    const def = list[0].definition.split("\n")[0].replace(/\[/g, "").replace(/\]/g, "");
    console.log(`word: ${word}\ndef: ${def}\nusage: ${usage}`);
    console.log("===========================================================");
  }
};

getDefinitions();
