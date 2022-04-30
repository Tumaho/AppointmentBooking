const router = require('express').Router();
const appointment = require('../models/appointment');

// body parser to read the body data 
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Create new appointment
router.post('/', (req, res) => {

    const newAppointment = new appointment({
        fullName: req.body.fullName,
        email: req.body.email,
        typeOfService: req.body.typeOfService,
        appointmentDate: req.body.appointmentDate,
        appointmentHour: req.body.appointmentHour,
        status: req.body.status,
        appointmentDuration: req.body.appointmentDuration
    });

    console.log(newAppointment);
    newAppointment.save()
        .then(item => {
            res.json("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });

})

// Get all appointments
router.get('/', async (req, res) => {

    var appointmentList = await appointment.find();
    res.json({
        error: null,
        data: appointmentList
    })
})


// Get appointment by id
router.get('/:id', async (req, res) => {

    let oneAppointment = await appointment.findById(req.params.id);
    res.json({
        data: oneAppointment
    })
})


// update appointment status
router.put('/', async (req, res) => {

    let idVale = { '_id': req.body.appointmentId };
    let newStatus = { 'status': req.body.status };
    await appointment.findByIdAndUpdate(idVale, newStatus);

    res.json("updated");
})

// delete appointment
router.delete('/:id', async (req, res) => {
    await appointment.deleteOne({ '_id': req.params.id })

    res.json("DELETED");
})

module.exports = router