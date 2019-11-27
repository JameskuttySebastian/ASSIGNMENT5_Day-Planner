
$(document).ready(function () {

    //header section
    //*********************************************** */
    //show current date

    var selectedDate = document.querySelector("#selectedDate");

    // variables
    var currentDate = moment().format('LL');
    //show current date for now
    selectedDate.textContent = currentDate;


    // var currentHour = parseInt(moment().format("H"));
    var currentHour = 12;
    // console.log(currentHour);


    // ***********************************************
    //showing hourly sections
    var hourArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    var hourArrayAMPM = ["9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm"];

    dateToSave = moment().format('DD-MM-YYYY');

    // console.log(dateToSave);




    var taskObjectArray = {
        objDate: "",
        taskArray: [{
            hourID: 0,
            taskItem: ""
        }]
    }

    //Checking if the task list for today in the memory

    var taskObjectArrayToDisplay = "";

    var retrievedTaskObjectArray = JSON.parse(localStorage.getItem("taskObjectArray"));
    // console.log(retrievedTaskObjectArrayObject);
    if (retrievedTaskObjectArray === null || retrievedTaskObjectArray.objDate != dateToSave) {
        taskObjectArrayToDisplay = taskObjectArray;
        taskObjectArrayToDisplay.taskArray = [];

        // creating new array for the date
        taskObjectArrayToDisplay.objDate = dateToSave;
        for (var hr = 0; hr < hourArray.length; hr++) {
            var taskArrayMember = {
                hourID: 0,
                taskItem: ""
            }
            taskArrayMember.hourID = hourArray[hr];
            taskArrayMember.taskItem = "Lorem" + hourArray[hr];
            taskObjectArrayToDisplay.taskArray.push(taskArrayMember);
            // console.log(taskObjectArrayToDisplay);
        }
    }
    else {
        taskObjectArrayToDisplay = retrievedTaskObjectArray;
        //this need to display on page load
    }

    var setBackgroundForHour = function (hrs) {

        if (currentHour < hrs) {
            $(".setBackground" + hrs).css("background-color", "rgb(204, 201, 201)");
        }
        else if (currentHour === hrs) {
            $(".setBackground" + hrs).css("background-color", "rgb(188, 245, 141)");
        }
        else {
            $(".setBackground" + hrs).css("background-color", "rgb(159, 213, 245)");
        }
    }

    var displayExistingTasks = function () {
        if (taskObjectArrayToDisplay != "") {
            for (it = 0; it < taskObjectArrayToDisplay.taskArray.length; it++) {
                var stringToSearch = "#txt" + taskObjectArrayToDisplay.taskArray[it].hourID;
                $(stringToSearch).text(taskObjectArrayToDisplay.taskArray[it].taskItem);
            }
        }
    }


    // creating all the html elements to show the daily planner
    for (var i = 0; i < hourArray.length; i++) {
        //main div for row
        var mainDiv = $("<div>");
        mainDiv.addClass("row");
        //---------------------------------------------------------------
        //column for hour tag
        var hourTagColumnDiv = $("<div>");
        hourTagColumnDiv.addClass("col-sm-2 col-md-2 col-xl-1");
        hourTagColumnDiv.addClass("setBackground" + hourArray[i]);

        //text for hour column
        var hourTagText = $("<p>");
        hourTagText.text(hourArrayAMPM[i]);

        //append hour tag to hour column
        hourTagColumnDiv.append(hourTagText);
        //---------------------------------------------------------------
        // //create column and class for textbox
        // var textAreaAndButtonDiv = $("<div>");
        // textAreaAndButtonDiv.addClass("col-sm-10 col-md-10 col-xl-11");

        //create column and class for textbox
        var textAreaAndButtonColumnDiv = $("<div>");
        textAreaAndButtonColumnDiv.addClass("col-sm-10 col-md-10 col-xl-11 textAreaColumn");
        textAreaAndButtonColumnDiv.addClass("setBackground" + hourArray[i]);

        // text area and button group
        var textAreaAndButtonGroupDiv = $("<div>");
        textAreaAndButtonGroupDiv.addClass("input-group");

        // freate textarea
        var inputTextArea = $("<textarea>");
        // inputTextArea.text("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit vel quasi labore, delectus, veniam vero");


        inputTextArea.addClass("form-control");
        inputTextArea.addClass(hourArrayAMPM[i]);
        inputTextArea.addClass("setBackground" + hourArray[i]);
        inputTextArea.attr("id", "txt" + hourArray[i]);
        inputTextArea.attr("textarea-associated-hour", hourArray[i]);


        //create append button div
        var appendButtonDiv = $("<div>");
        appendButtonDiv.addClass("input-group-append");


        //creating button
        var saveButton = $("<button>");
        saveButton.addClass("btn btn-info");
        saveButton.attr("id", "btn" + hourArray[i]);
        saveButton.attr("button-associated-hour", hourArray[i]);

        //creating button image span
        var saveButtonSpan = $("<span>");
        saveButtonSpan.addClass("fa fas fa-sticky-note");//add image for save button
        saveButtonSpan.css("pointer-events", "none");

        var hrLine = $("<hr>");
        hrLine.addClass("thinLine");
        hrLine.attr("id", "line" + hourArray[i]);

        //append save button span to save button
        saveButton.append(saveButtonSpan);

        //append save button to save button span
        appendButtonDiv.append(saveButton);

        // appending text area and button div
        textAreaAndButtonGroupDiv.append(inputTextArea, appendButtonDiv)

        //add input group to column
        textAreaAndButtonColumnDiv.append(textAreaAndButtonGroupDiv);

        // append bot columns to main row div
        mainDiv.append(hourTagColumnDiv);
        mainDiv.append(textAreaAndButtonColumnDiv, hrLine);

        //add main div to hour list
        $(".hourList").append(mainDiv);
        // ***********************************************
        //showing hourly sections with different colour code

        setBackgroundForHour(hourArray[i]);

    }

    $("#line17").hide();// hide last seperating line

    //displaying existing value

    displayExistingTasks();

    // ***********************************************
    //upon click, check the click from button and get the value
    // also identiry click is from which button

    $(".btn").on("click", function (event) {

        if (event.target.matches("button")) {
            var targetButton = event.target;
            // console.log(targetButton);
            var clickedButtonHour = $(targetButton).attr("button-associated-hour");
            // console.log(clickedButtonHour);

            //generate the text area id and display
            var textAreaID = "#txt" + clickedButtonHour;
            var txtContent = $(textAreaID).val();
            console.log(textAreaID,txtContent);
            //need to save into object

            // var taskObjectArray = {
            //     objDate: "",
            //     taskArray: [{
            //         hourID: 0,
            //         taskItem: ""
            //     }]
            // }
            taskObjectArrayToDisplay.objDate = dateToSave;

            // var stringToSearch = "#txt" + taskObjectArrayToDisplay.taskArray[it].hourID;
            // $(stringToSearch).text(taskObjectArrayToDisplay.taskArray[it].taskItem);


        }
    });



})