const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "16px Arial";
ctx.textAlign = "center";

const sizes = {
  ctxWidth: canvas.width, //800
  ctxHeight: canvas.height, //600
  checker: 50,
  margin: 10,
  coneW: 60,
  coneH: 0.4 * canvas.height,
};

const colors = {
  light: "#f4a460",
  dark: "#9b651f",
  white: "#ffffff",
  black: "#000000",
  cone: "#aaaaaa",
};

const positions = [];
const white = {
  24: 3,
  5: 5,
  7: 3,
  12: 5,
  23: 2,
};
const black = {
  24: 4,
  0: 2,
  11: 5,
  16: 3,
  18: 5,
};
let dice = []

const generateBoardInitPositions = () => {
  //br
  for (let i = 5; i >= 0; i--)
    positions.push([
      sizes.margin + sizes.coneW * i + sizes.ctxWidth / 2 + sizes.margin * 2,
      sizes.ctxHeight - sizes.margin,
    ]);
  //bl
  for (let i = 5; i >= 0; i--)
    positions.push([sizes.margin + sizes.coneW * i, sizes.ctxHeight - sizes.margin]);
  //tl
  for (let i = 0; i < 6; i++)
    positions.push([sizes.margin + sizes.coneW * i, sizes.margin]);
  //tr
  for (let i = 0; i < 6; i++)
    positions.push([
      sizes.margin + sizes.coneW * i + sizes.ctxWidth / 2 + sizes.margin * 2,
      sizes.margin,
    ]);
};

const drawBoard = () => {
  ctx.fillStyle = colors.light;
  ctx.fillRect(0, 0, sizes.ctxWidth, sizes.ctxHeight);

  // CONES
  positions.forEach(([x, y], i) => {
    ctx.fillStyle = colors.cone;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + sizes.coneW, y);
    if (i < 12) ctx.lineTo(x + sizes.coneW / 2, y - sizes.coneH);
    else ctx.lineTo(x + sizes.coneW / 2, y + sizes.coneH);
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.fillText(i, x + 10, y);
  });

  // BORDER
  ctx.strokeStyle = colors.line;
  ctx.strokeRect(
    sizes.margin,
    sizes.margin,
    sizes.ctxWidth - sizes.margin * 2,
    sizes.ctxHeight - sizes.margin * 2
  );

  // MID
  ctx.fillStyle = colors.dark;
  ctx.fillRect(sizes.ctxWidth / 2 - sizes.coneW /2, 0, sizes.coneW, sizes.ctxHeight);
};

const drawChecker = (color,position, count) => {
  if (!count) return;
  ctx.beginPath();
  ctx.fillStyle = colors[color];
  if(position === 24) {
    if(color === "white"){
    ctx.arc(sizes.ctxWidth / 2,sizes.ctxHeight * .6,sizes.checker / 2,0,2 * Math.PI);
    }
    else {
      ctx.arc(sizes.ctxWidth / 2,sizes.ctxHeight * .4,sizes.checker / 2,0,2 * Math.PI);
    }
    ctx.fill();
    if(count > 1){
      ctx.save();
      ctx.font = "24px Arial";
      ctx.fillStyle = "red";
      if(color === "white"){
        ctx.fillText(count,sizes.ctxWidth / 2,sizes.ctxHeight * .6 + 8);
      }
      else{
        ctx.fillText(count,sizes.ctxWidth / 2,sizes.ctxHeight * .4 + 8);
      }
      ctx.restore();
    }
    return
  }
  
  const [x, y] = positions[position];
  if (position < 12) {
    for (let i = 0; i < Math.min(5, count); i++) {
      ctx.arc(
        x + sizes.checker / 2 + sizes.margin / 2,
        y - sizes.checker / 2 - sizes.checker * i,
        sizes.checker / 2,
        0,
        2 * Math.PI
      );
    }
  } else {
    for (let i = 0; i < Math.min(5, count); i++) {
      ctx.arc(
        x + sizes.checker / 2 + sizes.margin / 2,
        y + sizes.checker / 2 + sizes.checker * i,
        sizes.checker / 2,
        0,
        2 * Math.PI
      );
    }
  }
  ctx.fill();

  if (count > 5) {
    ctx.save();
    ctx.font = "24px Arial";
    ctx.fillStyle = "red";
    if (position < 12) {
      ctx.fillText(
        count,
        x + sizes.checker / 2 + sizes.margin / 2,
        y - sizes.checker / 2 - sizes.checker * 4 + 8
      );
    } else {
      ctx.fillText(
        count,
        x + sizes.checker / 2 + sizes.margin / 2,
        y - sizes.checker / 2 + sizes.checker * 5 + 8
      );
    }
    ctx.restore();
  }
};

const rollDice = () => {
  const v1 = Math.floor(Math.random() * 6) + 1
  const v2 = Math.floor(Math.random() * 6) + 1
  dice=[v1,v2]
}

const drawDiceDots = (l,t,num) => {
  ctx.beginPath()
  ctx.fillStyle="white"
 if(num === 1 || num === 3 || num === 5) {
  //m  
  ctx.arc(l + sizes.checker*.5,t+ sizes.checker*.5,sizes.checker/10,0,Math.PI*2)
  ctx.fill()
  ctx.closePath()
 }
  
  //tr,bl
  if (num !== 1){
    ctx.beginPath()
    ctx.arc(l + sizes.checker*.8,t+ sizes.checker*.2,sizes.checker/10,0,Math.PI*2)
    ctx.fill()
    ctx.arc(l + sizes.checker*.2,t+ sizes.checker*.8,sizes.checker/10,0,Math.PI*2)
  ctx.fill()
    ctx.closePath()
  }
  
  //tl,br
  if (num > 3){
  ctx.beginPath()
  ctx.arc(l + sizes.checker*.8,t+ sizes.checker*.8,sizes.checker/10,0,Math.PI*2)
  ctx.fill()
    ctx.arc(l + sizes.checker*.2,t+ sizes.checker*.2,sizes.checker/10,0,Math.PI*2)
  ctx.fill()
  ctx.closePath()
  }

  
  //r,l
  if (num === 6){
    ctx.beginPath()
    ctx.arc(l + sizes.checker*.8,t+ sizes.checker*.5,sizes.checker/10,0,Math.PI*2)
    ctx.fill()
    
    ctx.arc(l + sizes.checker*.2,t+ sizes.checker*.5,sizes.checker/10,0,Math.PI*2)
    ctx.fill()
    ctx.closePath() 
  }
}
const drawDice = () => {
  dice.forEach((d,i) => {
    ctx.fillStyle="red"
    const l = sizes.ctxWidth/4 - sizes.margin - sizes.checker/2 + ((i-.5)*sizes.checker*2)
    const t = (sizes.ctxHeight - sizes.checker) /2 
    ctx.fillRect(l,t,sizes.checker,sizes.checker)
    drawDiceDots(l,t,d)
  })
}

generateBoardInitPositions();
drawBoard();

Object.entries(white).forEach(([position, count]) => {
  drawChecker("white",Number(position), count);
});

Object.entries(black).forEach(([position, count]) => {
  drawChecker("black",Number(position), count);
});


rollDice()
drawDice()
