import Row from './Row'

export default function Board2048 ({ board , gameover, initializeBoard, win}) {

    let boardClassName = "board";
    let infoClassName = "info";
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";
    if(win || gameover){
        boardClassName += ' game-over-board';
        infoClassName += ' game-over-wrapper';
        infoClassName += ' end-fade-in';
    }
    return (
        <>
        <table className={boardClassName} id="board-full">
            <tbody>
                {board.map((row_vector, row_idx) => (<Row key={row_idx} row_vector={row_vector} row_idx={row_idx}/>))}
            </tbody>
        </table>
        <div className={infoClassName} id="game-over-info">
            <span id="game-over-text">{win ? phdSentence : outSentence}</span>
            <div className="button" id="game-over-button" onClick={initializeBoard}>Try again</div>
        </div>
        </>
    );
};