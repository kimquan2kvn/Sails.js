Skip to content
Sign up
This repository has been archived by the owner. It is now read-only.
vonWolfehaus
/
sails-jwt-login
Public archive
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
sails-jwt-login/api/helpers/create-user.js /
@vonWolfehaus
vonWolfehaus jwt login with cookie storage
Latest commit 562cb7e on 2 Dec, 2017
 History
 1 contributor
47 lines (40 sloc)  958 Bytes


var bcrypt = require('bcryptjs')

module.exports = {
	friendlyName: 'Create user',
	description: 'Create a new user.',

	inputs: {
		email: {
			type: 'string'
		},
		password: {
			type: 'string'
		},
	},

	exits: {
		invalid: {
			responseType: 'badRequest',
			description: 'The provided email address and/or password are invalid.',
		},
		emailAlreadyInUse: {
			statusCode: 409,
			description: 'The provided email address is already in use.',
		},
	},

	fn: async function(inputs, exits) {
		var attr = {
			id: sails.helpers.randomCryptoString({ size: 32 }).execSync(),
			email: inputs.email.toLowerCase(),
		}

		if (inputs.password) {
			attr.password = await bcrypt.hash(inputs.password, 10)

			var user = await User.create(attr)
			.intercept('E_UNIQUE', () => 'emailAlreadyInUse')
			.intercept({name: 'UsageError'}, () => 'invalid')
			.fetch()

			return exits.success(user)
		}
		else {
			return exits.invalid('Missing password.')
		}
	}
}
