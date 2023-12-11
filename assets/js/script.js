var displayTimeEl = $('#display-time');
var allTimeBlocks = $('.container');
var timeBlockEl = [9, 10, 11, 12, 1, 2, 3, 4, 5]

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

    newDiv.append(newSaveBtn);
    newSaveBtn.attr('type', 'save');
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