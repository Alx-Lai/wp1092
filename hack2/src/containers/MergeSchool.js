// Designed by Ming-Yang, Ho (https://github.com/Kaminyou)
import React, { useState ,useEffect} from 'react';
import Header from '../components/Header';
import Board2048 from '../components/Board2048'
import '../containers/MergeSchool.css';

let secret_seed = 1;
const tokenString = "Kaminyou".split("");
for(let i = 0; i < tokenString.length; i++){
    secret_seed *= tokenString[i].charCodeAt(0);
    secret_seed = secret_seed % 0xffffffff;
}

function MergeSchool() {
    const [board, setBoard] = useState([[0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [2,2,0,0]]);
    const [qs_ranking, setQs_ranking] = useState(32768);
    const [best_qs_ranking, setBest_qs_ranking] = useState(32768);
    const [gameover, setGameover] = useState(false);
    const [step, setStep] = useState(0);
    const [win, setWin] = useState(false);
    const [seed, setSeed] = useState(secret_seed);

    // Pesudo random number generator
    // 4 bytes hashing function By Thomas Wang or Robert Jenkins
    const prng = (seed, salt, mod) => {
        let temp = seed + salt;
        temp = (temp+0x7ed55d16) + (temp<<12);
        temp = (temp^0xc761c23c) ^ (temp>>19);
        temp = (temp+0x165667b1) + (temp<<5);
        temp = (temp+0xd3a2646c) ^ (temp<<9);
        temp = (temp+0xfd7046c5) + (temp<<3);
        temp = (temp^0xb55a4f09) ^ (temp>>16);
        if( temp < 0 ) temp = 0xffffffff + temp;
        return (temp % mod);
    }   

    // Rotate the matrix clockwisely
    const rotateClockwise = (matrix) => {
        let result = [];
        for(let i = 0; i < matrix[0].length; i++) {
            let row = matrix.map(e => e[i]).reverse();
            result.push(row);
        }
        return result;
    }
    
    // Rotate the matrix counterclockwisely
    const rotateCounterClockwise = (matrix) => {
        return rotateClockwise(rotateClockwise(rotateClockwise(matrix)));
    }

    // Create board and add two "2" and reset everything required
    const initializeBoard = () => {
        let newboard = [[0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0]];
        let boardset = putGridRandom(newboard, true);
        boardset = putGridRandom(boardset.board, true);
        setBoard(newboard);
        setQs_ranking(32768);
        setStep(0);
        // #########################
        // # 7 Add something yourself
        // boardset.board will be the initial board, please use it directly
        // #########################
    }

    
    
    // Get all empty x y coordinates in board
    const getEmptyGrid = (board) => {
        let empty_grid = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j<4; j++) {
                if (board[i][j] === 0) {
                    empty_grid.push([i, j])
                }
            }
        }
        return empty_grid;
    }
    
    // Put one "2" in random empty grid
    const putGridRandom = (board, init) => {
        let empty_grid = getEmptyGrid(board);
        let random_num = prng(seed, step, empty_grid.length);
        if (init){
            random_num = prng(seed, 0, empty_grid.length);
        } 
        let random_empty_grid = empty_grid[random_num];
        board[random_empty_grid[0]][random_empty_grid[1]] = 2;
        return {board};
    }
    
    // Check if one move is effecitve
    const justifyMove = (prev, next) => {
        let prev_string = JSON.stringify(prev)
        let new_string = JSON.stringify(next)
        return (prev_string !== new_string) ? true : false;
    }
    
    // Moveright function
    const moveRight = (prevBoard) => {
        let board = [];
        let combination = 0;
    
        for (let r = 0; r < prevBoard.length; r++) {
            let row = [];      
            for (let c = 0; c < prevBoard[r].length; c++) {
                let current = prevBoard[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }
    
        for (let r = 0; r < board.length; r++) {
            // special case
            if ((board[r][0] === board[r][1]) && (board[r][0] !== 0) && (board[r][2] === board[r][3]) && (board[r][2] !== 0)) {
                board[r][3] = board[r][3] * 2;
                board[r][2] = board[r][1] * 2;
                board[r][1] = 0;
                board[r][0] = 0;
                combination += 2;
                continue;
            }

            for (let c = board[r].length - 1; c > 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    combination += 1;
                } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }
        }
    
        return {board, combination};
    }
    
    // Moveup function
    const moveUp = (prevBoard) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        let board = prevBoard;
        board = rotateClockwise(board);
        let combination =  0;
        let new_board = moveRight(board);
        combination = new_board.combination;
        board = new_board.board;
        board = rotateCounterClockwise(board);
        //{board,combination} = moveRight(board);
        return {board, combination};
    }

    // Movedown function
    const moveDown = (prevBoard) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        let board = prevBoard;
        board = rotateCounterClockwise(board);
        let combination =  0;
        let new_board = moveRight(board);
        combination = new_board.combination;
        board = new_board.board;
        board = rotateClockwise(board);
        //{board,combination} = moveRight(board);
        return {board, combination};
    
    }
    
    // Moveleft function
    const moveLeft = (prevBoard) => {
        // #########################
        // # 8 Implement yourself
        // #########################

        let board = prevBoard;
        board = rotateClockwise(board);
        board = rotateClockwise(board);
        let combination =  0;
        let new_board = moveRight(board);
        combination = new_board.combination;
        board = new_board.board;
        board = rotateClockwise(board);
        board = rotateClockwise(board);
        //{board,combination} = moveRight(board);
        return {board, combination};
    }
    
    // Move
    const moveGrid = (direction) => {
        if (!gameover) {
            if (direction === 'right') {
                const nextBoard = moveRight(board);
                checkAndUpdateAfterMove(nextBoard);
            }else if(direction === 'left'){
                const nextBoard = moveLeft(board);
                checkAndUpdateAfterMove(nextBoard);
            }else if(direction === 'up'){
                const nextBoard = moveUp(board);
                checkAndUpdateAfterMove(nextBoard);
            }else if(direction === 'down'){
                const nextBoard = moveDown(board);
                checkAndUpdateAfterMove(nextBoard);
            }
            // #########################
            // # 8 Implement yourself
            // #########################
        } 
    }

    // Check everything after one move including gameover and win
    // Also, the step, ranking, best ranking should be updated here
    const checkAndUpdateAfterMove = (nextBoard) => {
        if (justifyMove(board, nextBoard.board)) {
            const nextBoardSetWithRandom = putGridRandom(nextBoard.board, false);
            let qsRankNow = qs_ranking;
            let stepNow = step;
            // #########################
            // # 4 Implement yourself
            var flag = true;
            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++){
                    if(board[i][j] != nextBoard.board[i][j]){
                        flag=false;
                    }
                }
            }
            if(!flag){
                stepNow+=1;
            }
            // #########################

            // #########################
            // # 5 Implement yourself
            /*var merge_count = 1;
            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++){
                    if(board[i][j]!=0){
                        merge_count++;
                    }
                    if(nextBoard.board[i][j]!=0){
                        merge_count--;
                    }
                }
            }*/
            qsRankNow-=nextBoard.combination;
            if(qsRankNow < best_qs_ranking){
                setBest_qs_ranking(qsRankNow);
            }
            // #########################
            setBoard(nextBoardSetWithRandom.board);
            setQs_ranking(qsRankNow);
            setStep(stepNow);
            
            // #########################
            // # 7 Implement yourself
            // #########################

            if (checkGameover(nextBoardSetWithRandom.board)) {
                setGameover(true);
            }
        }
    }
    
    // Check if it is gameover
    const checkGameover = (board) => {
        // #########################
        // # 9 Implement yourself
        if(!justifyMove(board,moveDown(board).board) &&!justifyMove(board,moveLeft(board).board) &&
          !justifyMove(board,moveUp(board).board) &&!justifyMove(board,moveRight(board).board)){
            return true;
        }
        // #########################
        
        return false;
    }

    // Check if it is win
    const checkWin = (board) => {
        // #########################
        // # 10 Implement yourself
        // #########################
        return false;
    }
    
    const handleKeyDown = (event) => {
        event.preventDefault();
        if(event.keyCode === 37){
            moveGrid('left');
        }else if (event.keyCode === 38) {
            moveGrid("up");
        }else if (event.keyCode === 39) {
            moveGrid("right");
        }else if (event.keyCode === 40) {
            moveGrid("down");
        }
        // #########################
        // # 8 Implement yourself
        // #########################

    }
    
    // #########################
    // # 4 Implement yourself
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });
    // You might need something to capture keyboard input
    // #########################
    
    
    // Useful function for you to check the endgame
    const setBadEnd = () => {
        let nextBoard = [[2,4,2,4],
                        [4,2,4,2],
                        [2,4,2,128],
                        [4,128,2,2]];
        setBoard(nextBoard);
    }
    
    // Useful function for you to check the best result
    const setGoodEnd = () => {
        let nextBoard = [[2,2,4,8],
                        [128,64,32,16],
                        [256,512,1024,2048],
                        [32768,16384,8192,4096]];
        setBoard(nextBoard);
    }


    return (
        <>      
            <Header step={step} qs_ranking={qs_ranking} initializeBoard={initializeBoard} 
            best_qs_ranking={best_qs_ranking}/>
            <Board2048 className="wrapper" board={board} />
            <div className="btn-groups">
                <div className="btn-useful" id="badend-btn" onClick={setBadEnd}>BadEnd</div>
                <div className="btn-useful" id="goodend-btn" onClick={setGoodEnd}>GoodEnd</div>
            </div>
        </>
    );
}

export default MergeSchool;