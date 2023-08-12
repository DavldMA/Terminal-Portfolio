const terminal = document.querySelector('#terminal');
const output = document.querySelector('#output');
const input = document.querySelector('#command-input');
const prefix = document.querySelector('#prefix');
const user = "welcome";
const machine = "portfolio";
const dir = "~";
const text = prefix.textContent;
prefix.innerHTML = applyColorRules(text);

//debug | wrong | right | default white
const feedbackColors = ["#b7f2ff", "#f76f6f", "#42b36b", "#e9e7e7"];

const defaultTheme = ["#000", "#e9e7e7", "#4da7a7", "#9a5fd1", "#9ab7ed"];
const whiteTheme = ["#e9e7e7", "#000", "#4da7a2", "#9a5fd2", "#9ab7e2"];
const ubuntuTheme = ["#2d0922", "#e9e7e7", "#88dc33", "#88dc33", "#88dc33"];

//auto complete
const availableCommands = ["aboutme", "clear", "echo", "help", "social", "theme", "welcome"];
let commandsHistory = [];
let historyIndex = 1;



function verifyInput(input) {
  const fullCommand = input.value.trim();
  const commandArr = fullCommand.split(' ');
  const command = commandArr[0];

  if (availableCommands.includes(command)) {
    input.style.color = feedbackColors[2]; 
  } else {
    input.style.color = feedbackColors[1]; 
  }

  if(command == '') {
    input.style.color = feedbackColors[3];
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
      input.style = feedbackColors[2]
    }
  }

  else if (event.key === 'Enter') {
    event.preventDefault();
    commandsHistory.push(input.value);
    historyIndex = -1;
    processInput();
    input.style.color = feedbackColors[3];
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
    case ('aboutme'):
      addOutput(`I am a programmer, 18 years old that loves to code`, feedbackColors[0]);
      break;
    case ('clear'):
      output.innerHTML = "";
      break;
    case ('echo'):
      if(!inputStr) {
        addOutput("Write echo your message", feedbackColors[0]);
      } else{
        addOutput(inputStr, feedbackColors[0]);
      }
      break;
    case ('help'):
      addOutput(`Available commands:\nhelp &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Display this help message`, feedbackColors[0]);
      addOutput(`aboutme &nbsp;&nbsp;&nbsp;&nbsp; - Display information about me`, feedbackColors[0]);
      addOutput(`clear &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Clear the terminal`, feedbackColors[0]);
      addOutput(`echo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Displays a message like: echo my message`, feedbackColors[0]);
      addOutput(`social &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Displays my social networks`, feedbackColors[0]);
      addOutput(`theme &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Change the terminal theme`, feedbackColors[0]);
      addOutput(`welcome &nbsp;&nbsp;&nbsp;&nbsp; - Welcome message`, feedbackColors[0]);
      break;
    case ('social'):
      addOutput(`Social Media...\nImagine\nImagine2`, feedbackColors[0]);
      break;
    case ('theme'):
      if(!inputStr) {
        addOutput("Write theme and your theme, the available themes are:\ndefault&nbsp;&nbsp;&nbsp;&nbsp;white&nbsp;&nbsp;&nbsp;&nbsp;ubuntu", feedbackColors[0]);
      } else{
        themeChanger(inputStr);
      }
      break;
    case ('welcome'):
      addOutput(`working on it`, feedbackColors[0]);
      break;
    default:
      addOutput(`Command not found: ${command}\n`, feedbackColors[1]);
      break;
    }
}

function themeChanger(inputStr) {
  var tempArray = [];
  if(inputStr == 'default') {
    tempArray.push(...defaultTheme);
  } else if(inputStr == 'white') {
    tempArray.push(...whiteTheme);
  } else if(inputStr == 'ubuntu') {
    tempArray.push(...ubuntuTheme);
  }else {return;}
  document.documentElement.style.setProperty('--background', tempArray[0]);
  document.documentElement.style.setProperty('--color', tempArray[1]);
  document.documentElement.style.setProperty('--color1', tempArray[2]);
  document.documentElement.style.setProperty('--color2', tempArray[3]);
  document.documentElement.style.setProperty('--color3', tempArray[4]);
  addOutput("Theme changed sucessfully", feedbackColors[0]);
}

function applyColorRules() {
  return `
  <div id="prefix"><span id="first-color">${user}</span><span id="second-color">@</span><span id="third-color">${machine}</span>:<span id="second-color">${dir}</span>$</div>
    `;
}

function addOutput(text, style, hasPrefix = false) {
  const messageBox = document.createElement('div');
  const outputText = document.createElement('span');
  outputText.style.color = style;
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