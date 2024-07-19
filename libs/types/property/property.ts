import {
	PropertyAmenities,
	PropertyLocation,
	PropertyStatus,
	PropertyType,
	PropertyUtilityBills,
	StayDuration,
} from '../../enums/property.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Property {
	_id: string;
	propertyType: PropertyType;
	propertyAmenities: PropertyAmenities[];
	stayDuration: StayDuration;
	propertyStatus: PropertyStatus;
	propertyLocation: PropertyLocation;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyDeposite: number;
	propertyUtilityBills: PropertyUtilityBills[];
	propertySquare: number;
	propertyBeds: number;
	propertyRooms: number;
	propertyViews: number;
	propertyLikes: number;
	propertyComments: number;
	propertyRank: number;
	propertyImages: string[];
	propertyDesc?: string;
	propertyRent: boolean;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Properties {
	list: Property[];
	metaCounter: TotalCounter[];
}
