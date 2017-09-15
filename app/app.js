$(function ()
{
    'use strict';

    var board = $('#board');
    var whiteScore = 0;
    var blackScore = 0;
    var whiteScoreElement = $('#white-score');
    var blackScoreElement = $('#black-score');
    var pawnSelected = false;
    var whoseTurn = 'white';
    var pawn;
    var haveToAttack = false;
    var queenFont = '<i class="fa fa-life-ring" aria-hidden="true"></i>';
    var blackPawn = '<div class="black-pawn pawn"><div></div></div>';
    var whitePawn = '<div class="white-pawn pawn"><div></div></div>';

    function possibilityOfAttack(pawn)
    {
        if (pawn.hasClass('white-pawn'))
        {
            if (pawn.hasClass('queen'))
            {
                // left-up
                var x = pawn.parent().parent().index();
                var y = pawn.parent().index();
                var min = Math.min(x, y);

                for (var i = 0; i < min; ++i)
                {
                    --x; --y;
                    if (board.children().eq(x).children().eq(y).find('.white-pawn').length)
                    {
                        break;
                    }
                    if (board.children().eq(x).children().eq(y).find('.black-pawn').length && x - 1 >= 0 && y - 1 >= 0)
                    {
                        if (board.children().eq(x - 1).children().eq(y - 1).children().length)
                        {
                            break;
                        }
                        return true;
                    }
                }
                // right-up
                x = pawn.parent().parent().index();
                y = pawn.parent().index();
                min = Math.min(x, pawn.parent().parent().children().length - y - 1);

                for (i = 0; i < min; ++i){
                    --x; ++y;
                    if (board.children().eq(x).children().eq(y).find('.white-pawn').length)
                    {
                        break;
                    }
                    if (board.children().eq(x).children().eq(y).find('.black-pawn').length && x - 1 >= 0 && y + 1 < pawn.parent().parent().children().length)
                    {
                        if (board.children().eq(x - 1).children().eq(y + 1).children().length)
                        {
                            break;
                        }
                        return true;
                    }
                }
                // right-down
                x = pawn.parent().parent().index();
                y = pawn.parent().index();
                min = Math.min(board.children().length - x - 1, pawn.parent().parent().children().length - y - 1);

                for (i = 0; i < min; ++i){
                    ++x; ++y;
                    if (board.children().eq(x).children().eq(y).find('.white-pawn').length)
                    {
                        break;
                    }
                    if (board.children().eq(x).children().eq(y).find('.black-pawn').length && x + 1 < board.children().length &&
                            y + 1 < pawn.parent().parent().children().length)
                    {
                        if (board.children().eq(x + 1).children().eq(y + 1).children().length)
                        {
                            break;
                        }
                        return true;
                    }
                }
                // left-down
                x = pawn.parent().parent().index();
                y = pawn.parent().index();
                min = Math.min(board.children().length - x - 1, y);

                for (i = 0; i < min; ++i){
                    ++x; --y;
                    if (board.children().eq(x).children().eq(y).find('.white-pawn').length)
                    {
                        break;
                    }
                    if (board.children().eq(x).children().eq(y).find('.black-pawn').length && x + 1 < board.children().length &&
                            y - 1 >= 0)
                    {
                        if (board.children().eq(x + 1).children().eq(y - 1).children().length)
                        {
                            break;
                        }
                        return true;
                    }
                }
            }
            else
            {
                if ((board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() - 1).has('.black-pawn').length &&
                        !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                        !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                        pawn.parent().index() - 2 >= 0 &&
                        pawn.parent().parent().index() - 2 >= 0) ||

                        (board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() + 1).has('.black-pawn').length &&
                        !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                        !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                        pawn.parent().index() + 2 < pawn.parent().parent().children().length &&
                        pawn.parent().parent().index() - 2 >= 0) ||

                        (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() - 1).has('.black-pawn').length &&
                        !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                        !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                        pawn.parent().index() - 2 >= 0 &&
                        pawn.parent().parent().index() + 2 < board.children().length) ||

                        (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() + 1).has('.black-pawn').length &&
                        !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                        !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                        pawn.parent().index() + 2 < pawn.parent().parent().children().length &&
                        pawn.parent().parent().index() + 2 < board.children().length)) {
                    return true;
                }
            }
        }
        else if (pawn.hasClass('black-pawn'))
        {
            if (pawn.hasClass('queen'))
            {
                // left-up
                x = pawn.parent().parent().index();
                y = pawn.parent().index();
                min = Math.min(x, y);

                for (var i = 0; i < min; ++i)
                {
                    --x; --y;
                    if (board.children().eq(x).children().eq(y).find('.black-pawn').length)
                    {
                        break;
                    }
                    if (board.children().eq(x).children().eq(y).find('.white-pawn').length && x - 1 >= 0 && y - 1 >= 0)
                    {
                        if (board.children().eq(x - 1).children().eq(y - 1).children().length)
                        {
                            break;
                        }
                        return true;
                    }
                }
                // right-up
                x = pawn.parent().parent().index();
                y = pawn.parent().index();
                min = Math.min(x, pawn.parent().parent().children().length - y - 1);

                for (i = 0; i < min; ++i){
                    --x; ++y;
                    if (board.children().eq(x).children().eq(y).find('.black-pawn').length)
                    {
                        break;
                    }
                    if (board.children().eq(x).children().eq(y).find('.white-pawn').length && x - 1 >= 0 && y + 1 < pawn.parent().parent().children().length)
                    {
                        if (board.children().eq(x - 1).children().eq(y + 1).children().length)
                        {
                            break;
                        }
                        return true;
                    }
                }
                // right-down
                x = pawn.parent().parent().index();
                y = pawn.parent().index();
                min = Math.min(board.children().length - x - 1, pawn.parent().parent().children().length - y - 1);

                for (i = 0; i < min; ++i){
                    ++x; ++y;
                    if (board.children().eq(x).children().eq(y).find('.black-pawn').length)
                    {
                        break;
                    }
                    if (board.children().eq(x).children().eq(y).find('.white-pawn').length && x + 1 < board.children().length &&
                            y + 1 < pawn.parent().parent().children().length)
                    {
                        if (board.children().eq(x + 1).children().eq(y + 1).children().length)
                        {
                            break;
                        }
                        return true;
                    }
                }
                // left-down
                x = pawn.parent().parent().index();
                y = pawn.parent().index();
                min = Math.min(board.children().length - x - 1, y);

                for (i = 0; i < min; ++i){
                    ++x; --y;
                    if (board.children().eq(x).children().eq(y).find('.black-pawn').length)
                    {
                        break;
                    }
                    if (board.children().eq(x).children().eq(y).find('.white-pawn').length && x + 1 < board.children().length &&
                            y - 1 < pawn.parent().parent().children().length)
                    {
                        if (board.children().eq(x + 1).children().eq(y - 1).children().length)
                        {
                            break;
                        }
                        return true;
                    }
                }
            }
            else
            {
                if ((board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() - 1).has('.white-pawn').length &&
                !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                pawn.parent().index() -
                2 >=
                0 &&
                pawn.parent().parent().index() -
                2 >=
                0) ||

                (board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() + 1).has('.white-pawn').length &&
                !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                pawn.parent().index() +
                2 <
                pawn.parent().parent().children().length &&
                pawn.parent().parent().index() -
                2 >=
                0) ||

                (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() - 1).has('.white-pawn').length &&
                !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                pawn.parent().index() -
                2 >=
                0 &&
                pawn.parent().parent().index() +
                2 <
                board.children().length) ||

                (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() + 1).has('.white-pawn').length &&
                !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                pawn.parent().index() +
                2 <
                pawn.parent().parent().children().length &&
                pawn.parent().parent().index() +
                2 <
                board.children().length)){
                    return true;
                }
            }
        }
        return false;
    }

    function findEnemy(target)
    {
        if (Math.floor((pawn.parent().parent().index() + target.parent().index()) / 2) !== (pawn.parent().parent().index() + target.parent().index()) / 2 ||
                Math.floor((pawn.parent().index() + target.index()) / 2) !== (pawn.parent().index() + target.index()) / 2)
        {
            return false;
        }

        if (pawn.hasClass('white-pawn')) {
            if (board.find('.row')
                            .eq((pawn.parent().parent().index() + target.parent().index()) / 2)
                            .find('.square')
                            .eq((pawn.parent().index() + target.index()) / 2)
                            .has('.black-pawn').length)
            {
                board.find('.row')
                        .eq((pawn.parent().parent().index() + target.parent().index()) / 2)
                        .find('.square')
                        .eq((pawn.parent().index() + target.index()) / 2)
                        .find('.black-pawn').remove();

                ++whiteScore;
                whiteScoreElement.html('White: ' + whiteScore);

                if (whiteScore === 12){
                    setTimeout(resetGame('white'), 500);
                    return;
                }

                return true;
            }
        }
        else if (pawn.hasClass('black-pawn')){
            if (board.find('.row')
                            .eq((pawn.parent().parent().index() + target.parent().index()) / 2)
                            .find('.square')
                            .eq((pawn.parent().index() + target.index()) / 2)
                            .has('.white-pawn').length)
            {
                board.find('.row')
                        .eq((pawn.parent().parent().index() + target.parent().index()) / 2)
                        .find('.square')
                        .eq((pawn.parent().index() + target.index()) / 2)
                        .find('.white-pawn').remove();

                ++blackScore;
                blackScoreElement.html('Black: ' + blackScore);

                if (blackScore === 12){
                    setTimeout(resetGame('black'), 500);
                    return;
                }

                return true;
            }
        }

        return false;
    }

    function queenMaker(pawn)
    {
        if (pawn.hasClass('white-pawn')) {
            if (pawn.parent().parent().index() === 0 )
            {
                pawn.find('div').append(queenFont);
                pawn.addClass('queen');
                return true;
            }
            return false;
        }
        else if (pawn.hasClass('black-pawn')) {
            if (pawn.parent().parent().index() === board.children().length - 1)
            {
                pawn.find('div').append(queenFont);
                pawn.addClass('queen');
                return true;
            }
        }
        return false;
    }

    function checkQueensMove(target)
    {
        var x = pawn.parent().parent().index(); // row
        var y = pawn.parent().index(); // square
        // left-up
        while (x >= 0 && y >= 0){
            --x; --y;
            if (board.children().eq(x).children().eq(y).children().length)
            {
                break;
            }
            if (target.parent().index() == x && target.index() == y){
                return true;
            }
        }
        x = pawn.parent().parent().index(); // row
        y = pawn.parent().index(); // square
        // right-up
        while (x >= 0 && y < target.parent().children().length){
            --x; ++y;
            if (board.children().eq(x).children().eq(y).children().length)
            {
                break;
            }
            if (target.parent().index() == x && target.index() == y){
                return true;
            }
        }
        x = pawn.parent().parent().index(); // row
        y = pawn.parent().index(); // square
        // right-down
        while (x < board.children().length && y < target.parent().children().length){
            ++x; ++y;
            if (board.children().eq(x).children().eq(y).children().length)
            {
                break;
            }
            if (target.parent().index() == x && target.index() == y){
                return true;
            }
        }
        x = pawn.parent().parent().index(); // row
        y = pawn.parent().index(); // square
        // left-down
        while (x < board.children().length && y >= 0){
            ++x; --y;
            if (board.children().eq(x).children().eq(y).children().length)
            {
                break;
            }
            if (target.parent().index() == x && target.index() == y){
                return true;
            }
        }

        return false;
    }

    function correctQueenAttack(target)
    {
        if (pawn.hasClass('white-pawn')) {
            var x = pawn.parent().parent().index();
            var y = pawn.parent().index();
            var enemy = {};
            --x;
            --y;
            while (x >= 0 && y >= 0) {
                if (board.children().eq(x).children().eq(y).find('.white-pawn').length) break;
                if (board.children().eq(x).children().eq(y).find('.black-pawn').length){
                    enemy.x = x;
                    enemy.y = y;
                    --x;
                    --y;
                    while (x >= 0 && y >= 0){
                        if (board.children().eq(x).children().eq(y).find('.pawn').length)   break;
                        else if (target.parent().index() === x && target.index() === y)     return enemy;
                        --x;
                        --y;
                    }
                    break;
                }
                --x;
                --y;
            }

            x = pawn.parent().parent().index();
            y = pawn.parent().index();
            --x;
            ++y;
            while (x >= 0 && y < target.parent().children().length) {
                if (board.children().eq(x).children().eq(y).find('.white-pawn').length) break;
                if (board.children().eq(x).children().eq(y).find('.black-pawn').length){
                    enemy.x = x;
                    enemy.y = y;
                    --x;
                    ++y;
                    while (x >= 0 && y < target.parent().children().length){
                        if (board.children().eq(x).children().eq(y).find('.pawn').length)   break;
                        else if (target.parent().index() === x && target.index() === y)     return enemy;
                        --x;
                        ++y;
                    }
                    break;
                }
                --x;
                ++y;
            }

            x = pawn.parent().parent().index();
            y = pawn.parent().index();
            ++x;
            ++y;
            while (x < board.children().length && y < target.parent().children().length) {
                if (board.children().eq(x).children().eq(y).find('.white-pawn').length) break;
                if (board.children().eq(x).children().eq(y).find('.black-pawn').length){
                    enemy.x = x;
                    enemy.y = y;
                    ++x;
                    ++y;
                    while (x < board.children().length && y < target.parent().children().length){
                        if (board.children().eq(x).children().eq(y).find('.pawn').length)   break;
                        else if (target.parent().index() === x && target.index() === y)     return enemy;
                        ++x;
                        ++y;
                    }
                    break;
                }++x;
                ++y;
            }

            x = pawn.parent().parent().index();
            y = pawn.parent().index();
            ++x;
            --y;
            while (x < board.children().length && y >= 0) {
                if (board.children().eq(x).children().eq(y).find('.white-pawn').length) break;
                if (board.children().eq(x).children().eq(y).find('.black-pawn').length){
                    enemy.x = x;
                    enemy.y = y;
                    ++x;
                    --y;
                    while (x < board.children().length && y >= 0){
                        if (board.children().eq(x).children().eq(y).find('.pawn').length)   break;
                        else if (target.parent().index() === x && target.index() === y)     return enemy;
                        ++x;
                        --y;
                    }
                    break;
                }
                ++x;
                --y;
            }
        }else if (pawn.hasClass('black-pawn')){
            x = pawn.parent().parent().index();
            y = pawn.parent().index();
            enemy = {};
            --x;
            --y;
            while (x >= 0 && y >= 0) {
                if (board.children().eq(x).children().eq(y).find('.black-pawn').length) break;
                if (board.children().eq(x).children().eq(y).find('.white-pawn').length){
                    enemy.x = x;
                    enemy.y = y;
                    --x;
                    --y;
                    while (x >= 0 && y >= 0){
                        if (board.children().eq(x).children().eq(y).find('.pawn').length)   break;
                        else if (target.parent().index() === x && target.index() === y)     return enemy;
                        --x;
                        --y;
                    }
                    break;
                }
                --x;
                --y;
            }

            x = pawn.parent().parent().index();
            y = pawn.parent().index();
            --x;
            ++y;
            while (x >= 0 && y < target.parent().children().length) {
                if (board.children().eq(x).children().eq(y).find('.black-pawn').length) break;
                if (board.children().eq(x).children().eq(y).find('.white-pawn').length){
                    enemy.x = x;
                    enemy.y = y;
                    --x;
                    ++y;
                    while (x >= 0 && y < target.parent().children().length){
                        if (board.children().eq(x).children().eq(y).find('.pawn').length)   break;
                        else if (target.parent().index() === x && target.index() === y)     return enemy;
                        --x;
                        ++y;
                    }
                    break;
                }
                --x;
                ++y;
            }

            x = pawn.parent().parent().index();
            y = pawn.parent().index();
            ++x;
            ++y;
            while (x < board.children().length && y < target.parent().children().length) {
                if (board.children().eq(x).children().eq(y).find('.black-pawn').length) break;
                if (board.children().eq(x).children().eq(y).find('.white-pawn').length){
                    enemy.x = x;
                    enemy.y = y;
                    ++x;
                    ++y;
                    while (x < board.children().length && y < target.parent().children().length){
                        if (board.children().eq(x).children().eq(y).find('.pawn').length)   break;
                        else if (target.parent().index() === x && target.index() === y)     return enemy;
                        ++x;
                        ++y;
                    }
                    break;
                }
                ++x;
                ++y;
            }

            x = pawn.parent().parent().index();
            y = pawn.parent().index();
            ++x;
            --y;
            while (x < board.children().length && y >= 0) {
                if (board.children().eq(x).children().eq(y).find('.black-pawn').length) break;
                if (board.children().eq(x).children().eq(y).find('.white-pawn').length){
                    enemy.x = x;
                    enemy.y = y;
                    ++x;
                    --y;
                    while (x < board.children().length && y >= 0){
                        if (board.children().eq(x).children().eq(y).find('.pawn').length)   break;
                        else if (target.parent().index() === x && target.index() === y)     return enemy;
                        ++x;
                        --y;
                    }
                    break;
                }
                ++x;
                --y;
            }
        }
    }

    function resetGame(color){
        if (color === 'white'){
            window.alert('White win!');
        }else if (color === 'black'){
            window.alert('Black win!');
        }
        whiteScore = 0;
        blackScore = 0;
        whiteScoreElement.html('White: ' + whiteScore);
        blackScoreElement.html('Black: ' + blackScore);
        $('.pawn').remove();
        pawnSelected = false;
        whoseTurn = 'white';
        haveToAttack = false;
        for (var i = 0; i < 3; ++i) {
            var squares = $('.row').eq(i).find('.square');
            for (var j = 0; j < squares.length; ++j){
                if (squares.eq(j).css('background-color') === 'rgb(156, 156, 156)'){
                    squares.eq(j).append(blackPawn);
                }
            }
        }
        for (i = 5; i < board.children().length; ++i) {
            squares = $('.row').eq(i).find('.square');
            for (j = 0; j < squares.length; ++j){
                if (squares.eq(j).css('background-color') === 'rgb(156, 156, 156)'){
                    squares.eq(j).append(whitePawn);
                }
            }
        }

        $('.pawn').click(function()
        {
            selectPawn($(this));
        });

        $('.square').click(function()
        {
            selectSquare($(this));
        });
    }


    function selectPawn(selectedPawn){
        if (whoseTurn === 'white' && selectedPawn.hasClass('white-pawn'))
        {
            pawn = selectedPawn;
            pawnSelected = true;
            $('.pawn').removeClass('selected');
            pawn.addClass('selected');
        }
        else if (whoseTurn === 'black' && selectedPawn.hasClass('black-pawn'))
        {
            pawn = selectedPawn;
            pawnSelected = true;
            $('.pawn').removeClass('selected');
            pawn.addClass('selected');
        }
    }

    function selectSquare(selectedSquare){
        if (pawnSelected && selectedSquare.find('.pawn').length === 0 && selectedSquare.css('background-color') !== 'rgba(0, 0, 0, 0)')
        {
            haveToAttack = false;
            if (pawn.hasClass('white-pawn'))
            {
                $('.white-pawn').each(function(){
                    if (possibilityOfAttack($(this)))
                    {
                        haveToAttack = true;
                    }
                });

                if (!haveToAttack){
                    if (pawn.hasClass('queen')){
                        if (checkQueensMove(selectedSquare))
                        {
                            pawn.appendTo(selectedSquare);
                            pawnSelected = false;
                            if (pawn.hasClass('white-pawn'))
                            {
                                whoseTurn = 'black';
                            }
                            else if (pawn.hasClass('black-pawn'))
                            {
                                whoseTurn = 'white';
                            }
                            pawn.removeClass('selected');

                            return;
                        }
                        else
                        {
                            return;
                        }
                    }
                    else
                    {
                        if(selectedSquare.parent().index() !== pawn.parent().parent().index() - 1 ||
                                Math.abs(selectedSquare.index() - pawn.parent().index()) > 1) {
                            return;
                        }

                        pawn.appendTo(selectedSquare);
                        if (!pawn.hasClass('queen'))
                        {
                            if (queenMaker(pawn)){
                                pawnSelected = false;
                                if (pawn.hasClass('white-pawn'))
                                {
                                    whoseTurn = 'black';
                                }
                                else if (pawn.hasClass('black-pawn'))
                                {
                                    whoseTurn = 'white';
                                }
                                pawn.removeClass('selected');
                                return;
                            }
                        }
                        pawnSelected = false;
                        if (pawn.hasClass('white-pawn'))
                        {
                            whoseTurn = 'black';
                        }
                        else if (pawn.hasClass('black-pawn'))
                        {
                            whoseTurn = 'white';
                        }
                        pawn.removeClass('selected');

                        return;
                    }
                }
                else {
                    if (pawn.hasClass('queen')) {
                        var enemy = correctQueenAttack(selectedSquare);
                        if (enemy === undefined) {
                            return;
                        } else {
                            board.children().eq(enemy.x).children().eq(enemy.y).find('.pawn').remove();
                            ++whiteScore;
                            whiteScoreElement.html('White: ' + whiteScore);
                            if (whiteScore === 12){
                                setTimeout(resetGame('white'), 500);
                                return;
                            }
                        }
                    }
                    else {
                        if (Math.abs(selectedSquare.parent().index() - pawn.parent().parent().index()) !== 1 &&
                                Math.abs(selectedSquare.parent().index() - pawn.parent().parent().index()) !== 2 || !findEnemy(selectedSquare)){
                            return;
                        }
                    }
                }
            }
            else if (pawn.hasClass('black-pawn'))
            {
                $('.black-pawn').each(function(){
                    if (possibilityOfAttack($(this)))
                    {
                        haveToAttack = true;
                    }
                });

                if (!haveToAttack){
                    if (pawn.hasClass('queen')){
                        if (checkQueensMove(selectedSquare))
                        {
                            pawn.appendTo(selectedSquare);
                            pawnSelected = false;
                            if (pawn.hasClass('white-pawn'))
                            {
                                whoseTurn = 'black';
                            }
                            else if (pawn.hasClass('black-pawn'))
                            {
                                whoseTurn = 'white';
                            }
                            pawn.removeClass('selected');

                            return;
                        }
                        else
                        {
                            return;
                        }
                    }else {
                        if (selectedSquare.parent().index() !== pawn.parent().parent().index() + 1 ||
                                Math.abs(selectedSquare.index() - pawn.parent().index()) > 1) {
                            return;
                        }
                        pawn.appendTo(selectedSquare);
                        if (queenMaker(pawn)){
                            pawnSelected = false;
                            if (pawn.hasClass('white-pawn'))
                            {
                                whoseTurn = 'black';
                            }
                            else if (pawn.hasClass('black-pawn'))
                            {
                                whoseTurn = 'white';
                            }
                            pawn.removeClass('selected');
                            return;
                        }
                        pawnSelected = false;
                        if (pawn.hasClass('white-pawn')) {
                            whoseTurn = 'black';
                        }
                        else if (pawn.hasClass('black-pawn')) {
                            whoseTurn = 'white';
                        }
                        pawn.removeClass('selected');

                        return;
                    }
                }
                else {
                    if (pawn.hasClass('queen')) {
                        enemy = correctQueenAttack(selectedSquare);
                        if (enemy === undefined) {
                            return;
                        } else {
                            board.children().eq(enemy.x).children().eq(enemy.y).find('.pawn').remove();
                            ++blackScore;
                            blackScoreElement.html('Black: ' + blackScore);
                            if (blackScore === 12){
                                setTimeout(resetGame('black'), 500);
                                return;
                            }
                        }
                    } else {
                        if (Math.abs(selectedSquare.parent().index() - pawn.parent().parent().index()) !== 1 &&
                                Math.abs(selectedSquare.parent().index() - pawn.parent().parent().index()) !== 2 || !findEnemy(selectedSquare)) {
                            return;
                        }
                    }
                }
            }

            pawn.appendTo(selectedSquare);
            if (queenMaker(pawn)){
                pawnSelected = false;
                if (pawn.hasClass('white-pawn'))
                {
                    whoseTurn = 'black';
                }
                else if (pawn.hasClass('black-pawn'))
                {
                    whoseTurn = 'white';
                }
                pawn.removeClass('selected');
                return;
            }
            if (possibilityOfAttack(pawn))
            {
                pawn = selectedSquare.find('.pawn');
                return;
            }

            pawnSelected = false;
            if (pawn.hasClass('white-pawn'))
            {
                whoseTurn = 'black';
            }
            else if (pawn.hasClass('black-pawn'))
            {
                whoseTurn = 'white';
            }
            pawn.removeClass('selected');
        }
    }

    $('.pawn').click(function()
    {
        selectPawn($(this));
    });

    $('.square').click(function()
    {
        selectSquare($(this));
    });

    $('button').click(function()
    {
        resetGame('reset');
    });
});
