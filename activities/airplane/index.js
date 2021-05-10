$(document).ready(function() {
  //this var indicates what numbers are used in the moment
  var screening = "0";
  //this indicates all operation until now
  var record = "";
  //this shows the result
  var result = "";
  
  var counter = "";
//this function is used when there are decimals.
  function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
//this is used when pressed a number. If record is void, or reach the digit limit, or the counter is yes (that activates when the result is given) ther record is equal to the number. otherwise, to the record is appended the number.
  function recordingNum(num) {
    if (record === "" || record == "Digit Limit Met" || counter == "yes") {
      record = num;
      $("#record").html(record);
    } else {
      record += num;
      $("#record").html(record);
    }
  }
//this is the same, when a number is pressed, but acts in the main screen. Because that screen is used  to show what is in the moment, if the screen is 0, counter is yes, or is an operator sign, change what is the screen for the number. if is a number distinct to zero and the counter isn't activated, the number is appended to the number in the screen.
  function number(num) {
    if (
      screening == "0" ||
      screening == "+" ||
      screening == "-" ||
      screening == "*" ||
      screening == "/" ||
      counter == "yes"
    ) {
      screening = num;
      counter = "";
      $("#screen").html(screening);
    } else {
      screening += num;
      $("#screen").html(screening);
    }
  }
//This indicates what happens when a operator is pressend. if the screen is 0, or some operator, doesn't do anything. if is counter, one can make more things to the result. If is a number, the screen changes to the operator, and goes on.
  function operator(sign) {
    if (
      screening == "0" ||
      screening == "+" ||
      screening == "-" ||
      screening == "*" ||
      screening == "/"
    ) {
      screening = screening;
    } else if (counter == "yes") {
      record = screening;
      record += sign;
      screening = sign;
      $("#screen").html(screening);
      $("#record").html(record);
      counter = "";
    } else {
      screening = sign;
      record += sign;
      $("#screen").html(screening);
      $("#record").html(record);
    }
  }
//this function servs to reset when the digit limit is met.
  function reset() {
    if (screening.length > 8 || record.length > 22) {
      screening = "0";
      record = "Digit Limit Met";
      $("#screen").html(screening);
      $("#record").html(record);
    }
  }
//this function serves to use the buttons for the keyboard to use the calculator
  function keyboard(button, num1, num2) {
    if (arguments.length == 3) {
      $("body").keyup(function(event) {
        if (event.keyCode === num1 || event.keyCode === num2) {
          $(button).click();
        }
      });
    } else if (arguments.length == 2) {
      $("body").keyup(function(event) {
        if (event.keyCode === num1) {
          $(button).click();
        }
      });
    }
  }

  $("#screen").html(screening);
//this are the buttons
  $("#nine").click(function() {
    recordingNum("9");
    number("9");
    reset();
  });

  $("#eight").click(function() {
    recordingNum("8");
    number("8");
    reset();
  });

  $("#seven").click(function() {
    recordingNum("7");
    number("7");
    reset();
  });

  $("#six").click(function() {
    recordingNum("6");
    number("6");
    reset();
  });

  $("#five").click(function() {
    recordingNum("5");
    number("5");
    reset();
  });

  $("#four").click(function() {
    recordingNum("4");
    number("4");
    reset();
  });

  $("#three").click(function() {
    recordingNum("3");
    number("3");
    reset();
  });

  $("#two").click(function() {
    recordingNum("2");
    number("2");
    reset();
  });

  $("#one").click(function() {
    recordingNum("1");
    number("1");
    reset();
  });

  $("#zero").click(function() {
    if (
      screening == "0" ||
      screening == "+" ||
      screening == "-" ||
      screening == "*" ||
      screening == "/" ||
      counter == "yes"
    ) {
      screening = screening;
    } else {
      screening += "0";
      record += "0";
      $("#screen").html(screening);
      $("#record").html(record);
    }
    reset();
  });
//and the operators buttons
  $("#sum").click(function() {
    operator("+");
  });

  $("#rest").click(function() {
    operator("-");
  });

  $("#multiply").click(function() {
    operator("*");
  });

  $("#divide").click(function() {
    operator("/");
  });
//what happens when the click button is pressed and its conditions to work
  $("#point").click(function() {
    if (record == "Digit Limit Met") {
      screening = "0.";
      record = "0.";
      $("#screen").html(screening);
      $("#record").html(record);
      counter = "";
    } else if (
      screening == "0" ||
      screening == "+" ||
      screening == "-" ||
      screening == "*" ||
      screening == "/"
    ) {
      screening = "0.";
      record += "0.";
      $("#screen").html(screening);
      $("#record").html(record);
      counter = "";
    } else if (/[.]/.test(screening) && counter == "yes") {
      screening = "0.";
      record = "0.";
      $("#screen").html(screening);
      $("#record").html(record);
      counter = "";
    } else if (/[.]/.test(screening)) {
      screening = screening;
    } else if (counter == "yes") {
      screening = "0.";
      record = "0.";
      $("#screen").html(screening);
      $("#record").html(record);
      counter = "";
    } else {
      screening += ".";
      record += ".";
      $("#screen").html(screening);
      $("#record").html(record);
    }
  });
//the AC button, that erase all
  $("#AC").click(function() {
    screening = "0";
    record = "";
    $("#record").html(record);
    $("#screen").html(screening);
    counter = "";
  });
//the CE button, that erase what is going in the moment until the operation before (if is a operator, goes to the number from before, if is a number, goes to the operator). It can't go more than one redo.
  $("#CE").click(function() {
    if (screening == "0" || counter == "yes") {
      record = "";
      screening = "0";
      counter = "";
      $("#record").html(record);
      $("#screen").html(screening);
    } else {
      record = record.slice(0, -screening.length);
      screening = "0";
      $("#record").html(record);
      $("#screen").html(screening);
    }
  });
//what happens when equal is pressed.
  $("#equal").click(function() {
    screening = eval(record);

    if (/[.]/.test(screening)) {
      screening = precisionRound(screening, 2);
      if (screening.toString().length > 10) {
        screening = "0";
        record = "Digit Limit Met";
        $("#screen").html(screening);
        $("#record").html(record);
        counter = "";
      } else {
        record += "=" + screening;
        $("#screen").html(screening);
        $("#record").html(record);
        counter = "yes";
      }
    } else if (screening.toString().length > 10) {
      screening = "0";
      record = "Digit Limit Met";
      $("#screen").html(screening);
      $("#record").html(record);
      counter = "";
    } else {
      record += "=" + screening;
      $("#screen").html(screening);
      $("#record").html(record);
      counter = "yes";
    }
  });
  //the keyboard buttons configured.
  keyboard("#nine", 105, 57);
  keyboard("#eight", 104, 56);
  keyboard("#seven", 103, 55);
  keyboard("#six", 102, 54);
  keyboard("#five", 101, 53);
  keyboard("#four", 100, 52);
  keyboard("#three", 99, 51);
  keyboard("#two", 98, 50);
  keyboard("#one", 97, 49);
  keyboard("#zero", 96, 48);

  keyboard("#point", 110, 190);
  keyboard("#sum", 107);
  keyboard("#rest", 109);
  keyboard("#multiply", 106);
  keyboard("#divide", 111);
  keyboard("#CE", 8);
  keyboard("#AC", 46);
  keyboard("#equal", 13);
});
