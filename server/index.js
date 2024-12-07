const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv').config()

const EmployeeModel = require('./models/Employee')

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001

//console.log(process.env.MongoDB_URL)
mongoose.connect('mongodb+srv://abc:abc1@cluster0.1kfvg.mongodb.net/')

app.post('/insert', async (req, res) => {
    const name = req.body.name;       
    const email = req.body.email;      
    const position = req.body.position; 
    const salary = req.body.salary;    
    console.log("name: "+ name)
    const employee = new EmployeeModel({
        name: name,
        email: email,
        position: position,
        salary: salary
    });
    try{
        await employee.save()
        res.send("inserted data")
    }catch(err){
        console.log(err);
    }
})
app.get('/read', async (req,res)=>{
       try{
        const result = await EmployeeModel.find({})
        res.send(result)
       }catch{

       }
   })
   app.put('/update', async (req, res) => {
    const newName = req.body.newName;
    const id = req.body.id;
    console.log(newName)
 

    try {
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid ID format");
        }

        // Find the employee by ID
        const updatedEmployee = await EmployeeModel.findById(id);

        // Check if employee exists
        if (!updatedEmployee) {
            return res.status(404).send("Employee not found");
        }

        // Update the name
        updatedEmployee.name = newName || updatedEmployee.name;

        // Save the updated employee
        await updatedEmployee.save();
        res.send("Employee updated successfully");
    } catch (err) {
        console.error("Error updating employee:", err);
        res.status(500).send("Error updating employee");
    }
       
});


app.delete('/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id
        await EmployeeModel.findByIdAndDelete(id)
        res.send("deleted")
    }catch{

    }
})

app.listen(PORT,()=>{
    console.log(`server running in port ${PORT}`)
})