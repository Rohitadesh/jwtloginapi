const user={
    "post":"insert into user(name,user_name,password,email,phonenumber) values(?,?,?,?,?)",
    "getuser":"select * from user",
    "getIdUser":"select * from user where id=?",
    "getLoginCredential":"select * from user  where user_name = ?",
    "updateUser" :"UPDATE user SET "
}

module.exports={user}