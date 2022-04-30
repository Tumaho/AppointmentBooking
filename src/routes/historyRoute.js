const router = require('express').Router();
const history = require('../models/history');

// body parser to read the body data 
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Create new history
router.post('/', (req, res) => {

    const newHistory = new history({
        fullName: req.body.fullName,
        email: req.body.email,
        typeOfService: req.body.typeOfService,
        appointmentDate: req.body.appointmentDate,
        appointmentHour: req.body.appointmentHour,
        status: req.body.status,
        appointmentDuration: req.body.appointmentDuration,
        takenBy: req.body.takenBy,
        reason: req.body.reason
    });

    newHistory.save()
        .then(item => {
            res.json("item saved to database");
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("unable to save to database");
        });

})

// Get all histories
router.get('/', async (req, res) => {

    var historyList = await history.find();
    res.json({
        error: null,
        data: historyList
    })
})


// Get history by id
router.get('/:id', async (req, res) => {

    let oneHistory = await history.findById(req.params.id);
    res.json({
        data: oneHistory
    })
})


// delete history
router.delete('/:id', async (req, res) => {
    await history.deleteOne({ '_id': req.params.id })

    res.json("DELETED");
})

module.exports = router