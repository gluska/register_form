// eksportujemy akcję 'home' żeby potem przypisać ją do endpointu
// exports.home = (req, res) => {
//     //dane do renderowanego widoku możemy przekazać jako drugi parametr
//     res.render('index', {
//         formMessage: req.flash('form') //tu podaję ustalony przez nas identyfikator wiadomości
//     });
// };

exports.home = (req, res) => {
    //dane do renderowanego widoku możemy przekazać jako drugi parametr
    res.render('./../views/index',{});
};