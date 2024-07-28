import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';
import { Member } from '../member/member';

export interface Notice {
	_id: string;
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent: string;
	createdAt: Date;
	updatedAt: Date;
	memberId: string;
	memberData?: Member;
}
