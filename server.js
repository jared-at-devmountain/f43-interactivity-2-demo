const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let characters = [
    {
        id: 0,
        firstName: 'Jake', 
        lastName: 'Peralta', 
        gender: 'male',
        age: 39, 
        likes: ['Amy', 'Die Hard', 'Taylor Swift']
    }, 
    {
        id: 2, 
        firstName: 'Rosa', 
        lastName: 'Diaz', 
        gender: 'female',
        age: 34, 
        likes: ['motorcycles', 'Nancy Meyers', 'weapons']
    }, 
    {
        id: 1, 
        firstName: 'Amy', 
        lastName: 'Santiago', 
        gender: 'female', 
        age: 37, 
        likes: ['binders', 'grammar', 'dancing']
    }, 
    {
        id: 3,
        firstName: 'Charles', 
        lastName: 'Boyle', 
        gender: 'male',
        age: 42, 
        likes: ['Jake', 'dogs', 'food']
    }
]

//if an HTTP GET request comes in with the /characters as the path/endpoint part of the URL
//the callback below will be triggered
app.get('/characters', (req, res) => {
    console.log('hit chars')
    res.status(200).send(characters)
})

//if an HTTP GET request comes in with the /characters/whateverIwanttoputhere as the path/endpoint
//part of the URL
//the callback below will be triggered
app.get('/character/:name', (req, res) => {
    const { name } = req.params
    const index = characters.findIndex(char => char.firstName.toLowerCase() === name)
    res.status(200).send(characters[index])
})

//if an HTTP GET request comes in with the /charater as the path/endpoint part of the URL
//the callback below will be triggered
app.get('/character', (req, res) => {
    const { age } = req.query
    
    let filtered = characters.filter(char => {
        return char.age > age
    })

    res.status(200).send(filtered)
})

let id = 4

//if an HTTP POST request comes in the /charater as the path/endpoint part of the URL
//the callback below will be triggered
app.post('/character', (req, res) => {
    let newChar = {...req.body, id}
    newChar.likes = newChar.likes.slice(0, 3)
    characters.unshift(newChar)
    res.status(200).send(characters)
    id++
})

app.listen(4000, () => console.log('up on 4000'))