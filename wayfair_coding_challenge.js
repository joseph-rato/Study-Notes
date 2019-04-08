/*
Exercise Goal:
    - The goal of this exercise is to show us how you apply software engineering 
    principles to create a maintainable software solution.

    How to approach this:

            - Don't worry about persistence. It would make sense here, but for this
            exercise only use in-memory data structures.
            - Don't worry about tricks or "gotchyas", as there aren't any.
            - Just focus on writing clean maintainable code.



Specification:

    Create a class LeaderBoard whose interface includes the following methods:

    Method Name: add_score

        - Add a new score to the player's average. If a player doesn't exist in the 
        LeaderBoard, they will be automatically added.

        Args:

                player_id (Integer): The player's ID.
                score (Integer): The score to record for the player

        Returns:

                Double: The new average score for the given player

    Method Name: top

        - Get the top player_ids on the leaderboard ordered by their average scores
        from highest to lowest

        Args:

                num_players (Integer): The maximum number of player_ids to return

        Returns:

                List<Integer>: a list of player_ids

    Method Name: reset

        - Removes any scoring information for a player, effectively 
        resetting them to 0

        Args:

                player_id (Integer): The player's ID.

Example Usage:


    // Create a new LeaderBoard Instance
    LeaderBoard leader_board = new LeaderBoard();

    // Add scores for players to the LeaderBoard
    leader_board.add_score(1, 50); // 50.0
    leader_board.add_score(2, 80); // 80.0
    leader_board.add_score(2, 70); // 75.0
    leader_board.add_score(2, 60); // 70.0
    leader_board.add_score(3, 90); // 90.0
    leader_board.add_score(3, 85); // 87.5

    // Get top positions for the leaderboard
    leader_board.top(3); // [3, 2, 1]
    leader_board.top(2); // [3, 2]
    leader_board.top(1); // [3]

    // Reset a player 3's scores
    leader_board.reset(3); // void

    // Player 3 is now at the bottom of the leaderboard
    leader_board.top(3); // [2, 1, 3]

Expected values

    - Player IDs will always be positive integers small enough to be 
    stored as a signed 32-bit integer Scores are integers ranging from 0-100


We have provided stubbed out code and tests for you below. Please note that these tests are not exhaustive and do not cover all corner cases. We recommend extending the given tests to ensure your code is correct.

*/



// Your code goes here. Feel free to make helper classes if needed


//   function quickSort(arr){
//     if (arr.length <= 1){
//       return arr
//     }
//     let pivoit = arr.pop();
//     let left = arr.filter( num => num < pivoit)
//     let right = arr.filter( num => num >= pivoit)
//     return quickSort(right).concat([pivoit]).concat(quickSort(left))
    
//   }

function whosBig(x, y){
    if (x > y) {
      return 1
    } else if (x < y) {
      return -1
    } else if (x === y) {
      return 0
    }
}


class LeaderBoard {
  constructor(){
    this.scoreBoard = {}
    this.heapLeaderBoard = []
  }

// add number to heap find method for player_id then add to score and times and then find the average value return the average value
  add_score(player_id, score){   

    if (this.scoreBoard.hasOwnProperty(player_id)){
      this.scoreBoard[player_id].times += 1
      this.scoreBoard[player_id].score += score
      this.update(this.scoreBoard[player_id], this.heapLeaderBoard)
      // can you make an update function
    } else {
      this.scoreBoard[player_id] = {}
      this.scoreBoard[player_id].times = 1
      this.scoreBoard[player_id].score = score
      this.addToLeaderHeap(player_id, this.heapLeaderBoard)
    }
    
  return this.scoreBoard[player_id].score / this.scoreBoard[player_id].times
  };

  add_date(player_id, date){
    if (this.scoreBoard.hasOwnProperty(player_id)){
      this.scoreBoard[player_id].date = new Date(date)
    } else {
      this.scoreBoard[player_id] = {}
      this.scoreBoard[player_id].date = new Date(date)
    }
  }


  top(num_players){
    
    // we need to implement a small heap with a new store
    // we add num_players of the original numbers to the new topHeap
    // let topHeap = []
    let copyHeap = this.heapLeaderBoard.slice()
    // let allPlayers = Object.keys(this.scoreBoard)
    // for (let i = 0; i < allPlayers.length; i++){
    //   this.addToLeaderHeap(parseInt(allPlayers[i]), topHeap)
    // }
    let result = []
    for(let i = 0; i < num_players; i++){
      let semi = this.extract(copyHeap)
      result.push(semi)
    }
    return result
    
  };

  reset(player_id){
    this.scoreBoard[player_id].times = 0
    this.scoreBoard[player_id].score = 0
    this.update(this.scoreBoard[player_id], this.heapLeaderBoard)
  // let tempVal = this.heapLeaderBoard[0]
  };



  extract(store){
    
    
    let tempVal = store[0]
    store[0] = store[store.length - 1]
    store[store.length - 1] = tempVal
    let val = store.pop()
    this.heapify_down(store, 0, store.length)
    return val
  }

  update(scoreBoardObj, store){
    // check(scoreBoardObj.pos)
    let position = scoreBoardObj.pos
    
    
    
    
    
    let playerKey = parseInt(Object.keys(scoreBoardObj)[0])
    
    let parent_idx = this.parent_index(position)
    let child_val = this.avgScore(store[position])
    let parent_val = this.avgScore(store[position])
    
    if (whosBig(child_val, parent_val) > 0){
      let tempVal = store[position]
      store[position] = store[parent_idx]
      store[parent_idx] = tempVal
      this.heapify_up(store, parent_idx, len = store.length)
    } else {
      
      
      this.heapify_down(store, position,store.length)
    }
  }


  addToLeaderHeap(scoreBoardObj, store){
    store.push(scoreBoardObj)
    return this.heapify_up(store, store.length - 1, store.length)
  }

  heapify_down(arr, parent_idx, len = arr.length){

    let idxs = this.child_indices(len, parent_idx)
    if (idxs.length === 0) {
      // add the position here maybe last?
      // this.scoreBoard[arr[parent_idx]].pos = parent_idx
      return arr
    }
    
    let smallest_idx = null 
    if (idxs.length === 1) {
      smallest_idx = idxs[0]
    } else {
      
      
      if (whosBig(this.avgScore(arr[idxs[0]]), this.avgScore(arr[idxs[1]])) > 0){
        smallest_idx = idxs[0]
      } else {
        smallest_idx = idxs[1]
      }
    }
    let smallest_val = this.avgScore(arr[smallest_idx])
    
    let parent_val = this.avgScore(arr[parent_idx])

    if (whosBig(smallest_val, parent_val) > 0) {
      let tempVal = arr[parent_idx]
      // add the position here
      arr[parent_idx] = arr[smallest_idx]
      this.scoreBoard[arr[parent_idx]].pos = parent_idx
      arr[smallest_idx] = tempVal
      this.scoreBoard[arr[smallest_idx]].pos = smallest_idx
      this.heapify_down(arr, smallest_idx, len)
    }
    return arr
  }
                
  // need to add a position marker for whereever a value ends up
  // will make extraction easier
  heapify_up(arr, child_idx, len = arr.length){
    
    if (child_idx === 0) {
      this.scoreBoard[arr[child_idx]].pos = 0
      // add the position here maybe
      return arr;
    }
    let parent_idx = this.parent_index(child_idx)
    
    let child_val = this.avgScore(arr[child_idx])
    let parent_val = this.avgScore(arr[parent_idx])
    if (whosBig(child_val, parent_val) > 0){
      // add the position here
      let tempVal = arr[child_idx]
      arr[child_idx] = arr[parent_idx]
      this.scoreBoard[arr[child_idx]].pos = child_idx
      arr[parent_idx] = tempVal
      this.scoreBoard[arr[parent_idx]].pos = parent_idx
      this.heapify_up(arr, parent_idx, len = arr.length)
    }
    return arr
  }


  child_indices(len, parent_index){
    let indices = [((parent_index + 1) * 2) - 1, (parent_index + 1) * 2]
    if (indices[indices.length - 1] >= len){
      indices.pop()
    } 
    if (indices[indices.length - 1] >= len) {
      indices.pop()
    }
    return indices
  }

  parent_index(child_index){
    return Math.floor((child_index - 1)/2)
  }

  avgScore(player_id){
    
    if (this.scoreBoard[player_id].times === 0) {
      return 0;
    }
    return this.scoreBoard[player_id].score / this.scoreBoard[player_id].times;
  }

// reset the number the score and the times to zero
// have to find the number and then set the ids to zero

}

// Test code here

function array_equals(a, b) {
if (a === b) return true;
if (a == null || b == null) return false;
if (a.length != b.length) return false;
for (var i = 0; i < a.length; ++i) {
if (a[i] !== b[i]) return false;
}
return true;
}

var leader_board = new LeaderBoard()

leader_board.add_score(1, 50)
console.log(leader_board.add_score(2, 80) == 80)
console.log(leader_board.add_score(2, 70) == 75)
console.log(leader_board.add_score(2, 60) == 70)
console.log('Add score should return the average. test with 1 score')
console.log(leader_board.add_score(3, 90) == 90)
console.log('Add score should return the average. test with 2 scores')
console.log(leader_board.add_score(3, 85) == 87.5)
console.log('Top 3 [' + leader_board.top(3) + '] should equal [3, 2, 1]:')
console.log(array_equals(leader_board.top(3), [3, 2, 1]))
console.log('Top 2 [' + leader_board.top(2) + '] should equal [3, 2]:')
console.log(array_equals(leader_board.top(2), [3, 2]))
leader_board.reset(3)
console.log('After reset top 3 [' + leader_board.top(3) + '] should equal [2, 1, 3]')
console.log(array_equals(leader_board.top(3), [2, 1, 3]))


leader_board.reset(1)
leader_board.reset(2)
leader_board.reset(3)
console.log('new test')
leader_board.add_score(1, 900)
console.log(leader_board.add_score(2, 100) == 100)
console.log(leader_board.add_score(2, 70) == 85)
console.log(leader_board.add_score(2, 100) == 90)
console.log('Add score should return the average. test with 1 score')
console.log(leader_board.add_score(3, 300) == 300)
console.log('Add score should return the average. test with 2 scores')
console.log(leader_board.add_score(3, 85) == 192.5)
console.log(leader_board.add_score(4, 1000) == 1000)
console.log(leader_board.add_score(6, -5) == -5)

console.log(array_equals(leader_board.top(4), [4,1,3,2]))
console.log('Top 3 [' + leader_board.top(4) + '] should equal [4, 1, 3,2]:')