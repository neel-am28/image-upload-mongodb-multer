const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/imageController');

router.get('/', EmployeeController.index);
router.post('/show', EmployeeController.show);
router.post('/store', EmployeeController.store);
router.post('/update', EmployeeController.update);
router.post('/delete', EmployeeController.destroy);

module.exports = router;