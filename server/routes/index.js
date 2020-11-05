let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index.js');

/* GET home page. */
router.get('/',   indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET products page. */
router.get('/products', indexController.displayProductsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact-us', indexController.displayContactPage);

/*GET for displaying login page*/
router.get('/login', indexController.displayLoginPage);

/*POST Route for processing the Login page*/
router.post('/login', indexController.processLoginPage);

/*GET for displaying Register page*/
router.get('/register', indexController.displayRegisterPage);

/*POST Route for processing the Register page*/
router.post('/register', indexController.processRegisterPage)

/*GET to perform UserLogout*/
router.get('/logout', indexController.performLogout)


module.exports = router;