
const white= [5,5,5,5,5,7,7,7,12,12,12,12,12,23,23]
const black= [5,5,5,5,5,7,7,7,12,12,12,12,12,23,23]

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")
const w = canvas.width //800
const h = canvas.height //600
const size = 60
const border = 10

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
    pos.push([border+size*i + w/2 + border*2,h-border])
  //bl
  for(let i = 5; i>=0; i--)
    pos.push([border+size*i,h-border])
  //tl
  for(let i = 0; i<6; i++)
    pos.push([border+size*i,border])
  //tr
  for(let i = 0; i<6; i++)
    pos.push([border+size*i + w/2 + border*2,border])
  
}

const draw = () => {
  ctx.fillStyle = colors.light
  ctx.fillRect(0,0,w,h)
 
  // CONES 
  pos.forEach(([x,y],i) => {
    ctx.fillStyle = colors.cone    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+size, y);
    if(i < 12)
      ctx.lineTo(x+size/2, y - 250);
    else
      ctx.lineTo(x+size/2, y + 250);     
    ctx.fill();
    
    ctx.fillStyle = "red"
    ctx.fillText(i, x, y )
  })

  // BORDER
  ctx.strokeStyle = colors.line
  ctx.strokeRect(border,border,w-border*2,h-border*2)
  
  // MID
  ctx.fillStyle = colors.dark
  ctx.fillRect(w/2 - 25,0,50,h)
}

generateBoardInitPositions()

draw()
