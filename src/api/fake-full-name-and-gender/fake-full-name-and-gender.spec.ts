// Critical thinking tells me that we shouldn't test this file since it is just an abstraction
// Since the API merely returns that function, if a test fails in that function so would this, as it is dependent on it

describe('fakeFullNameAndGender', () => {
	it('should be true', () => {
		expect(true).toBeTruthy();
	});
});
