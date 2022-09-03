const getInputNumbersValue = (input) => {
  // Return stripped input value — just numbers
  return input.value.replace(/\D/g, "");
};

export const onPhonePaste = (e) => {
  let input = e.target,
    inputNumbersValue = getInputNumbersValue(input);
  let pasted = e.clipboardData || window.clipboardData;
  if (pasted) {
    let pastedText = pasted.getData("Text");
    if (/\D/g.test(pastedText)) {
      // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
      // formatting will be in onPhoneInput handler
      input.value = inputNumbersValue;
      return;
    }
  }
};

export const onPhoneInput = (e, setPhone) => {
  let input = e.target,
    inputNumbersValue = getInputNumbersValue(input),
    selectionStart = input.selectionStart,
    formattedInputValue = "";

  if (!inputNumbersValue) {
    return setPhone("");
  }

  if (input.value.length != selectionStart) {
    // Editing in the middle of input, not last symbol
    if (e.data && /\D/g.test(e.data)) {
      // Attempt to input non-numeric symbol
      setPhone(inputNumbersValue);
    }
    return;
  }

  if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
    if (inputNumbersValue[0] == "9")
      inputNumbersValue = "7" + inputNumbersValue;
    let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
    formattedInputValue = input.value = firstSymbols + " ";
    if (inputNumbersValue.length > 1) {
      formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
    }
  } else {
    formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
  }
  setPhone(formattedInputValue);
};
export const onPhoneKeyDown = (e) => {
  // Clear input after remove last symbol
  let inputValue = e.target.value.replace(/\D/g, "");
  if (e.keyCode == 8 && inputValue.length == 1) {
    e.target.value = "";
  }
};
