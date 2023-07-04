import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

//conexión a mongodb local
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB')
    console.log('Conectado a mongodb');
} catch (error) {
    console.log(error);
}

const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    username: String
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch(error => res.json(error))
});

//Ruta para guardar usuarios
app.post('/user', (req, res) => {
    const body = req.body;
    const user = new User(body)
    user.save();
    res.json({
        mensage: 'Usuario guardado',
        user,
    });
});

app.put('/:id',async(req, res) => {
    const {id} = req.params;
    const body = req.body;

    const newDato = await User.findByIdAndUpdate(id, body,{new:true})
    res.json({
        mensage: 'Usuario actualizado',
        body,
    });
})

app.delete('/:id',async(req, res) => {
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    res.json({
        mensage: 'Usuario eliminado',
    })
})


app.listen(3001, () => {
    console.log('Servidor listo',3001);
})

//
