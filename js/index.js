 
//-------------------------------------------step1:  przekazanie danych samolotu do sprawdzenia-------------------------------------
const jetName = { jet: "Bom" };//dane testowe
const but_test1 = document.getElementById('test1-btn');

//post do endpointu '/checkJet' - przekazanie nazwy wybranego samolotu z front-end do back-end (server)
async function sendJetName(){fetch('/checkJet', {
  method: 'post',
  body: JSON.stringify(jetName),
	headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
  .then(json => console.log(`tekst z index.js ${json}`));
};

//nasłuch buttona - 
but_test1.addEventListener('click', sendJetName);  //wyślij nazwę samolotu z FrontEndu do BackEndu

// -------------------step 2:   odpytanie o zarezerwowane miejsca w samlocie 
//----------------------------- który w pierwszym kroku przekazaliśmy (poprzez kliknięcie)
var outputResponse = {};
function checkReservedSeats(){
  fetch('/outputReservated',{metod: 'GET'})
  .then((response) => response.json()) //transform the data into json
  .then(function(data){
    console.log(data); //tablica objektów [{},{},{}]
    //console.log(data[0]); //pierwszy objekt z tablicy objektów
    //console.log(data[0].seat); //konkretny klucz z pierwszego obiektu
    document.getElementById('output_BE').innerHTML  = ''; //reset
    data.forEach(function(element){
        document.getElementById('output_BE').innerHTML +=`<div>${element.seat}</div>`; //zrzut miejsca na ekran, zrobią się subdivy
      });
   
  })
  .catch(function(error){
        console.log(error);
      })
  };


//nasłuch buttona - sprawdzenie zarezerwowanych miejsc
const but_test10 = document.getElementById('test10-btn');
but_test10.addEventListener('click', checkReservedSeats);  

//----------------- rejestracja użytkownika
//nasłuch buttona - przekierowanie do formularza rejestracji użytkownika
const but_reg = document.getElementById('reg-btn');
but_reg.addEventListener('click', () => {

  location.href='/register';
});  

//----------------- logowanie użytkownika
//nasłuch buttona - przekierowanie do formularza logowania
const but_log = document.getElementById('log-btn');
but_log .addEventListener('click', () => {

  location.href='/login';
});  

//nasłuch buttona - rejestracja użytkownika - przekazanie do serwera
document.getElementById('btn2').addEventListener('click', () => {
let loginInput = document.getElementById('inputLogin').value;
console.log(loginInput);


});


//---------------------aktualizacja zarezerwowanych miejsc-------------------------------------------------------------
const bodySeats = { seat: "A03", jet: "Bom" };//dane testowe
const but_test2 = document.getElementById('test11-btn');

async function testPostSeat(){
  fetch('/updateReservated', {
    method: 'post', //przekazujemy do serwera dane miejsca które chcemy odznaczyć jako zarezerwowane
    body: JSON.stringify(bodySeats),
    headers: {'Content-Type': 'application/json'}
  })
 .then(res => res.json())
 .then(json => console.log(json));
};

//nasłuch buttona
but_test2.addEventListener('click', testPostSeat); 





//------------------------------------------------------------------------
// function checkUserRes(){
//   fetch('/checkUser', {method: 'post'})
// 	// .then(res => res.json())
//   // .then(json => console.log(json));
// .then (res => console.log("zmienna node przekazana do frendu"+res))


// };

// checkUserRes();


// var outputResponse = {};
// function checkReservedSeats(){
//   fetch('/outputReservated',{metod: 'GET'})
//   .then(function(response){
//     if(response.ok) {
//       outputResponse = response.json(); //transform the data into json
//       console.log(outputResponse);
//       // document.getElementById('output_BE').innerHTML = 'Odczytano dane o zarejestrowanych miejscach z bazy danych';
//       //document.getElementById('output_BE').innerHTML = outputResponse[0].seat;
//     } //wydrukuj odpowiedź z servera w consoli
//     throw new Error('Request failed');
//   })
//   .then(function(data){
//     console.log(data);
//     //document.getElementById('output_BE').innerHTML = 'Odczytano dane o zarejestrowanych miejscach z bazy danych';
    
//   })
//   // .catch(function(error){
//   //   console.log(error);
//   // })
  
//   };



// setInterval(function(){
// fetch('/outputReservated',{metod: 'GET'})
// .then(function(response){
//   if(response.ok) {
//     var outpuResponse = response.json();
//     console.log(outpuResponse);
//   } //wydrukuj odpowiedź z servera w consoli
//   throw new Error('Request failed');
// })
// .then(function(data){
//   document.getElementById('output').innerHTML = 'Odczytano dane o zarejestrowanych miejscach z bazy danych';
  
// })
// .catch(function(error){
//   console.log(error);
// })

// },1000);
//---------------------------------------------------------
//opóźniony odczyt z serwera
// setInterval(function(){
// fetch('/outputReservated',{metod: 'GET'})
// .then(function(response){
//   if(response.ok) {
//     var outputResponse = response.json();
//     console.log(outputResponse);
//   } //wydrukuj odpowiedź z servera w consoli
//   throw new Error('Request failed');
// })
// .then(function(data){
//   document.getElementById('output').innerHTML = 'Odczytano dane o zarejestrowanych miejscach z bazy danych';
  
// })
// .catch(function(error){
//   console.log(error);
// })

// },1000);


// var seatNum = document.getElementById("A2S").getAttribute('id');

