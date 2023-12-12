//declare global variable
var displayTimeEl = $('#display-time');
var allTimeBlocks = $('.container');
var timeBlockEl = [9, 10, 11, 12, 1, 2, 3, 4, 5];

// displaying day and time
function displayTime() {
    var timeNow = dayjs().format('dddd, MMMM DD, YYYY [at] h:mm A');
    displayTimeEl.text(timeNow);
}
setInterval(displayTime, 1000);

// function for creating timeblocks for each working hour in html
function createTimeBlocks(X) {
    var newDiv = $('<div>');
    var newLabel = $('<lable>');
    var newTextArea = $('<textarea>');
    var newSaveBtn = $('<button>');
    
    if (X>=9) {
        newDiv.attr('id', X + 'am-row');
        newLabel.text(X + 'AM');
        newLabel.attr('for', X +'amInput');
        newTextArea.attr('id', X +'amInput');
    } else {
        newDiv.attr('id', X + 'pm-row');
        newLabel.text(X + 'PM');
        newLabel.attr('for', X +'pmInput');
        newTextArea.attr('id', X +'pmInput');
    }
    
    allTimeBlocks.append(newDiv);
    newDiv.addClass('row time-block');

    newDiv.append(newLabel);
    newLabel.addClass('col hour');

    newDiv.append(newTextArea);
    newTextArea.addClass('col-8');
    newTextArea.attr('name', X);

    newDiv.append(newSaveBtn);
    newSaveBtn.attr('type', 'save');
    newSaveBtn.attr('id', X);
    newSaveBtn.addClass('col saveBtn');
    newSaveBtn.append($('<i class="fas fa-save"></i>'));

    //getting the current hour
    var dt = new Date();
    var currentHour = dt.getHours();

    if (X > 8 && currentHour < 13){
        if (X === currentHour) {
            newTextArea.addClass('present');
        } else if (X < currentHour) {
            newTextArea.addClass('past');
        } else {
            newTextArea.addClass('future');
        } 
    } else if (X > 8 && currentHour > 12){
        newTextArea.addClass('past');
    } else if (X < 6 && currentHour > 12){
        if (X + 12 === currentHour) {
            newTextArea.addClass('present');
        } else if (X + 12 < currentHour) {
            newTextArea.addClass('past');
        } else {
            newTextArea.addClass('future');
        }
    } else if (X < 6 && currentHour < 13) {
        newTextArea.addClass('future');
    }
}

//loop for creating timeblocks automatically in html
for (var i = 0; i < timeBlockEl.length; i++) {
    createTimeBlocks(timeBlockEl[i]);
}

var msgDiv = $('#msg');
var saveBtnEl = $('.saveBtn');
var allTasks = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

function renderTasks() {
    for (var i = 0; i < timeBlockEl.length; i++){
        var hourlyTask = allTasks[i];
        $('.container').children().eq(i+1).children('textarea').text(hourlyTask);
    }
}

function displayMessage (message) {
    msgDiv.text(message);
}

function init() {
    var storedTasks = JSON.parse(localStorage.getItem("allTasks"));
    if (storedTasks !== null) {
        allTasks = storedTasks;
    }
    renderTasks()
}

function storedTasks () {
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

saveBtnEl.on('click', function (event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches("button") === true) {
        var btnID = element.getAttribute("id");
        if (btnID > 8) {
            var textAreaID = String(btnID + "amInput");
        } else {
            var textAreaID = String(btnID + "pmInput");
        }
        
        var selectedTextAreaEl = document.getElementById(textAreaID);
        var taskText = selectedTextAreaEl.value.trim();
        
        if (btnID > 8){
            allTasks.splice(btnID-9, 1);
            allTasks.splice(btnID-9, 0, taskText);
        } else if (btnID < 6){
            allTasks.splice(btnID+3, 1);
            allTasks.splice(btnID+3, 0, taskText);
        }

        displayMessage("Task Successfully Saved!")
        storedTasks();
        renderTasks();
    }
})

/*


init();

function displayMessage (type, message) {
    msgDiv.text(message);
    msgDiv.attr('class', type);
}

function init() {
    var storedTasks = JSON.parse(localStorage.getItem("dailyTasks"));
    if (storedTasks !== null) {
        dailyTasks = storedTasks;
    }
}





saveBtnEl.on('click', function (event) {
    event.preventDefault();
    var element = event.target;
    var saveID = element.getAttribute("id");
    if (element.matches("button") === true) {
        if (saveID < 13) {
            var textAreaID = saveID + "amInput";
            console.log (textAreaID);
            localStorage.setItem("task", JSON.stringify($textAreaIA));
        } else {
            var textAreaID = saveID + "pmInput";
            console.log (textAreaID);
            localStorage.setItem("task", JSON.stringify($textAreaIA));
        }
    }
}
    

});

    if (X > 8) {
        var amTextAreaID = X + "amInput";
    } else {
        var pmTextAreaID = X + "pmInput";
    }
   
    console.log (amTextAreaID);
*/