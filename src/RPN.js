const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

export function evaluateRPN(expression) {
  const stack = [];
  const postfixTokens = infixToPostfix(expression);
  for (const token of postfixTokens) {
    if (!isNaN(token)) {
      stack.push(parseFloat(token)); // Nếu là số, đẩy vào ngăn xếp
    } else if (isOperator(token)) {
      const operand2 = stack.pop();
      const operand1 = stack.pop();

      if (token === "+") {
        stack.push(operand1 + operand2);
      } else if (token === "-") {
        stack.push(operand1 - operand2);
      } else if (token === "*") {
        stack.push(operand1 * operand2);
      } else if (token === "/") {
        stack.push(operand1 / operand2);
      } else if (token === "%") {
        stack.push(operand1 % operand2);
      }
    }
  }

  return stack.pop();
}

function isOperator(token) {
  return "+-*/".includes(token);
}

function getPrecedence(operator) {
  return precedence[operator] || 0;
}

function infixToPostfix(infixTokens) {
  const operatorStack = [];
  const postfixList = [];
  const formattedExpression = formatMathExpression(infixTokens);
  for (const token of formattedExpression.split(" ")) {
    if (!isNaN(token)) {
      postfixList.push(token); // Nếu là số, thêm vào danh sách hậu tố
    } else if (isOperator(token)) {
      while (
        operatorStack.length > 0 &&
        getPrecedence(operatorStack[operatorStack.length - 1]) >=
          getPrecedence(token)
      ) {
        postfixList.push(operatorStack.pop()); // Pop các phép toán có độ ưu tiên cao hơn hoặc bằng
      }
      operatorStack.push(token); // Push phép toán hiện tại vào ngăn xếp
    } else if (token === "(") {
      operatorStack.push(token); // Nếu là dấu mở ngoặc, push vào ngăn xếp
    } else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        postfixList.push(operatorStack.pop()); // Pop các phép toán cho đến khi gặp dấu đóng ngoặc
      }
      if (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] === "("
      ) {
        operatorStack.pop(); // Pop dấu mở ngoặc
      }
    }
  }

  while (operatorStack.length > 0) {
    postfixList.push(operatorStack.pop()); // Pop tất cả phép toán còn lại trong ngăn xếp
  }

  return postfixList;
}

function formatMathExpression(inputExpression) {
  let formattedExpression = inputExpression.replace(/([()+\-*/])/g, " $1 ");
  while (formattedExpression.includes("  ")) {
    formattedExpression = formattedExpression.replace("  ", " ");
  }
  return formattedExpression.trim();
}

export function roundNumber(number) {
  // Kiểm tra xem có phải là số thập phân không

  const isDecimal = number % 1 !== 0;
  if (isDecimal) {
    number = isDecimal ? number.toFixed(4) : number;
    return removeTrailingZerosFromDecimal(number + "");
  } else return number;
}

function removeTrailingZerosFromDecimal(decimalString) {
  if (decimalString.includes(".")) {
    for (let i = decimalString.length - 1; i >= 0; i--) {
      if (decimalString[i] === "0")
        decimalString = decimalString.substring(0, decimalString.length - 1);
      else break;
    }
    if (decimalString[decimalString.length - 1] ==='.'){
      decimalString = decimalString.substring(0, decimalString.length - 1);
    }
  }
  return decimalString;
}
