const terminal = document.querySelector('#terminal');
const output = document.querySelector('#output');
const input = document.querySelector('#command-input');
const prefix = document.querySelector('#prefix');
const user = "welcome";
const machine = "portfolio";
const dir = "~";
const text = prefix.textContent;
prefix.innerHTML = applyColorRules(text);

//debug | wrong | right | 
const colorArray = ["color: #b7f2ff", "color: #f76f6f", "color: #42b36b"];

//auto complete
const availableCommands = ["help", "theme", "welcome", "aboutme", "social", "echo", "clear"];
let commandsHistory = [];
let historyIndex = 1;



function verifyInput(input) {
  const fullCommand = input.value.trim();
  const commandArr = fullCommand.split(' ');
  const command = commandArr[0];

  if (availableCommands.includes(command)) {
    input.style = colorArray[2]; 
  } else {
    input.style = colorArray[1]; 
  }
}

input.addEventListener('input', function(event) {
  verifyInput(event.target);
});

input.addEventListener("keydown", function(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    const inputValue = input.value;
    const matchingCommands = availableCommands.filter(command => command.startsWith(inputValue));
    if (matchingCommands.length === 1) {
      input.value = matchingCommands[0];
      input.style = colorArray[2]
    }
  }

  else if (event.key === 'Enter') {
    event.preventDefault();
    commandsHistory.push(input.value);
    historyIndex = -1;
    processInput();
  }

  else if (event.key === "ArrowUp") {
    event.preventDefault();
    if (historyIndex === -1) {
      historyIndex = commandsHistory.length - 1;
    }
    else if (historyIndex > 0) {
      historyIndex--;
    }
    input.value = commandsHistory[historyIndex];
    verifyInput(input);
  }

  else if (event.key === "ArrowDown") {
    event.preventDefault();
    if (historyIndex >= 0 && historyIndex < commandsHistory.length) {
      historyIndex++;
      input.value = commandsHistory[historyIndex];
    }
    if(historyIndex === commandsHistory.length){
      input.value = '';
    }
    verifyInput(input);
  }
});

function processInput() {
  const fullCommand = input.value.trim();
  input.value = '';
  addOutput(`${prefix.textContent} ${fullCommand}`, null, true);

  if (fullCommand !== '') {
    commandListener(fullCommand);
  }
}

function commandListener(fullCommand) {
  const commandArr = fullCommand.split(' ');
  const command = commandArr[0];
  const inputStr = commandArr.slice(1).join(' ');

  switch(command){
    case ('help'):
      addOutput(`Available commands:\nhelp &nbsp;&nbsp; - Display this help message\nabout - Display information about this terminal`, colorArray[0]);
      break;
    case ('theme'):
      addOutput(`working on it`, colorArray[0]);
      document.documentElement.style.setProperty('--background', '#ffffff');
      break;
    case ('aboutme'):
      addOutput(`I am a programmer, 18 years old that loves to code`, colorArray[0]);
      break;
    case ('social'):
      addOutput(`Social Media...\nImagine\nImagine2`, colorArray[0]);
      break;
    case ('echo'):
      addOutput(inputStr, colorArray[0]);
      break;
    case ('clear'):
      output.innerHTML = "";
      break;
    default:
      addOutput(`Command not found: ${command}\n`, colorArray[1]);
      break;
    }
}

function applyColorRules() {
  return `
  <div id="prefix"><span id="first-color">${user}</span><span id="second-color">@</span><span id="third-color">${machine}</span>:<span id="second-color">${dir}</span>$</div>
    `;
}

function addOutput(text, style, hasPrefix = false) {
  const messageBox = document.createElement('div');
  const outputText = document.createElement('span');
  outputText.style = style;
  if(hasPrefix){
    outputText.innerHTML = applyColorRules(text.substring(0, prefix.textContent.length)) + text.substring(prefix.textContent.length);
  }
  else{
    outputText.textContent = text;
    outputText.innerHTML = text.replace(/\n/g, '<br>');
  }
  messageBox.setAttribute("id", "message")
  messageBox.appendChild(outputText);
  output.appendChild(messageBox);
  terminal.scrollTop = terminal.scrollHeight;
}