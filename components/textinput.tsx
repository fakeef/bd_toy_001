import { useState } from "react";
import { franc } from "franc";

export default function Textinput() {
  const [charcnt, setCharcnt] = useState(0);
  const [inputtext, setInputtext] = useState("");
  const [lang, setLang] = useState("");
  const [cnt, setCnt] = useState(0);

  interface LangMapper {
    [key: string]: string;
  }

  const langMapper: LangMapper = {
    kor: "Korean",
    jpn: "Japanese",
    eng: "English",
    und: "",
  };

  function detectLanguage(text: string) {
    const languageCode = franc(text, {
      minLength: 3,
      only: ["kor", "jpn", "eng"],
    });
    return langMapper[languageCode];
  }

  function countEnglishWords(text: string): number {
    // Remove any non-word characters (punctuation, whitespace, etc.)
    const cleanedText = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

    // Split the cleaned text into an array of words
    const words = cleanedText.split(" ");

    // Count the number of words that are in English
    const englishWords = words.filter((word) => /^[a-zA-Z]+$/.test(word));
    return englishWords.length;
  }

  function countChar(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = e.target.value;
    const detectedLanguage = detectLanguage(newText);
    setInputtext(newText);
    setLang(detectedLanguage);
    if (lang === "English") {
      const numOfWords = countEnglishWords(inputtext);
      setCnt(numOfWords);
      console.log(`Counter: ${cnt}`);
    }
  }

  return (
    // <div className="flex items-center justify-center shadow-lg mt-56 mx-8 mb-4 max-w-lg">
    <div className="flex items-center justify-center shadow-lg mx-8 max-w-lg">
      <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2 h-full">
        <div className="flex flex-wrap -mx-3 mb-6 h-2/4">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            What would you like to translate?
          </h2>
          <div className="w-full md:w-full h-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Type Your Text"
              required
              onChange={countChar}
            ></textarea>
          </div>
          <div className="flex-row justify-between w-full md:w-full flex items-start px-3">
            {/* <div className="items-start w-1/2 text-gray-700 px-2 mr-auto"> */}
            <p className="text-xs md:text-sm pt-px">current lang: {lang}</p>
            <p className="text-xs md:text-sm pt-px">count: {cnt}</p>
            {/* </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
