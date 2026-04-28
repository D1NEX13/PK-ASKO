export interface IUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	companyName: string;
	username: string;
	createdAt: string;
	updatedAt: string;
	role: 'admin' | 'user';
}
