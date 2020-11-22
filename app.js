const express = require("express"); //import Express
const router = express.Router();
const path = require('path');
const bodyparser = require("body-parser");
const mongo = require('mongodb');
const favicon = require('serve-favicon');
const app = express(); //start App
const fetch = require('node-fetch');
const port = 3000; //Assign port
const mongoClient = mongo.MongoClient;
const url = "mongodb+srv://tester_1:xxx111@cluster0-ecz9u.gcp.mongodb.net/test?retryWrites=true&w=majority";
const PagesController = require('./controllers/PagesController');
const ApplicationsController = require('./controllers/ApplicationsController');
const flash = require('connect-flash');
const session = require('express-session');

//ustawienie że moja aplikacja musi korzystać z silnika szablonów 'hbs'
app.set("view engine", 'hbs');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

//app.use(favicon(path.join(__dirname, 'assets/images', 'favicon.ico')));
//-------------------------------------------
// app.use(session({
//   //w obiekcie konfiguracyjnym podaję kilka wymaganych opcji
//   secret: 'dog hero',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {}
// }));
//app.use(flash()); // moduł flash używamy do przekazania informacji zwrotnej do użytkownika
//-----------------------------

 //przypisujemy akcję do endpointu '/'
app.get('/',(req,res) => {
  res.render('index',{
    wsadNode: jetInput
  })
});



// app.get('/register',(req,res) => {
//   res.render('register_form',{
     
//   })
// });

app.get('/register',(req,res) => {
  res.render('register_form_test',{
     
  })
});




app.get('/login',(req,res) => {
  res.render('login_form',{
     
  })
});



//----------------- dodanie nowego użytkownika  ---------
app.post("/regToServer",(req, res) => {
  var regFName = req.body.fName;
  var regLName = req.body.lName;
  var regEmail = req.body.inputEmail;
  var regPwd = req.body.inputPW;
console.log(`Przesłałeś do serwera ${regFName}, ${regLName}, ${regEmail}, ${regPwd}`);
//res.end(`You have sent to serwer: ${regFName}, ${regLName}, ${regEmail}, ${regPwd}`);
res.render('index');
const dbname = 'db_university';
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
          if (err) throw err;
          const db = client.db(dbname);
          db.collection("users").insertOne(
            {
              name: regFName,
              surname: regLName,
              email: regEmail,
              password: regPwd
            },
            (error, result) => {
              if(error){console.log("error when inserting", error);}
              console.log("result");
            }
          );
            
          console.log(`dodano użytkownika: ${regFName} ${regLName} do bazy!`);
          //client.close();
            
          });
          console.log("udane połączenie z bazą");
        });



//------------------------------odpytanie bazy o  zarezerwowane miejsca
var reservedOutput;
var jetInput = "początkowy tekst";

//pobranie nazwy samolotu z front-endu przez endpoint '/checkJet'
app.post("/checkJet", (req, res) => {
    /////POŁĄCZENIE DO BAZY DANYCH
    jetInput = req.body.jet;
    console.log('poniżej tekst w Node pobrany z frontendu');
    console.log(jetInput);
    //------
    // router.post('/', function(req, res) {
    //   //searchdata = req.body.searchbar;
    //  // wsadNode: jetInput
    //   wsadNode= jetInput;
    //   res.end();
    // });

    //-------

const dbname = 'db_university';
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
          if (err) throw err;
          const db = client.db(dbname);
          const filter = {jet: jetInput, free: false};
          db.collection("seats").find(filter).toArray((error, result) => {
            if (err) throw err;
            
            reservedOutput = result; //rezultatem jest tablica 3 obiektów
            console.log("wyniki odpytania MongoDB ponizej:");
            console.log(reservedOutput);
            client.close();
            
          });
          console.log("udane połączenie z bazą");
        });

});

console.log("wyniki odpytania MongoDB ponizej:");
console.log(reservedOutput);

//--------------------- działający
//obsługa zapytania na endpoint '/outputReservated'
// app.get('/outputReservated',(req,res) => {
//   const dbname = 'db_university';
//    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
//           if (err) throw err;
//           const db = client.db(dbname);
//           const filter = {jet: jetInput, free: false};
//           db.collection("seats").find(filter).toArray((error, result) => {
//             if (err) throw err;
            
//             reservedOutput = result; //rezultatem jest tablica 3 obiektów
//             console.log("wyniki odpytania MongoDB ponizej:");
//             console.log(reservedOutput);
//             client.close();
            
//           });
//           console.log("udane połączenie z bazą");
//         });

//     res.send(reservedOutput);
// });


function checkReservated() {
  const dbname = 'db_university';
  const filter = {jet: jetInput, free: false};
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      if (err) throw err;
      const db = client.db(dbname);
      const filter = {jet: jetInput, free: false};
      db.collection("seats").find(filter).toArray((error, result) => {
        if (err) throw err;
        reservedOutput = result; //rezultatem jest tablica 3 obiektów
        console.log("wyniki odpytania MongoDB ponizej:");
        console.log(reservedOutput);
        client.close();
      });
   console.log("udane połączenie z bazą");
  });
};

//------ działający
// app.get('/outputReservated',(req,res) => {
  
//     checkReservated();
//     res.send(reservedOutput);

// });



app.get('/outputReservated',(req,res) => {
  
  async function f() {
    checkReservated();
  }
  f()
  .then(console.log(reservedOutput))
  .then(
    res.send(reservedOutput)
  );
  

});



//--użycie mongo zwraca promis
// MongoClient.connect(url)
//   .then(function (db) { // <- db as first argument
//     console.log(db)
//   })
//   .catch(function (err) {})



// async function main(){
//   let client, db;
//   try{
//      client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
//      db = client.db(dbName);
//      let dCollection = db.collection('collectionName');
//      let result = await dCollection.find();   
//      // let result = await dCollection.countDocuments();
//      // your other codes ....
//      return result.toArray();
//   }
//   catch(err){ console.error(err); } // catch any mongo error here
//   finally{ client.close(); } // make sure to close your connection after
//  }


//--------------- obsługa aktualizacji zarezerwowanych miejsc ---------

app.post('/updateReservated',(req,res) => {
  bookedSeats = req.body;
  console.log('poniżej obiekt w Node pobrany z frontendu');
  console.log(bookedSeats);  

  const dbname = 'db_university';
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err) throw err;
        const db = client.db(dbname);
        const seatInput = req.body.seat;
        const jetInput = req.body.jet;
        const filter = {seat: seatInput, jet: jetInput}; //szukamy miejsca które chcemy zaktualizować
        const update = { $set: {free: false} };
        db.collection("seats").updateOne(filter, update, function(err, res) {
          if (err) throw err;
          console.log("Zaktualizano dane w bazie Mongo dla:");
          console.log(filter);
          client.close();
        });
        console.log("udane połączenie z bazą");
      });

});




//-------------------------------------------------------------------------------------------------
//----- start serwera Node
app.listen(port, (err) => {
    if (err) {
        return console.log("coś poszło nie tak ...:", err)
    }
    console.log("serwer działa na porcie", port)
});

app.use('/assets', express.static(path.join(__dirname,"./assets")));
app.use('/js', express.static(path.join(__dirname, "./js")));



module.exports = router;
