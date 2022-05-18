let mod = ["0"];

function PressedNumber(event) {
    let num;
    const classList = [...event.target.classList];
    if (classList.indexOf("one") > -1) {
      num = "1";
    }
    if (classList.indexOf("two") > -1) {
      num = "2";
    }
    if (classList.indexOf("three") > -1) {
      num = "3";
    }
    if (classList.indexOf("four") > -1) {
      num = "4";
    }
    if (classList.indexOf("five") > -1) {
      num = "5";
    }
    if (classList.indexOf("six") > -1) {
      num = "6";
    }
    if (classList.indexOf("seven") > -1) {
      num = "7";
    }
    if (classList.indexOf("eigth") > -1) {
      num = "8";
    }
    if (classList.indexOf("nine") > -1) {
      num = "9";
    }
    if (classList.indexOf("zero") > -1) {
      num = "0";
    }

    let last = mod[mod.length - 1];

    const lastMathOperator = mathOperator(last);

     if (lastMathOperator) {
        mod.push(num);
    } else {
        if (last === "0") {
        mod[mod.length - 1] = num;
    } else {
      mod[mod.length - 1] = last + num;
    }
    
}

    display();
}

function addListeners() {
    let numbers = document.querySelectorAll(".number");
    for (let elem of numbers) {
      elem.addEventListener("click", PressedNumber);
    }
    document.getElementById("point").addEventListener("click", pressedPoint);
    document.getElementById("clear").addEventListener("click", clear);
    document.getElementById("equal").addEventListener("click", pressedEqual);
  
    let elements = document.querySelectorAll(".operator");
    for (let elem of elements) {
      elem.addEventListener("click", pressedMathOperator);
    }
  }
  addListeners();

  function clear() {
    mod = ["0"];
    display();
  }
  
  function mathOperator(str) {
    return ["+", "-", "x", "/"].indexOf(str) > -1;
  }

  function pressedPoint() {
    let last = mod[mod.length - 1];
    const lastMathOperator = mathOperator(last);
    if (last.indexOf(".") === -1 && !lastMathOperator) {
      mod[mod.length - 1] = last + ".";
    } else if (lastMathOperator) {
      mod.push("0.");
    }
    display();
  }
  
  function pressedEqual() {
    calculation();
    display();
  }

  function pressedMathOperator(event) {
    let operator;
    const classList = [...event.target.classList];
    if (classList.indexOf("divide") > -1) {
      operator = "/";
    }
    if (classList.indexOf("multiple") > -1) {
      operator = "x";
    }
    if (classList.indexOf("plus") > -1) {
      operator = "+";
    }
    if (classList.indexOf("minus") > -1) {
      operator = "-";
    }
  
    let last = mod[mod.length - 1];
    if (mathOperator(last) && last !== operator) {
      mod[mod.length - 1] = operator;
      calculation();
    } else {
      if (mod.length === 1) {
        mod.push(operator);
      }
      if (mod.length === 3) {
        mod.push(operator);
        calculation();
      }
    }
    display();
  }

  function calculation() {
    let last = mod[mod.length - 1];
    let length = mod.length;
    if (length === 2) {
      mod = [calc([(mod[0], mod[1], mod[0])])];
    }
    if (length === 3) {
      mod = [calc(mod)];
    }
    if (length === 4) {
      if (last === "+" || last === "-" || mod[1] === "x" || mod[1] === "/") {
        mod = [calc(mod), last];
      }
    }
    if (length === 5) {
      mod = [
        calc([mod[0], mod[1], calc([mod[2], mod[3], mod[4]])])
      ];
    }
  }

  function calc(arr) {
    if (arr[1] === "+") {
      return String(Number(arr[0]) + Number(arr[2]));
    }
    if (arr[1] === "x") {
      return String(Number(arr[0]) * Number(arr[2]));
    }
    if (arr[1] === "-") {
      return String(Number(arr[0]) - Number(arr[2]));
    }
    if (arr[1] === "/") {
      return String(Number(arr[0]) / Number(arr[2]));
    }
  }

  function display() {
    var last = mod[mod.length - 1];
    removeHighlight();
    switch (last) {
      case "+": {
        const preLast = mod[mod.length - 2];
        document.getElementById("result").value = preLast;
        document.getElementById("plus").classList.add("highlight_when_clicked");
        break;
      }
      case "-": {
        const preLast = mod[mod.length - 2];
        document.getElementById("result").value = preLast;
        document.getElementById("minus").classList.add("highlight_when_clicked");
        break;
      }
      case "x": {
        const preLast = mod[mod.length - 2];
        document.getElementById("result").value = preLast;
        document.getElementById("multiple").classList.add("highlight_when_clicked");
        break;
      }
      case "/": {
        const preLast = mod[mod.length - 2];
        document.getElementById("result").value = preLast;
        document.getElementById("divide").classList.add("highlight_when_clicked");
        break;
      }
      default: {
        document.getElementById("result").value = last;
      }
    }
  }

  function removeHighlight() {
    document.getElementById("multiple").classList.remove("highlight_when_clicked");
    document.getElementById("plus").classList.remove("highlight_when_clicked");
    document.getElementById("minus").classList.remove("highlight_when_clicked");
    document.getElementById("divide").classList.remove("highlight_when_clicked");
  }
  
  display();
  