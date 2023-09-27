/**
 * @group unit
 */

const gomokuHandler = require('../domain/gomoku.js');
const ERR_MSGS = require('../util/error_messages.js');
const testUtil = require('../util/test_util.js');

/**
 * Tests determined from sequence diagram.
 */
  describe.skip('given a gomokuHandler', () => {
    describe('when created', () => {
      it('then should have expected properties', () => {
        expect(gomokuHandler).toHaveProperty('play');
        expect(gomokuHandler).toHaveProperty('isWin');
        expect(gomokuHandler).toHaveProperty('isTie');
        expect(gomokuHandler).toHaveProperty('createBoard');
      });
    });
  });


/**
 * Tests determined from mockup.
 */
describe.skip('given a gomokuHandler', () => {
    describe('when creating board', () => {
      it('should have expected properties', () => {
        const board = gomokuHandler.createBoard();
        expect(board).toHaveProperty('minInRow');
        expect(board).toHaveProperty('cols');
        expect(board).toHaveProperty('rows');
        expect(board).toHaveProperty('squares');
        expect(Array.isArray(board.squares)).toBe(true);
        for( const row of board.squares){
          expect(Array.isArray(row)).toBe(true);
          for( const square of row){
            expect(square).toBe(0);
          }
        }
      });
    });
  });

  /**
   * Test if a square gets occupied with play.
   */
  describe.skip('given a board, and square', () => {
    const player = 1;
    const row = 1; 
    const col = 1;
    let board = gomokuHandler.createBoard();
    describe('when playing the square', () => {
      board = gomokuHandler.play(board, row, col, player);
      it('square should be occupied', () => {
        expect(
          board.squares[row][col]
        ).toBe(player);
      });
    });
  });
  
  /**
   * Test if playing first and last square works.
   * This test is important as it will test the boundaries
   * does first square start with 0 or 1?
   */
  describe.skip('given a board, and player', () => {
    const player = 1;
    let board = gomokuHandler.createBoard();
    describe('when playing outside board', () => {
      it('last square should not throw exception', () => {
        expect(() => {
          gomokuHandler.play(board, board.cols, board.rows, player);
        }).not.toThrow("Square don't exist!")
      });
      it('first square should not throw exception', () => {
        expect(() => {
          gomokuHandler.play(board, 1, 1, player);
        }).not.toThrow(ERR_MSGS.ERR_SQUARE_OUT_OF_BOUNDS)
      });
    })
  });

  /**
   * Test if playing outside board throws Exception
   */
  describe.skip('given a board, and player', () => {
    const player = 1;
    let board = gomokuHandler.createBoard();
    describe('when playing outside board', () => {
      describe('to left', () => {
        it('should throw exception', () => {
          expect(() => {
            gomokuHandler.play(board, 0, 1, player);
          }).toThrow(ERR_MSGS.ERR_SQUARE_OUT_OF_BOUNDS)
        });
      });

      describe('to right', () => {
        it('should throw exception', () => {
          expect(() => {
            gomokuHandler.play(board, board.cols + 1, 1, player);
          }).toThrow(ERR_MSGS.ERR_SQUARE_OUT_OF_BOUNDS)
        });
      });

      describe('above', () => {
        it('should throw exception', () => {
          expect(() => {
            gomokuHandler.play(board, board.cols + 1, 1, player);
          }).toThrow(ERR_MSGS.ERR_SQUARE_OUT_OF_BOUNDS)
        });
      });

      describe('below', () => {
        it('should throw exception', () => {
          expect(() => {
            gomokuHandler.play(board, board.cols + 1, 1, player);
          }).toThrow(ERR_MSGS.ERR_SQUARE_OUT_OF_BOUNDS)
        });
      });

    });
  });

  /**
   * Test if playing on same square throws Exception
   */
  describe.skip('given a board, and square', () => {
    const player = 1;
    const square = {col: 1, row: 1}; 
    let board = gomokuHandler.createBoard();
    describe('when playing on non empty square', () => {
      board = gomokuHandler.play(board, square.col, square.row, player);
      it('game should throw exception', () => {
        expect(() => {
          gomokuHandler.play(board, square.col, square.row, player);
        }).toThrow(ERR_MSGS.ERR_TILE_OCCUPIED)
      });
    });
  });

  /**
   * Test if a gameHandler can detect that no winner exists!
   */
  describe.skip('given an empty board', () => {
    let board = gomokuHandler.createBoard();
    describe('when checking for win condition', () => {
      it('isWin should return false', () => {
        expect(gomokuHandler.isWin(board)).toBe(false);
      });
    });
  });

  /**
   * Test if gameHandler can detect that a winner does exist
   */
  describe.skip('given a board', () => {
    const  player = 1;

    describe('when having random diagonal five in row', () => {
      let board = gomokuHandler.createBoard();
      for(let tile of testUtil.randomDiagonal(board)){
        board = gomokuHandler.play(board, tile.col, tile.row, player);
      }
      it('isWin should return true', () => {
        expect(gomokuHandler.isWin(board)).toBe(true);
      });
    });

    describe('when having random vertical five in row', () => {
      let board = gomokuHandler.createBoard();
      for(let tile of testUtil.randomVertical(board)){
        board = gomokuHandler.play(board, tile.col, tile.row, player);
      }
      it('isWin should return true', () => {
        expect(gomokuHandler.isWin(board)).toBe(true);
      });
    });

    describe('when having random horizontal five in row', () => {
      let player = 1;
      let board = gomokuHandler.createBoard();
      for(let tile of testUtil.randomHorisontal(board)){
        board = gomokuHandler.play(board, tile.col, tile.row, player);
      }
      it('isWin should return true', () => {
        expect(gomokuHandler.isWin(board)).toBe(true);
      });
    });
  });

/**
 * Test if gameHandler can detect that a winner does exist
 */
describe.skip('given a board', () => {
  const  player = 1;
  describe('when more moves, and no winner', () => {
    let board = gomokuHandler.createBoard();
    it('isTie should return true', () => {
      expect(gomokuHandler.isTie(board)).toBe(false);
    });
  });

  describe('when no more moves, and no winner', () => {
    let board = gomokuHandler.createBoard();
    board = testUtil.fillBoard(board);
    it('isTie should return true', () => {
      expect(gomokuHandler.isTie(board)).toBe(true);
    });
  });

});



