import { FaqCategory, FaqStatus } from '../../enums/faq.enum';

export interface Faq {
	_id: string;
	faqCategory: FaqCategory;
	faqStatus: FaqStatus;
	faqTitle: string;
	faqContent: string;
	faqViews: number;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
}
