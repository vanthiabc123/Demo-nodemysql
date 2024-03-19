const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookies =require('js-cookie');
// Tạo bảng users nếu chưa tồn tại
userModel.createUsersTable();

// Hàm để hiển thị trang thêm người dùng
function showAddUserForm(req, res) {
    res.render('home.ejs');
}

function addUser(req, res) {
    const image = req.file.path;
    console.log(image);
    const { username, email, firstName, password, address, role } = req.body;
    // Gọi hàm addUser từ model để thêm người dùng vào cơ sở dữ liệu
    userModel.addUser(username, email, firstName, password, address, image, role);
    res.redirect("/userpage");
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await userModel.deleteUser(userId);
        res.redirect("/userpage");
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    const { username, email, firstName, password, address, role } = req.body;
    userModel.updateUser(userId, username, email, firstName, password, address, role);
    res.redirect('/userpage');
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            res.status(401).send('Email người dùng không tồn tại');
            return;
        }

        bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (err) {
                throw err;
            }

            if (!passwordMatch) {
                res.status(401).send('Mật khẩu không chính xác');
                return;
            }
            req.session.user=user;
            const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' });

            // Lưu token trong cookie
            res.cookie('token', token, { maxAge: 3600000 }); // Thời gian sống của cookie là 5 giây
            
            console.log("Đăng nhập thành công!");
            res.redirect("/");
        });
    } catch (error) {
        console.error('Lỗi khi xử lý yêu cầu đăng nhập:', error);
        res.status(500).send('Lỗi máy chủ');
    }
}

const logout = (req, res) => {
    // Xóa token từ cookie
    res.clearCookie('token');
    res.redirect("/loginpage");
}

module.exports = {
    showAddUserForm,
    addUser,
    deleteUser,
    updateUser,
    loginUser,
    logout,
};
