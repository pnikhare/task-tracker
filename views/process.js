/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab
});

function getTasks() {
    console.log("execue get tasks");
    $.ajax({
        url: "/api/v1/tasks",
        type: "GET",
        success: function (data) {
            createTable(data, "List of All Tasks");
        },
        error: function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            $('#responseDiv').html(errorThrown);
        }
    });
}

function createTasks() {
    console.log("execue create tasks");
    var form = $('#taskForm');
    //console.log($(form).serialize());
    $.ajax({
        url: "/api/v1/tasks",
        type: "POST",
        data: $(form).serialize(),
        success: function (results) {
            var result = [];
            result.push(results);
            createTable(result, "Newly created Task");
        },
        error: function (xhr, status, errorThrown) {
            var data = JSON.parse(JSON.stringify(xhr));
            console.log(" Error: " + errorThrown+" : "+JSON.stringify(xhr));
            $('#responseDiv').text("Error:" + errorThrown);
        }
    });
}

function updateTaskByID() {

    //var form = $('#updateForm');
    // var form = $("#updateForm :input[value!='']");
    var form = $("#updateForm :input")
            .filter(function (index, element) {
                return $(element).val() != '';
            });
    var id = $('#updateForm input[name=_id]').val();
    $.ajax({
        url: "/api/v1/tasks/" + id + "/",
        type: "PUT",
        data: $(form).serialize(),
        success: function (results) {
            var result = [];
            result.push(results);
            createTable(result, "Updated / Newly created Task");
        },
        error: function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            $('#responseDiv').text(errorThrown);
        }
    });
}


function updatePartTaskByID() {

    var form = $("#updatePartForm :input")
            .filter(function (index, element) {
                return $(element).val() != '';
            });
    var id = $('#updatePartForm input[name=_id]').val();
    $.ajax({
        url: "/api/v1/tasks/" + id + "/",
        type: "PATCH",
        data: $(form).serialize(),
        success: function (results) {
            var result = [];
            result.push(results);
            createTable(result, "Updated Details of Task");
        },
        error: function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            $('#responseDiv').text(errorThrown);
        }
    });
}


function deleteByID() {

    var form = $("#deleteForm :input")
            .filter(function (index, element) {
                return $(element).val() != '';
            });
    var id = $('#deleteForm input[name=_id]').val();
    if (id == '') {
        alert("Please enter a valid Id");
        return false;
    }
    $.ajax({
        url: "/api/v1/tasks/" + id,
        type: "DELETE",
        data: $(form).serialize(),
        success: function (results) {
            $('#responseDiv').text(results);

        },
        error: function (xhr, status, errorThrown) {
            alert("Error: " + errorThrown);
            $('#responseDiv').text(errorThrown);
        }
    });
}

function searchByID() {
    var id = $('#searchId input[name=_id]').val();
    $.ajax({
        url: "/api/v1/tasks/" + id + "/",
        type: "GET",
        success: function (results) {
            if (null != results) {
                var result = [];
                result.push(results);
                createTable(result, " Task with ID : " + id);
            } else {
                $('#responseDiv').text(" No Task found with ID :  " + id);
            }
        },
        error: function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            $('#responseDiv').text(errorThrown);
        }
    });
}

function searchByStatus() {
    var status = $('#searchStatus input[name=status]').val();
    $.ajax({
        url: "/api/v1/tasks/status/" + status+ "/",
        type: "GET",
        success: function (results) {
            if (null != results) {
                createTable(results, " Task with Status : " + status);
            } else {
                $('#responseDiv').text(" No Task found with status :  " + status);
            }
        },
        error: function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            $('#responseDiv').text(errorThrown);
        }
    });
}

function searchByDate() {
    var deadline = $('#searchDate input[name=deadline]').val();
    $.ajax({
        url: "/api/v1/tasks/deadline/" + deadline+ "/",
        type: "GET",
        success: function (results) {
            if (null != results) {
                createTable(results, " Task Before : " + deadline);
            } else {
                $('#responseDiv').text(" No Task found with deadline :  " + deadline);
            }
        },
        error: function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            $('#responseDiv').text(errorThrown);
        }
    });
}

function searchStatusByID() {
    var id = $('#searchStatusId input[name=_id]').val();
    $.ajax({
        url: "/api/v1/tasks/" +id+ "/status",
        type: "GET",
        success: function (results) {
                $('#responseDiv').text(" Status of Task with id :" + id+" "+ results);
        },
        error: function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            $('#responseDiv').text(errorThrown);
        }
    });
}

function createTable(list, captions) {
    var cols = [];
    console.log(list.length, list);
    for (var i = 0; i < list.length; i++) {
        for (var k in list[i]) {
            if (cols.indexOf(k) === -1) {
                // Push all keys to the array 
                cols.push(k);
            }
        }
    }

    // Create a table element 
    var table = document.createElement("table");
//    var heading = table.createCaption();
//    heading.innerHTML = captions;
//    alert(captions);
//    table.appendChild(heading);
    // Create table row tr element of a table 
    var tr = table.insertRow(-1);

    for (var i = 0; i < cols.length; i++) {

        // Create the table header th element 
        var theader = document.createElement("th");
        theader.innerHTML = cols[i];

        // Append columnName to the table row 
        tr.appendChild(theader);
    }

    // Adding the data to the table 
    for (var i = 0; i < list.length; i++) {

        // Create a new row 
        trow = table.insertRow(-1);
        for (var j = 0; j < cols.length; j++) {
            var cell = trow.insertCell(-1);

            // Inserting the cell at particular place 
            cell.innerHTML = list[i][cols[j]];
        }
    }

    // Add the newely created table containing json data 
    var el = document.getElementById("responseDiv");
    el.innerHTML = " <div id='header'><h5>" + captions + "</h5></div>";
    el.appendChild(table);
}

