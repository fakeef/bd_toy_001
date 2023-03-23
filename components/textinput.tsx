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

  // 입력 텍스트에 대해 언어 종류를 리턴
  function detectLanguage(text: string) {
    const languageCode = franc(text, {
      minLength: 3,
      only: ["kor", "jpn", "eng"],
    });
    return langMapper[languageCode];
  }

  // 영어 문장에 대해 "워드" 수를 카운팅
  function countEnglishWords(text: string): number {
    // Remove any non-word characters (punctuation, whitespace, etc.)
    const cleanedText = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

    // Split the cleaned text into an array of words
    const words = cleanedText.split(" ");

    // Count the number of words that are in English
    const englishWords = words.filter((word) => /^[a-zA-Z]+$/.test(word));
    return englishWords.length;
  }

  function countKoreanChars(text: string) {
    const koreanRegex = /[\u3131-\uD79D]/g;
    console.log(text.match(koreanRegex) || []);
    const koreanChars = (text.match(koreanRegex) || []).length;
    return koreanChars;
  }

  function countJapaneseChars(text: string) {
    const japaneseRegex = /[\u3040-\u30ff\u31f0-\u31ff\uff00-\uff9f]/g;
    const japaneseChars = (text.match(japaneseRegex) || []).length;
    return japaneseChars;
  }

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = e.target.value;
    const detectedLanguage = detectLanguage(newText);
    setInputtext(newText);
    setLang(detectedLanguage);
    if (detectedLanguage === "") {
      setCnt(0);
    } else if (lang === "English") {
      const numOfWords = countEnglishWords(inputtext);
      setCnt(numOfWords);
    } else if (lang === "Korean") {
      const numOfChars = countKoreanChars(inputtext);
      setCnt(numOfChars);
    } else if (lang === "Japanese") {
      const numOfChars = countJapaneseChars(inputtext);
      setCnt(numOfChars);
    }
  }

  // word or character 수 최종 출력 텍스트 생성
  function countText() {
    if (lang === "") {
      return "";
    } else if (lang === "English") {
      if (cnt === 1) {
        return "1 word";
      } else {
        return `${cnt} words`;
      }
    } else {
      if (cnt == 1) {
        return "1 character";
      } else {
        return `${cnt} characters`;
      }
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
              name="inputtext"
              placeholder="Type Your Text"
              required
              onChange={onChange}
            ></textarea>
          </div>
          <div className="flex-row justify-between w-full md:w-full flex items-start px-3">
            {/* <div className="items-start w-1/2 text-gray-700 px-2 mr-auto"> */}
            <p className="text-xs md:text-sm pt-px">current lang: {lang}</p>
            <p className="text-xs md:text-sm pt-px">{countText()}</p>
            {/* </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
