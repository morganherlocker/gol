var numRows = 55
var numColumns = 200
var rows = []
var iterations = 1
var coverage = .28
var interval = 40

// setup random start values
for(var i=0; i<=numRows; i++){
  var row = []
  for(var k=0; k<=numColumns; k++){
    var val = Math.random()
    if(val > coverage){
      row.push(1)
    }
    else{
      row.push(0)
    }
  }
  rows.push(row)
}

setInterval(function(){
  var newRows = []

  // process turn
  rows.forEach(function(row, i){
    newRows.push([])
    row.forEach(function(column, k){
      var neighbors = [
        getVal(rows, i-1, k-1),
        getVal(rows, i-1, k),
        getVal(rows, i-1, k+1),
        getVal(rows, i, k-1),
        getVal(rows, i, k+1),
        getVal(rows, i+1, k-1),
        getVal(rows, i+1, k),
        getVal(rows, i+1, k+1)
      ]

      var live = rows[i][k]
      var numNeighbors = neighbors.reduce(function(a,b){
        return a + b
      })

      if(live && (numNeighbors === 2 || numNeighbors === 3)){
        newRows[i].push(1)
      }
      else if(live && numNeighbors < 2){
        newRows[i].push(0)
      }
      else if(live && numNeighbors > 3){
        newRows[i].push(0)
      }
      else if(!live && numNeighbors === 3){
        newRows[i].push(1)
      }
      else{
        newRows[i].push(0)
      }


    })
  })

  // clear
  console.log('\033[2J')

  // number of iterations
  console.log(iterations + '\n')

  // render
  newRows.forEach(function(row){
    rowString = ''
    row.forEach(function(column){
      if(column){
        rowString += '0'
      }
      else{
        rowString += '\u0020'
      }
    })
    console.log(rowString)
  })
  rows = newRows
  iterations++
}, interval)

function getVal(rows, i, k){
  if(typeof rows[i] != 'undefined'){
    if(typeof rows[i][k] != 'undefined'){
      return rows[i][k]
    }
    else{
      return 0
    }
  }
  else{
    return 0
  }
}