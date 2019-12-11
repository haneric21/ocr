const POSSIBLE_CHECKBOX_CHARS = ["O", "0", "o"];

export const extractYear = input => {
  const otherAnswer = input.substring(input.indexOf(":") + 1).trim();
  const splitInput = input.split(" ");

  let index = 0;
  while (index < splitInput.length) {
    const curWord = splitInput[index];
    const isEmptyCheckbox = POSSIBLE_CHECKBOX_CHARS.includes(curWord.charAt(0));

    if (isEmptyCheckbox) {
      index++;
      // only iterating through words with the checkbox
      const isEmptyCheckboxSeparate = POSSIBLE_CHECKBOX_CHARS.includes(curWord);
      if (isEmptyCheckboxSeparate) {
        index++;
      }
    } else {
      const isCheckboxSeparate = curWord.length === 1;
      let year = "";
      if (isCheckboxSeparate) {
        year = splitInput[index + 1];
      } else {
        year = curWord.substring(1);
      }

      return year.includes("Other") ? otherAnswer : year;
    }
  }

  return "Error";
};
