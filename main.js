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
  dark: "#332300",
  white: "#ffffff",
  black: "#000000",
  cone: "#aaaaaa",
};

const pos = [];
const generateBoardInitPositions = () => {
  //br
  for (let i = 5; i >= 0; i--)
    pos.push([
      sizes.margin + sizes.coneW * i + sizes.ctxWidth / 2 + sizes.margin * 2,
      sizes.ctxHeight - sizes.margin,
    ]);
  //bl
  for (let i = 5; i >= 0; i--)
    pos.push([sizes.margin + sizes.coneW * i, sizes.ctxHeight - sizes.margin]);
  //tl
  for (let i = 0; i < 6; i++)
    pos.push([sizes.margin + sizes.coneW * i, sizes.margin]);
  //tr
  for (let i = 0; i < 6; i++)
    pos.push([
      sizes.margin + sizes.coneW * i + sizes.ctxWidth / 2 + sizes.margin * 2,
      sizes.margin,
    ]);
};

const drawBoard = () => {
  ctx.fillStyle = colors.light;
  ctx.fillRect(0, 0, sizes.ctxWidth, sizes.ctxHeight);

  // CONES
  pos.forEach(([x, y], i) => {
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

const drawChecker = (color, position, count) => {
  if (!count) return;
  ctx.beginPath();
  ctx.fillStyle = colors[color];
  if(position === 24) {
    console.log('!!')
    ctx.arc(
        sizes.ctxWidth / 2,
        sizes.ctxHeight * .6,
        sizes.checker / 2,
        0,
        2 * Math.PI
      );
    ctx.fill();
    if(count > 1){
      ctx.save();
      ctx.font = "24px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(
        count,
        sizes.ctxWidth / 2,
        sizes.ctxHeight * .6 + 8,
      );
      ctx.restore();
    }
    return
  }
  
  const [x, y] = pos[position];
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

generateBoardInitPositions();

drawBoard();

const white = {
  24: 2,
  5: 5,
  7: 3,
  12: 5,
  23: 2,
};

Object.entries(white).forEach(([position, count]) => {
  drawChecker("white", Number(position), count);
});
