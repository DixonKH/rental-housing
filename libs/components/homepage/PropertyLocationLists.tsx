import { Container, Stack } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { PropertyLocation } from '../../enums/property.enum';
import { PropertiesInquiry } from '../../types/property/property.input';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

interface HeaderFilterProps {
	initialInput: PropertiesInquiry;
}

const PropertyLocationLists = (props: HeaderFilterProps) => {
	const { initialInput } = props;
	const locationRef: any = useRef();
	const [openLocation, setOpenLocation] = useState(false);
	const [openType, setOpenType] = useState(false);
	const [searchFilter, setSearchFilter] = useState<PropertiesInquiry>(initialInput);
	const [propertyLocation, setPropertyLocation] = useState<PropertyLocation[]>(Object.values(PropertyLocation));
	/** HANDLER */

	const typeStateChangeHandler = () => {
		setOpenType((prev) => !prev);
		setOpenLocation(false);
	};

	const propertyLocationSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						locationList: [value],
					},
				});
				typeStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, propertyLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);
	return (
		<Container className={'location-list'}>
			<Stack className="location-title">
				<strong>Explore popular student cities</strong>
			</Stack>
			<motion.div
				variants={fadeIn('up', 0.3)}
				initial="hidden"
				whileInView={'show'}
				viewport={{ once: false, amount: 0.7 }}
				className="locations"
			>
				<div className={`location-cards ${openLocation ? 'on' : ''}`} ref={locationRef}>
					{propertyLocation.map((location: string) => {
						return (
							<Link href={{ pathname: '/property' }}>
								<div onClick={() => propertyLocationSelectHandler(location)} key={location}>
									<img src={`img/banner/cities/${location}.webp`} alt="" />
									<span>{location}</span>
								</div>
							</Link>
						);
					})}
				</div>
			</motion.div>
		</Container>
	);
};
PropertyLocationLists.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {},
	},
};

export default PropertyLocationLists;
