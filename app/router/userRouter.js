const express = require('express');
const router = express.Router();
const homePageController =require("../controller/homePageController");
const userController=require("../controller/userController");
const fileUploader = require('../middleware/cloudinary');
const initWebRoute=(app)=>{

router.get("/",homePageController.getHomePage)
router.post("/add-user",fileUploader.single('image'), userController.addUser);
router.get('/userpage',homePageController.getUserPage);
router.post('/users/:id',userController.deleteUser);
router.get('/users/:id/edit',homePageController.editUserPage);
router.post('/userss/:id', userController.updateUser);
router.get('/loginpage',homePageController.getLogin);
router.post('/login-page',userController.loginUser);
router.get('/logout',userController.logout)
return app.use("/",router);
}

module.exports = initWebRoute;
