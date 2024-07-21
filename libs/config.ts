export const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}`;

const thisYear = new Date().getFullYear();

export const propertyYears: any = [];

for (let i = 1970; i <= thisYear; i++) {
	propertyYears.push(String(i));
}

export const propertySquare = [0, 15, 17, 18, 20, 23, 25, 27, 30, 32, 34, 36, 38, 40, 42, 45, 48, 50, 55, 60, 75];

export const Messages = {
	error1: 'Something went wrong!',
	error2: 'Please login first!',
	error3: 'Please fulfill all inputs!',
	error4: 'Message is empty!',
	error5: 'Only images with jpeg, jpg, png format allowed!',
	error6: 'Sorry, you cannot like yourself!',
};

export const topPropertyRank = 2;
