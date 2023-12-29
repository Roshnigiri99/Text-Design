let textArray = [];
let currentIndex = -1;
let isDragging = false;
let draggedElement = null;
let initialPos = { x: 0, y: 0 };

function addText() {
  const textInput = document.getElementById('textInput').value;
  if (textInput !== '') {
    textArray.push({
      text: textInput,
      styles: {
        color: document.getElementById('textColor').value,
        fontSize: document.getElementById('textSize').value + 'px',
        fontFamily: document.getElementById('fontFamily').value,
        fontWeight: 'normal', // Default font weight
        fontStyle: 'normal', // Default font style
        textDecoration: 'none', // Default text decoration
      },
      position: { x: 50, y: 50 },
    });
    currentIndex++;
    renderText();
  }
}

function applyStyles() {
  if (currentIndex >= 0) {
    const textColor = document.getElementById('textColor').value;
    const textSize = document.getElementById('textSize').value + 'px';
    const fontFamily = document.getElementById('fontFamily').value;
    
    // New font design options
    const isBold = document.getElementById('boldCheckbox').checked;
    const isItalic = document.getElementById('italicCheckbox').checked;
    const isUnderline = document.getElementById('underlineCheckbox').checked;

    textArray[currentIndex].styles.color = textColor;
    textArray[currentIndex].styles.fontSize = textSize;
    textArray[currentIndex].styles.fontFamily = fontFamily;

    // Applying new font design styles
    textArray[currentIndex].styles.fontWeight = isBold ? 'bold' : 'normal';
    textArray[currentIndex].styles.fontStyle = isItalic ? 'italic' : 'normal';
    textArray[currentIndex].styles.textDecoration = isUnderline ? 'underline' : 'none';

    renderText();
  }
}

function renderText() {
  const canvas = document.getElementById('canvas');
  canvas.innerHTML = '';
  textArray.forEach((textObj, index) => {
    const textElement = document.createElement('div');
    textElement.textContent = textObj.text;
    textElement.style.color = textObj.styles.color;
    textElement.style.fontSize = textObj.styles.fontSize;
    textElement.style.fontFamily = textObj.styles.fontFamily;
    textElement.style.fontWeight = textObj.styles.fontWeight;
    textElement.style.fontStyle = textObj.styles.fontStyle;
    textElement.style.textDecoration = textObj.styles.textDecoration;
    textElement.style.position = 'absolute';
    textElement.style.left = textObj.position.x + 'px';
    textElement.style.top = textObj.position.y + 'px';
    textElement.draggable = true;

    textElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      draggedElement = textElement;
      initialPos = { x: e.clientX - textObj.position.x, y: e.clientY - textObj.position.y };
    });

    textElement.addEventListener('mouseup', () => {
      isDragging = false;
      draggedElement = null;
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging && draggedElement === textElement) {
        textObj.position.x = e.clientX - initialPos.x;
        textObj.position.y = e.clientY - initialPos.y;
        renderText();
      }
    });

    canvas.appendChild(textElement);
  });
}
