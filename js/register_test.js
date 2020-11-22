
// we have to initialize MDB material select
// $(document).ready(function() {
//   $('.mdb-select').materialSelect();
// });

//We just have to assemble all the pieces and execute them in (function() { })( ); object

(function() {
  // Before using validate.js we must add the parse and format functions
  // Here is a sample implementation using moment.js

  //validate.validators.presence.options = {message: "can't be empty"};

  //----- co ma się pojawić w komunikacie w przypadku gdy właściwość 'presence' (obecność, fakt wypełnienia danych) nie spełnia wymogu
  validate.validators.presence.options = {message: "nie może być pusty"};

  //You can customize the regexp for email pattern
  validate.validators.email.PATTERN = /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

  validate.extend(validate.validators.datetime, {
    parse: function(value, options) {
      return +moment.utc(value);
    },
    format: function(value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });

  // zdefiniowanie constraints / ograniczenia, restrykcje
  // {
  //   <attribute>: {
  //     <validator name>: <validator options>
  //   }
  // }

  var constraints = {
    email: {
      presence: true,
      email: true
      
    },
    
    password: {
      presence: true,
      length: {
        minimum: 6, 
        message: "musi mieć min. 6 znaków"
      }
    },
    
    "confirm-password": {
      presence: true,
      equality: {
        attribute: "password",
        //message: "^The passwords does not match"
        message: "^Hasła są niezgodne" //strzałka w górę = pominięcie zacytowania 'confirm-password' na początku wiadomości
      }
    },
    
    username: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 20
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    
    birthdate: {
      presence: true,
      date: {
        latest: moment().subtract(18, "years"),
        message: "^You must be at least 18 years old to use this service"
      }
    },
    
    country: {
      presence: true,
      inclusion: {
        within: ["SE"],
        message: "^Sorry, this service is for Sweden only"
      }
    },
    
    zip: {
      format: {
        pattern: "\\d{5}"
      }
    },
    
    "number-of-children": {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0
      }
    }
  };

//============================================================================================
  // I hooked up the form to prevent it from being posted and instead execute a custom function

  var form = document.querySelector("form#main");
  form.addEventListener("submit", function(ev) {
    ev.preventDefault(); //powstrzymanie przed automatyczną wysyłką danych formularza
    handleFormSubmit(form); //po użyciu zdarzenia 'submit' wywołuje się funkcja handleFormSubmit() 
  });

  var inputs = document.querySelectorAll("input, textarea, select")  // podpięcie input'ów żeby zwalidować je 'w locie'
  
  //w poniższej pętli dodajemy nasłuch na zdarzenie "change" do każdego z inputów
  //po stwierdzeniu zmiany na jakimkolwiek inpucie następuje sprawdzenie poprawności formularza pod kątem ograniczeń
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {    
      var errors = validate(form, constraints) || {};  // sprawdź poprawność formularza pod kątem ograniczeń
      showErrorsForInput(this, errors[this.name])   // następnie aktualizujemy formularz, aby odzwierciedlić wyniki
    });
  }

  //-------------------------------------------------------------
  // poniżej zdefiniowane różne funkcje

  //Ta prosta funkcja sprawdza, czy walidacja funkcji po sprawdzeniu naszego formularza zwraca jakiekolwiek błędy zgodnie z naszymi predefiniowanymi ograniczeniami
  //sprawdzenie czy są jakiekolwiek błędy walidacji

  function handleFormSubmit(form, input) {
    var errors = validate(form, constraints);
    // console.log(errors);
    showErrors(form, errors || {});  ///Wywołujemy funkcję showErrors() jeżeli są jakiekolwiek błędy
    if (!errors) {  // jeżeli formularz zwalidowany bezbłędnie - wywołujemy funkcję showSuccess()
      showSuccess();  //=========== TU WPISUJEMY FUNKCJĘ REALIZUJĄCĄ SUBMIT
    }
  }

  
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
      showErrorsForInput(input, errors && errors[input.name]);  // Since the errors can be null if no errors were found we need to handle that
    });
  }


  // Function that shows the errors for a specific input
  function showErrorsForInput(input, errors) {
    // This is the root of the input
    var formGroup = closestParent(input.parentNode, "form-group")
    // Find where the error messages will be insert into
      , messages = formGroup.querySelector(".messages");
      // First we remove any old messages and resets the class
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
  }

  //We will use this function to find a place for our error messages
  //My structure of HTML assumes that my errors will be displayed inside of a grid structure so I just need to reach a div that is a sibling to our inputs div with class .md-form.

  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }
// We just check if the attribute child received an element that can actually be a nested element and if that is true, checks if this element contains the class that we want to actually find. 
//If not we reach .parentNode element and execute the function once more. So the only expected outputs are null if we reach document without finding the desired class or actually an element that we are looking for


   //To achieve reset of a form group we just clear previously added classes and remove elements containing errors.
  function resetFormGroup(formGroup) {
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
      el.parentNode.removeChild(el);
    });
  }


  //Adds the specified error with the planned markup

  function addError(messages, error) {
    var block = document.createElement("p"); // Create error message container
    block.classList.add("help-block");
    block.classList.add("error");
    // You can add what ever styling classes you want to your errors
    block.classList.add("text-danger");
    block.innerText = error;
    // Adds our ready error block to the desired location
    messages.appendChild(block);
  }

  function showSuccess() {
    alert("Success!");  // ta funkcja tylko generuje alert
  }
})();