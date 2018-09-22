window.onload = function() {
    console.log("test");
};

//Make a todolistObject
//Add functions to add an activity object to an array
//Make the activity object, taking name and category

var toDoListObject = {
    list: [],
    objectIndex: 0
}

function addActivity() {
    if(toDoListObject.objectIndex > 5 ) {
        window.alert("you've reached your max number of activities");
        return;
    }
    var myThing = document.getElementById("activityNamer").value;
    if(myThing == "") {
        window.alert("add an activity name");
        return;
    }
    console.log(myThing);
    toDoListObject.list[toDoListObject.list.length] += myThing;
    toDoListObject.objectIndex += 1;
    var idString = "item"+ toDoListObject.objectIndex;
    document.getElementById('toDo').insertAdjacentHTML('beforeend', '<li id=' + idString + '">'+ myThing+'  <button onclick="deleteIndex(this)"></button></li>');
    var myThing = document.getElementById("activityNamer").value = "";
}

function deleteIndex(elem) {
    //remove the deleted item from the array 
     toDoListObject.list = toDoListObject.list.filter(function(item) {
         toDoListObject.list.splice(elem.id);
         return item !== elem.id;
     });
    elem.parentElement.remove();
    console.log(toDoListObject.list);
    toDoListObject.objectIndex -= 1;
}

function checkForEnter() {
document.getElementById('activityNamer').onkeydown = function(event) {
    if (event.keyCode === 13) {
        addActivity();
    }
}
}

console.log(toDoListObject);
