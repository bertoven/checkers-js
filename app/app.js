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

    function possibilityOfAttack(pawn)
    {
        if (pawn.hasClass('white-pawn'))
        {
            if (pawn.hasClass('queen'))
            {
                var x = pawn.parent().parent().index();
                var y = pawn.parent().index();
                var min = Math.min(x, y);
                --x; --y;

                for (var i = 0; i < min; ++i)
                {
                    console.log(board.children().eq(x).children().eq(y));
                    if (board.children().eq(x).children().eq(y).find('.white-pawn').length)
                    {
                        break;
                    }
                    if (board.children().eq(x).children().eq(y).find('.black-pawn').length && x - 1 >= 0 && y - 1 >= 0 && !board.children().eq(x - 1).children().eq(y - 1).children().length)
                    {
                        return true;
                    }
                    --x; --y;
                }

                return false;
            }
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
                    pawn.parent().parent().index() + 2 < board.children().length))
            {
                return true;
            }
        }
        else if (pawn.hasClass('black-pawn'))
        {
            if ((board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() - 1).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                    pawn.parent().index() - 2 >= 0 &&
                    pawn.parent().parent().index() - 2 >= 0) ||

                    (board.find('.row').eq(pawn.parent().parent().index() - 1).find('.square').eq(pawn.parent().index() + 1).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() - 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                    pawn.parent().index() + 2 < pawn.parent().parent().children().length &&
                    pawn.parent().parent().index() - 2 >= 0) ||

                    (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() - 1).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() - 2).has('.black-pawn').length &&
                    pawn.parent().index() - 2 >= 0 &&
                    pawn.parent().parent().index() + 2 < board.children().length) ||

                    (board.find('.row').eq(pawn.parent().parent().index() + 1).find('.square').eq(pawn.parent().index() + 1).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.white-pawn').length &&
                    !board.find('.row').eq(pawn.parent().parent().index() + 2).find('.square').eq(pawn.parent().index() + 2).has('.black-pawn').length &&
                    pawn.parent().index() + 2 < pawn.parent().parent().children().length &&
                    pawn.parent().parent().index() + 2 < board.children().length))
            {
                return true;
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
            }
        }
        else if (pawn.hasClass('black-pawn')) {
            if (pawn.parent().parent().index() === board.children().length - 1)
            {
                pawn.find('div').append(queenFont);
                pawn.addClass('queen');
            }
        }
    }

    $('.pawn').click(function()
    {
        if (whoseTurn === 'white' && $(this).hasClass('white-pawn'))
        {
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
                    if ($(this).parent().index() !== pawn.parent().parent().index() - 1 ||
                            Math.abs($(this).index() - pawn.parent().index()) > 1)
                    {
                        return;
                    }
                    pawn.appendTo($(this));
                    queenMaker(pawn);
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
                    if (Math.abs($(this).parent().index() - pawn.parent().parent().index()) !== 1 &&
                            Math.abs($(this).parent().index() - pawn.parent().parent().index()) !== 2 ||
                            !findEnemy($(this)))
                    {
                        return;
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
                    if ($(this).parent().index() !== pawn.parent().parent().index() + 1 ||
                            Math.abs($(this).index() - pawn.parent().index()) > 1)
                    {
                        return;
                    }
                    pawn.appendTo($(this));
                    queenMaker(pawn);
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
                    if (Math.abs($(this).parent().index() - pawn.parent().parent().index()) !== 1 &&
                            Math.abs($(this).parent().index() - pawn.parent().parent().index()) !== 2 ||
                            !findEnemy($(this)))
                    {
                        return;
                    }
                }
            }

            pawn.appendTo($(this));
            queenMaker(pawn);
            if (possibilityOfAttack(pawn))
            {
                pawn = $(this).find('.pawn');
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
    });
});
