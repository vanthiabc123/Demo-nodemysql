const configViewEngine=(app)=>{
    app.set("view engine","ejs");
    app.set("views", "app/views")
}
module.exports=configViewEngine;