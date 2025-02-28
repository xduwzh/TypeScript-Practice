// Get calculator dispaly
const display = document.getElementById("display") as HTMLDivElement;
const buttons = document.querySelectorAll(
  "#buttons button"
) as NodeListOf<HTMLButtonElement>;

let currentInput: string = "";

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent!;

    if (value === "C") {
      // Reset everything
      currentInput = "0";
    } else if (value === "←") {
      // Remove the last character from currentInput
      currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    } else if (value === "=") {
      // Calculate the result
      currentInput = calculate(currentInput);
    } else if (["+", "-", "*", "/", "%"].includes(value)) {
      // Handle operators
      // Add operator only when it's after a num
      if (
        isLastCharDigit(currentInput) ||
        currentInput[currentInput.length - 1] === ")"
      ) {
        currentInput += value;
      }
    } else if (value === "+/-") {
      const lastNum = getLastNum(currentInput);
      if (lastNum) {
        // Find the start index of the last number
        const startIndex = currentInput.lastIndexOf(lastNum);

        // Extract the part of the string before the last number
        const beforeNum = currentInput.slice(0, startIndex);

        // Get the operator (e.g., "+" or "-") before the last number
        const operator = beforeNum.slice(-1);
        let newOperator = operator;
        let newNum = lastNum;

        // Toggle the number's sign
        if (lastNum.startsWith("(-")) {
          newNum = lastNum.slice(2, -1); // Remove "(-" and ")"
        } else if (lastNum.startsWith("-")) {
          newNum = lastNum.slice(1); // Remove "-"
        } else {
          newNum = `(-${lastNum})`; // Add "(-" and ")"
        }

        // Toggle the operator if it's "+" or "-"
        if (operator === "+" || operator === "-") {
          newOperator = operator === "+" ? "-" : "+";
          // Keep the number's absolute value (since the operator handles the sign)
          newNum = lastNum.replace(/[()]/g, "");
        }

        // Rebuild the string with the new operator and number
        const newInput = `${beforeNum.slice(0, -1)}${newOperator}${newNum}`;
        currentInput = newInput;
      }
    } else if (value === ".") {
      // Handle decimal point
      if (isLastCharDigit(currentInput)) {
        currentInput += ".";
      }
    } else {
      // Handle numbers
      if (currentInput == "0") {
        currentInput = value;
      } else if (currentInput[currentInput.length - 1] === ")") {
        return;
      } else {
        currentInput += value;
      }
    }

    // Update the display with currentInput
    display.textContent = currentInput;
  });
});

// Extract the last number
function getLastNum(currentInput: string): string | null {
  // Match the last number (supporting decimals and parentheses)
  const match = currentInput.match(
    /(\(-?\d*\.?\d+\)|\d*\.?\d+)(?!.*[\d)])(?!.*\()/
  );
  return match ? match[0] : null;
}

// Check if last char is digit
function isLastCharDigit(currentInput: string): boolean {
  const lastChar = currentInput[currentInput.length - 1];
  return !isNaN(parseInt(lastChar));
}

function calculate(expr: string): string {
  let result: number;
  try {
    result = eval(expr);
  } catch (e) {
    throw new Error("Invalid mathematical expression");
  }

  let resultStr = String(result);
  if (typeof result === "number") {
    // Trim trailing zeros in decimal part (if any) for a cleaner display
    if (resultStr.indexOf(".") !== -1) {
      // Remove trailing zeros and trailing decimal point if needed
      resultStr = resultStr.replace(/\.?0+$/, "");
    }
  }
  return resultStr;
}
