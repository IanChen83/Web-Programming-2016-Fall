// Pollute global namespace LOL
var todoList = [];

/////////////////// UI Functions //////////////////////////
function uiUpdateStatistics(){
    var done = 0;
    var undone = 0;

    todoList.forEach(function(i){
        if(i.done){
            done += 1;
        }else{
            undone += 1;
        }
    });

    $('span#undoneNum').html(undone);
    $('span#doneNum').html(done);
}

function uiAddToList(){
    if(addToList($('input#addInput').val())){
        $('input#addInput').val("");
    }
}

function uiTodoItemGen(content){
    var todoItem = $.parseHTML(
        '<div class="item">' +
            '<div class="right floated content">' +
                '<button class="red basic circular ui icon button delete hide">' +
                    '<i class="larger remove icon"></i>' +
                '</button>' +
                '<button class="green basic circular ui icon button markdone hide">' +
                    '<i class="larger checkmark icon"></i>' +
                '</button>' +
            '</div>' +
            '<span class="content">' + content + '</span>' +
        '</div>'
    );

    return todoItem[0];
}

/////////////////// Helper Functions //////////////////////
function addToList(str){
    if(!str) return false;

    var todoItem = uiTodoItemGen(str);

    var markDoneBtn = $(todoItem).find('.markdone')[0];
    var deleteBtn = $(todoItem).find('.delete')[0];

    $(markDoneBtn).on('click', function(){
        $(todoItem).children('.content').toggleClass('doneContent');
        todoList.forEach(function(v){
            if(v.markDoneBtn == markDoneBtn){
                v.done = !v.done;
            }
        });
        uiUpdateStatistics();
    });

    $(deleteBtn).on('click', function(){
        $(todoItem).remove();
        todoList = todoList.filter(function(v){
            return (v.deleteBtn != deleteBtn);
        });
        uiUpdateStatistics();
    });

    $(todoItem).hover(function(){
        $(markDoneBtn).toggleClass('hide');
        $(deleteBtn).toggleClass('hide');
    },function(){
        $(markDoneBtn).toggleClass('hide');
        $(deleteBtn).toggleClass('hide');
    });

    todoList.push({
        title       : str,
        done        : false,
        markDoneBtn : markDoneBtn,
        deleteBtn   : deleteBtn
    });

    $('#todoList').append(todoItem);

    uiUpdateStatistics();

    return true;
}

///////////////////  One-time Routine /////////////////////
$('input#addInput').bind('keypress', function(e){
    if(e.which === 13){
        uiAddToList();
    }
});

$('button#addBtn').on('click', uiAddToList);
