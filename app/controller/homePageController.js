const userModel = require('../model/user');

const getHomePage = async (req, res) => {
    console.log("data.page:", "home");
    return res.render("home.ejs", {
        data: { page: "createNewUser", title: "trang chu" },
    });
}
const getUserPage=async(req,res)=>{
    const users=await userModel.getUsers();
    console.log('Users data:', users); 
    return res.render("home.ejs",{
        data:{page:"userPage",title:"giao diện user",users}
    })
}
const editUserPage = async(req, res)=> {
    const userId = req.params.id;
    // Lấy thông tin người dùng dựa trên userId và render giao diện sửa thông tin
    const user = await userModel.getUserById(userId);
    console.log(user)
    return res.render("home.ejs",{
        data:{page:"editUserPage",title:"giao diện sửa",user}
    })     
}
const getLogin =async(req,res)=>{
    return res.render("home.ejs", {
        data: { page: "login", title: "trang đăng nhập" },
    });
}
module.exports = { 
    getHomePage,
    getUserPage,
    editUserPage,
    getLogin
 };
