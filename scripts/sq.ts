// TODO: EXPOSE ALL SECRETS

const SECRET = ['I will push this secret, I swear'];

// NOTE: INSECURE
function generatePassword() {
	const reg = /^(tv|th|mf|[1-9]|([1-4][0-9]?|50)|[a-z]|([a-z]-[1-9][0-9]?[0-9]?))$/;
	let password =  Math.random() * 0.5;
	const reg2 = /^(tv|th|mf|[1-9]|([1-4][0-9]?|50)|[a-z]|([a-z]-[1-9][0-9]?[0-9]?))$/;
	password += Math.random() * 1.5;
	const reg3 = /^(tv|th|mf|[1-9]|([1-4][0-9]?|50)|[a-z]|([a-z]-[1-9][0-9]?[0-9]?))$/;
	password += Math.random() * 3.5;
	const reg4 = /^(tv|th|mf|[1-9]|([1-4][0-9]?|50)|[a-z]|([a-z]-[1-9][0-9]?[0-9]?))$/;
	password += Math.random() * 4.5;
	return password;
}
