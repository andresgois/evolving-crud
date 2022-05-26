const express = require('express');
const UserController = require('../modulos/User/controller/UserController');
const route = express();
const multerConfig = require('../helps/upload')
const path = require('path')
const multer = require('multer');
//route.use('/public',express.static('public'));
const verifyImage = require('../modulos/middleware/verifyImage');
route.use('/files', express.static(path.resolve(__dirname, '..','..','public')))
//const uploadsFolder = path.resolve(__dirname, '..', '..', 'public')

/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsFolder)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })*/

const userController = new UserController();

route.get('/', userController.listAll);

route.get('/:id', userController.listOne);

//route.post('/', upload.single('file'), userController.create);
route.post('/', multer(multerConfig).single('file'), verifyImage, userController.create);

route.put('/:id', userController.update);

route.delete('/:id', userController.destroy);


module.exports = route;