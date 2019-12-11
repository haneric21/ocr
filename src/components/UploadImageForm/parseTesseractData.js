import { extractYear } from "../../Utils";

/*

{
    confidence: number,
    lines: [
        {
            confidence: number,
            text: string,
            words: [{ text: string }],
        }
    ]
}

*/

const inputFields = [
  { key: "name", value: "Name" },
  { key: "birthday", value: "Birthday" },
  { key: "email", value: "Email" },
  { key: "phoneNumber", value: "Phone" }
];

export const parseTesseractData = data => {
  const user = {
    name: "",
    birthday: "",
    email: "",
    phoneNumber: "",
    year: "",
    referral: "",
    interest: []
  };
  let inputIndex = 0;

  for (let i = 0; i < data.lines.length; i++) {
    const text = data.lines[i].text;
    if (inputIndex < inputFields.length) {
      const currentInputField = inputFields[inputIndex];
      if (text.includes(currentInputField.value)) {
        user[currentInputField.key] = extractFormData(text);
        inputIndex++;
      }
    } else {
      if (text.includes("Year")) {
        user.year = extractYear(data.lines[i + 1].text);
        i++;
      }
    }
  }
};

const extractFormData = input => input.substring(input.indexOf(":") + 1).trim();
