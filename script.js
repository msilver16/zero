/*jshint -W117 */
/*jshint -W041 */

// CLEAR THE DOM
function clear() {
    $("#edit").css("display", "none");
    $("#view").css("display", "none");
    $("#delete").css("display", "none");
    $("#denied").css("display", "none");
}
clear();
function clearAlerts() {
    $("#emptyFields").css("display", "none");
    $("#incorrectCredentials").css("display", "none");
    $("#forgotID").css("display", "none");
    $("#forgotPW").css("display", "none");
}

// DECLARE THE VARIABLES
var typeSpeed=50;
var typePause=1000;
var currentSequence = 1;
var currentDestination = 1;
var currentCharacter=1;
var newDestination;
var textLine;
var text = [];
text[1] = "Congratulations, you did it! Mission accomplished.";
text[2] = ":)";

// CALLED FUNCTIONS
function type() {
    if (currentCharacter==1) {
        textLine=text[currentSequence];
        newDestination=$("#textDestination"+currentDestination);
    }
    newDestination.html(textLine.substr(0, currentCharacter));
    currentCharacter++;
    if (currentCharacter<=textLine.length) {
        setTimeout(function(){type();}, typeSpeed);
    } else {
        currentCharacter=1;
        currentDestination++;
        currentSequence++;
        setTimeout(function(){type();}, typePause);
    }
}
function alertBox(alertMessage, alertType) {
    $("#alertBG").toggle(0);
    $(alertMessage).toggle(0);
    $("#alert").toggle(alertType);
}
$("#alertBtn").click(function() {
    $("#alert").toggle("clip",function() {
        $("#alertBG").toggle(0);
        clearAlerts();
    });
});
$("#submitBtn").click(function() {
    var agentID = $("#agentID").val();
    var password = $("#password").val();
    if (agentID == "" || password == "") {
        alertBox("#emptyFields", "shake");
    } else if (agentID.toUpperCase() == "KEVIN MARCUS" && password.toUpperCase() == "FORTHEGREATERGOOD") {
        $("#form").fadeOut(function() {     
            $("#buttons").fadeIn();
            $("#console").toggle("clip");
        });
    } else {
        alertBox("#incorrectCredentials", "shake");
    }
});
$('#password').keypress(function(event){
  if(event.keyCode == 13){
    $("#submitBtn").click();
  }
});
$("#idLink").click(function() {
    alertBox("#forgotID", "clip");
});

$("#pwLink").click(function() {
    alertBox("#forgotPW", "clip");
});

$("#editBtn").click(function() {
    clear();
    $("#edit").css("display", "block");
});
$("#viewBtn").click(function() {
    clear();
    $("#view").css("display", "block");
});
$("#deleteBtn").click(function() {
    clear();
    $("#delete").css("display", "block");
});
$("#securityBtn").click(function() {
    var security = $("#security").val();
    if (security.toUpperCase() == "FORTHELESSEREVIL") {
        $("#logo, #form, #buttons").fadeOut();
        $("#console").effect("clip");
        $("#success").css("display", "block");
        setTimeout(function(){$("#overlay").fadeIn(typePause);}, typePause*2);
        setTimeout(function(){type();}, typePause*3);
    } else {
        clear();
        $("#denied").css("display", "block");
        $("#console").effect("shake");
    }
});
$('#security').keypress(function(event){
  if(event.keyCode == 13){
    $('#securityBtn').click();
  }
});