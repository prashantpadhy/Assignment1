const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		refuser: { type: String, required: false },
		email: { type: String, required: true, unique: true },
        ispaymentmade: { type: Boolean, required: false },
        totalearningmade: { type: Number, required: false },
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model
