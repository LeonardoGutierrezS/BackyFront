const express = require('express');
const mongoose = require('mongoose');
const implementoRoutes = require("./routes/implementoRoutes")
const userRoutes = require("./routes/userRoutes")
const inventoryRoutes = require("./routes/inventoryRoutes")
const maitenanceRoutes = require("./routes/maintenanceRoutes")
const reportRoutes = require("./routes/reportRoutes")
const app = express();

app.use(express.json());

//conexión a mongodb local
try {
    mongoose.connect('mongodb+srv://md-project:md-superpwd@cluster0.hovtuoy.mongodb.net/?retryWrites=true&w=majority');
    console.log('Conectado a mongodb');
} catch (error) {
    console.log(error);
}

app.use(implementoRoutes)
app.use(userRoutes)
app.use(maitenanceRoutes)
app.use(inventoryRoutes)
app.use(reportRoutes)

app.listen(3001, () => {
    console.log('Servidor listo',3001);
})