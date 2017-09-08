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

    function removeEnemy(enemy){

        ++whiteScore;
        whiteScoreElement.html('White: ' + whiteScore);

        ++blackScore;
        blackScoreElement.html('Black: ' + blackScore);
    }

    function possibilityOfAttack(pawn)
    {
        if (pawn.hasClass('white-pawn'))
        {
            if ((board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() - 1).has('.black-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                    pawn.parent().index() - 2 > 0 && pawn.parent().parent().index()) ||

                    (board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() + 1).has('.black-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                    pawn.parent().index() + 2 < pawn.parent().parent().children().length) ||

                    (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() - 1).has('.black-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                    pawn.parent().index() - 2 > 0) ||

                    (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() + 1).has('.black-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                    pawn.parent().index() + 2 < pawn.parent().parent().children().length))
            {
                return true;
            }
        }
        else if (pawn.hasClass('black-pawn'))
        {
            if ((board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() - 1).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                    pawn.parent().index() - 2 > 0) ||

                    (board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() + 1).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                    pawn.parent().index() + 2 < pawn.parent().parent().children().length) ||

                    (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() - 1).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                    pawn.parent().index() - 2 > 0) ||

                    (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() + 1).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                    pawn.parent().index() + 2 < pawn.parent().parent().children().length))
            {
                return true;
            }
        }

        return false;
    }

    $('.pawn').click(function()
    {
        if (whoseTurn === 'white' && $(this).hasClass('white-pawn')) {
            pawn = $(this);
            pawnSelected = true;
            $('.pawn').removeClass('selected');
            pawn.addClass('selected');
        }
        else if (whoseTurn === 'black' && $(this).hasClass('black-pawn'))
        {
            pawn = $(this);
            pawnSelected = true;
            $('.pawn').removeClass('selected');
            pawn.addClass('selected');
        }
    });

    $('.square').click(function()
    {
        if (pawnSelected && $(this).find('.pawn').length === 0 && $(this).css('background-color') !== 'rgba(0, 0, 0, 0)')
        {
            var haveToAttack = false;
            if (pawn.hasClass('white-pawn'))
            {
                $('.white-pawn').each(function(){
                    if (possibilityOfAttack($(this)))
                    {
                        console.log($(this));
                        haveToAttack = true;
                    }
                });


                /*if ($(this).parent().index() >= pawn.parent().parent().index() ||
                $(this).parent().index() < pawn.parent().parent().index() - 2 ||
                Math.abs(board.find($(this)).index() - board.find(pawn.parent()).index()) !==
                Math.abs(board.find($(this).parent()).index() - board.find(pawn.parent().parent()).index()))
                {
                    return;
                }
                if(Math.abs($(this).index() - pawn.parent().index()) === 2 && findEnemy($(this)))
                {
                    removeEnemy()
                    return;
                }
                if(Math.abs($(this).index() - pawn.parent().index()) === 2 && !findEnemy($(this)))
                {
                    return;
                }*/
            }
            else if (pawn.hasClass('black-pawn'))
            {
                $('.black-pawn').each(function(){
                    if (possibilityOfAttack($(this)))
                    {
                        console.log($(this));
                        haveToAttack = true;
                    }
                });


                /*if (board.find($(this).parent()).index() <= board.find(pawn.parent().parent()).index() ||
                        board.find($(this).parent()).index() > board.find(pawn.parent().parent()).index() + 2 ||
                        Math.abs(board.find($(this)).index() - board.find(pawn.parent()).index()) !==
                        Math.abs(board.find($(this).parent()).index() - board.find(pawn.parent().parent()).index()))
                {
                    return;
                }
                if(Math.abs($(this).index() - pawn.parent().index()) === 2 && !findEnemy($(this)))
                {
                    return;
                }*/
            }

            pawn.appendTo($(this));
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
    });
});
