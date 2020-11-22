// //rola tego kontrolera to zapisywanie zgłoszeń użytkowników
// exports.store = (req, res) => {
// //po przesłaniu formularza serwer ma nam zwrócić dane które do niego przesłaliśmy
// res.json({
//     'name': req.body.name,  //odwołujemy się do właściwości 'body' obiektu żądania a następnie do właściwości 'name'
//     'phone': req.body.phone,
//     'message': req.body.message
// })
// };

exports.store = (req, res) => {
    //'form' to ustalony przez nas identyfikator wiadomości, drugi parametr to tekst wiadomości skłądający się z odczytanego z formularza pola name (dodatkowo podzielone i wycięte tylko imię) + dopisku
req.flash('form', req.body.name.split(' ')[0] + 'You are a true hero!');
res.redirect('/'); //przekierowanie na stronę główną
};