// TODO: EXPOSE ALL SECRETS

const SECRET = ['I will push this secret, I swear'];
const callback = () => {
	return SECRET.map((s) => s.toLocaleLowerCase());
};
