const { Schema, model } = require('mongoose');

const recipeSchema = new Schema ({
    name: [
        {
            type: String,
        },
    ],
    content
})