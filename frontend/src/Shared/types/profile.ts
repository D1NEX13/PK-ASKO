export const ProfileSections = {
	PersonalInfo: 'personalInfo',
	Orders: 'orders',
	Security: 'security',
} as const;

export type ProfileSection = (typeof ProfileSections)[keyof typeof ProfileSections];
