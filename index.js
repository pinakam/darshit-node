const app = require("./config/server")
const userroutes = require("./routes/userroutes")

app.use(require("./middleware/usermiddleware"))
app.use(userroutes)

const port = 4000


app.listen(port,()=>{
    console.log(`server is running on port number ${port}`)
})