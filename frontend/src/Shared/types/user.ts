export interface IUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	companyName: string;
	role: 'admin' | 'user';
}
