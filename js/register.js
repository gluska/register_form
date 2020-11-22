var constraints = {
    email: {
      // If email is required
      presence: true,
      // and you want to check if this is an email
      email: true
    },
  }
//----------------------------------------------------------------------------
// Before using validate.js we must add the parse and format functions
// Here is a sample implementation using moment.js
validate.extend(validate.validators.datetime, {
    // The value is not null or undefined but otherwise it could be anything.
    parse: function(value, options) {
      return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });
//-----------------------------------------------------------------------

var form = document.querySelector("form#main");
form.addEventListener("submit", function(ev) {
  ev.preventDefault();
  handleFormSubmit(form);
});

//-----------------------------------------------------
function handleFormSubmit(form, input) {
    // validate the form against the constraints
    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  };

  function showSuccess() {
    // Action to execute if the form is valid.
    alert("Success!");
  };
  
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
      // Since the errors can be null if no errors were found we need to handle that
      showErrorsForInput(input, errors && errors[input.name]);
    });
  };

// Function that shows the errors for a specific input
function showErrorsForInput(input, errors) {
    // This is the root of the input
    var formGroup = closestParent(input.parentNode, "form-group")
      // Find where the error messages will be insert into
      , messages = formGroup.querySelector(".messages");
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add("has-error");
      // then we append all the errors
      _.each(errors, function(error) {
        addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add("has-success");
    }
  };

  // Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
for (var i = 0; i < inputs.length; ++i) {
  inputs.item(i).addEventListener("change", function(ev) {
    var errors = validate(form, constraints) || {};
    showErrorsForInput(this, errors[this.name])
  });
};

// Recusively finds the closest parent that has the specified class
function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  };

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and remove any old messages
    _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
      el.parentNode.removeChild(el);
    });
  };

  // Adds the specified error with the planned markup
// [message]
function addError(messages, error) {
    // Create error message container
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    // You can add what ever styling classes you want to your errors
    block.classList.add("text-danger");
    // Assign error message
    block.innerText = error;
    // Adds our ready error block to the desired location
    messages.appendChild(block);
  };

  // Material Select Initialization
$(document).ready(function() {
    $('.mdb-select').materialSelect();
  });
  









(function() {
    'use strict';
    window.addEventListener('load', function() {   

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
    if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    }
    form.classList.add('was-validated');
    }, false);
    });

    

    }, false);
    })();


//------------ funkcje do formularza rejestacji

// validates text only
//wszystkie znaki inne niż litery, myślnik, apostrof, kropka zostają zamieniona na "" czyli wykasowane
//stosujemy dla: imię, nazwisko, login
function Validate(txt) {
    txt.value = txt.value.replace(/[^a-zA-Z-'\n\r.]+/g, '');
    
}


// validate email
function email_validate(email)
{
var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;  //regex do walidacji poprawności adresu email
 
    if(regMail.test(email) == false)
    {
     document.getElementById("emailStatus").innerHTML    = "<span class='warning'>Adres email nie jest poprawny</span>";
    }
    else
    {
    document.getElementById("emailStatus").innerHTML	= "<span class='valid'>Wprowadzono poprawny adres email</span>"; 
    }
}

// validate password
function checkPass()
{
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match"
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
} 

//validate phone number
function validatephone(phone) 
{
    var maintainplus = '';
    var numval = phone.value
    if ( numval.charAt(0)=='+' )
    {
        var maintainplus = '';
    }
    curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g,'');
    phone.value = maintainplus + curphonevar;
    var maintainplus = '';
    phone.focus;
}




// validate date of birth
function dob_validate(dob)
{
var regDOB = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;
 
    if(regDOB.test(dob) == false)
    {
    document.getElementById("statusDOB").innerHTML	= "<span class='warning'>DOB is only used to verify your age.</span>";
    }
    else
    {
    document.getElementById("statusDOB").innerHTML	= "<span class='valid'>Thanks, you have entered a valid DOB!</span>"; 
    }
}
// validate address
function add_validate(address)
{
var regAdd = /^(?=.*\d)[a-zA-Z\s\d\/]+$/;
  
    if(regAdd.test(address) == false)
    {
    document.getElementById("statusAdd").innerHTML	= "<span class='warning'>Address is not valid yet.</span>";
    }
    else
    {
    document.getElementById("statusAdd").innerHTML	= "<span class='valid'>Thanks, Address looks valid!</span>"; 
    }
}