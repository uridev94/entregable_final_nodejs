const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const path = require('path');
const fs = require('fs')

const getAll = catchError(async(req, res) => {
    const results = await ProductImg.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {

    //productId -> we will make an endpoint
    // The model has the following columns filename, url and productId

    const { filename } = req.file

    // We ask for the file name
    // Then we get the protocol http
    // Then we get host from the headers
    // So we create a variable named url to get the path to the img
    // We do not add route public, express add it auto...

    // Then we validate the creat controller so we dont create multiple times the same images

    const imageDb = await ProductImg.findOne({where: { filename }})

    if (imageDb) return res.sendStatus(404).json({error: "Image couldn't be created or is probably repeated"})

    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`

    const result = await ProductImg.create({filename, url});
    return res.status(201).json(result)
});


const remove = catchError(async(req, res) => {
    const { id } = req.params;

    const result = await ProductImg.findByPk(id)
    if(!result) return res.sendStatus(404).json({error: 'File not found'})

    const imageFilePath = path.join(__dirname, '..', 'public', 'uploads', result.filename)
    fs.unlinkSync(imageFilePath)

    await result.destroy()

    // console.log(__dirname) Directory of the file uploaded to the web.
    // const result = await ProductImg.destroy({ where: {id} });
    // if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});


module.exports = {
    getAll,
    create,
    remove
}