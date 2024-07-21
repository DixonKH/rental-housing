import {
	PropertyAmenities,
	PropertyLocation,
	PropertyStatus,
	PropertyType,
	PropertyUtilityBills,
} from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface PropertyInput {
	propertyType: PropertyType;
	propertyLocation: PropertyLocation;
	propertyAmenities: PropertyAmenities[];
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyDeposite: number;
	propertyUtilityBills: PropertyUtilityBills[];
	propertySquare: number;
	propertyBeds: number;
	propertyRooms: number;
	propertyImages: string[];
	propertyDesc?: string;
	propertyRent?: boolean;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	locationList?: PropertyLocation[];
	typeList?: PropertyType[];
	roomsList?: Number[];
	options?: string[];
	bedsList?: Number[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	squaresRange?: Range;
	text?: string;
}

export interface PropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	propertyStatus?: PropertyStatus;
}

export interface AgentPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	propertyStatus?: PropertyStatus;
	propertyLocationList?: PropertyLocation[];
}

export interface AllPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
