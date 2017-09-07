$(function ()
{
    'use strict';

    var board = $('#board');
    var pawnSelected = false;
    var whoseTurn = 'white';
    var pawn;

    function findEnemy(target)
    {
        if (pawn.hasClass('white-pawn'))
        {
            if (board.find('.row').eq(pawn.parent().parent().index() - 1)
                            .find('.square').eq((pawn.parent().index() + target.index()) / 2)
                            .find('.black-pawn').length !== 0)
            {
                board.find('.row').eq(pawn.parent().parent().index() - 1)
                        .find('.square').eq(Math.ceil((pawn.parent().index() + target.index()) / 2))
                        .find('.black-pawn').remove();
                return true;
            }
        }
        else if (pawn.hasClass('black-pawn'))
        {
            if (board.find('.row').eq(pawn.parent().parent().index() + 1)
                            .find('.square').eq((pawn.parent().index() + target.index()) / 2)
                            .find('.white-pawn').length !== 0)
            {
                board.find('.row').eq(pawn.parent().parent().index() + 1)
                        .find('.square').eq(Math.ceil((pawn.parent().index() + target.index()) / 2))
                        .find('.white-pawn').remove();
                return true;
            }
        }
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
            if (pawn.hasClass('white-pawn'))
            {
                if(board.find($(this).parent()).index() >= board.find(pawn.parent().parent()).index() ||
                board.find($(this).parent()).index() < board.find(pawn.parent().parent()).index() - 2 ||
                Math.abs(board.find($(this)).index() - board.find(pawn.parent()).index()) !==
                Math.abs(board.find($(this).parent()).index() - board.find(pawn.parent().parent()).index()))
                {
                    return;
                }
                if(Math.abs($(this).index() - pawn.parent().index()) === 2 && !findEnemy($(this)))
                {
                    return;
                }
            }
            else if (pawn.hasClass('black-pawn'))
            {
                if(board.find($(this).parent()).index() <= board.find(pawn.parent().parent()).index() ||
                        board.find($(this).parent()).index() > board.find(pawn.parent().parent()).index() + 2 ||
                        Math.abs(board.find($(this)).index() - board.find(pawn.parent()).index()) !==
                        Math.abs(board.find($(this).parent()).index() - board.find(pawn.parent().parent()).index()))
                {
                    return;
                }
                if(Math.abs($(this).index() - pawn.parent().index()) === 2 && !findEnemy($(this)))
                {
                    return;
                }
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
