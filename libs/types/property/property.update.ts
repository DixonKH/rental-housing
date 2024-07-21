import {
	PropertyAmenities,
	PropertyLocation,
	PropertyStatus,
	PropertyType,
	PropertyUtilityBills,
} from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyType?: PropertyType;
	propertyStatus?: PropertyStatus;
	propertyLocation?: PropertyLocation;
	propertyAmenities?: PropertyAmenities[];
	propertyAddress?: string;
	propertyTitle?: string;
	propertyPrice?: number;
	propertyDeposite?: number;
	propertyUtilityBills?: PropertyUtilityBills[];
	propertySquare?: number;
	propertyBeds?: number;
	propertyRooms?: number;
	propertyImages?: string[];
	propertyDesc?: string;
	propertyRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
