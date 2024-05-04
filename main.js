
const white= [5,5,5,5,5,7,7,7,12,12,12,12,12,23,23]
const black= [5,5,5,5,5,7,7,7,12,12,12,12,12,23,23]

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")
const sizes = {
  ctxWidth : canvas.width, //800
  ctxHeight : canvas.height, //600
  checker : 60,
  margin : 10,
  cone: .4 * canvas.height,
}

const colors = {
  light: "#f4a460",
  dark : "#332300",
  white: "#ffffff",
  black: "#000000",
  cone: "#aaaaaa",
}

const pos = []
const generateBoardInitPositions = () => {
  
  //br
  for(let i = 5; i>=0; i--)
    pos.push([sizes.margin+sizes.checker*i + sizes.ctxWidth/2 + sizes.margin*2,sizes.ctxHeight-sizes.margin])
  //bl
  for(let i = 5; i>=0; i--)
    pos.push([sizes.margin+sizes.checker*i,sizes.ctxHeight-sizes.margin])
  //tl
  for(let i = 0; i<6; i++)
    pos.push([sizes.margin+sizes.checker*i,sizes.margin])
  //tr
  for(let i = 0; i<6; i++)
    pos.push([sizes.margin+sizes.checker*i + sizes.ctxWidth/2 + sizes.margin * 2,sizes.margin])

  
}

const draw = () => {
  ctx.fillStyle = colors.light
  ctx.fillRect(0,0,sizes.ctxWidth,sizes.ctxHeight)
 
  // CONES 
  pos.forEach(([x,y],i) => {
    ctx.fillStyle = colors.cone    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+sizes.checker, y);
    if(i < 12)
      ctx.lineTo(x+sizes.checker/2, y - sizes.cone);
    else
      ctx.lineTo(x+sizes.checker/2, y + sizes.cone);     
    ctx.fill();
    
    ctx.fillStyle = "red"
    ctx.fillText(i, x, y )
  })

  // BORDER
  ctx.strokeStyle = colors.line
  ctx.strokeRect(sizes.margin,sizes.margin,sizes.ctxWidth-sizes.margin*2,sizes.ctxHeight-sizes.margin*2)
  
  // MID
  ctx.fillStyle = colors.dark
  ctx.fillRect(sizes.ctxWidth/2 - 25,0,50,sizes.ctxHeight)
}

generateBoardInitPositions()

draw()
