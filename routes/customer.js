var Customer = require('../models/customer');

module.exports = (app) => {

    app.get('/', async function (req, res) {
        await Customer.find({}, (err, customers) => {
            if(err) {
                console.log(err)
            }
            res.render('index', {
                title: 'Add Customer',
                customers: customers
            });
        })
    });

    app.post('/', async function(req, res) {
        if(!req.body.firstname || !req.body.lastname || !req.body.idNumber || !req.body.phone) {
            console.log('At least a field is empty');
            res.status(403).redirect('/');
        } else {
            var customerObj = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                idNumber: req.body.idNumber,
                phone: req.body.phone,
                address: req.body.address
            }
            var newCustomer = new Customer(customerObj);
            await newCustomer.save((err) => {
                if(err) {
                    console.log(err)
                }
                console.log(newCustomer);
                res.redirect('/');
            })
        }
    });

    app.get('/detail/:id', async function (req, res) {
        let customers = await Customer.find({}, (err, customers) => {
            if(err) {
                console.log(err)
            }
        })
        await Customer.findOne({'_id': req.params.id}, (err, customer) => {
            res.render('detail', {
                id: req.params.id,
                title: 'Customer Detail',
                customer: customer,
                customers: customers
            });
        })
    });

    app.post('/detail/:id', async function(req, res) {
        if(!req.body.firstname || !req.body.lastname || !req.body.idNumber || !req.body.phone) {
            console.log('At least a field is empty');
            res.redirect('/');
        } else {
            await Customer.update({'_id': req.params.id}, {$set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                idNumber: req.body.idNumber,
                phone: req.body.phone,
                address: req.body.address
            }});

            res.redirect('/');
        }
    });

    app.put('/detail/:id', async function(req, res) {
        await Customer.remove({'_id': req.body.customerId});
    });
}