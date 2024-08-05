import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import classes from '../../../scss/Carusel.module.css';
import Link from 'next/link';

interface PropertyBigCardProps {
	property: Property;
	likePropertyHandler: any;
}

const PropertyBigCard = (props: PropertyBigCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	if (device === 'mobile') {
		return <div>APARTMEND BIG CARD</div>;
	} else {
		return (
			<Stack className="property-big-card-box">
				<Stack>
					<Carousel
						withIndicators
						height={250}
						classNames={{
							root: classes.carousel,
							controls: classes.carouselControls,
							indicator: classes.carouselIndicator,
						}}
						className="carousel"
					>
						{property?.propertyImages.map((image, index) => {
							const imagePath = `${REACT_APP_API_URL}/${image}`;
							return (
								<Carousel.Slide key={index}>
									<Link
										href={{
											pathname: '/property/detail',
											query: { id: property?._id },
										}}
									>
										<img src={imagePath} alt={property?.propertyTitle} />
									</Link>
								</Carousel.Slide>
							);
						})}
					</Carousel>
				</Stack>
				<Box component={'div'} className="property-type">
					{property.propertyType}
				</Box>
				<IconButton color={'default'} className="like-btn" onClick={() => likePropertyHandler(user, property?._id)}>
					{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
						<FavoriteIcon color="primary" style={{ color: 'red' }} />
					) : (
						<FavoriteIcon />
					)}
				</IconButton>
				<Box component={'div'} className={'card-img'}>
					{property && property?.propertyRank >= topPropertyRank && (
						<div className={'status'}>
							<img src="/img/icons/electricity.png" alt="" />
							<span>top</span>
						</div>
					)}
				</Box>
				<Box component={'div'} className={'info'}>
					<Stack className={'title'}>
						<strong>{property?.propertyTitle}</strong>
						<div className={'price'}>${formatterStr(property?.propertyPrice)}/mo</div>
					</Stack>
					<p className={'desc'}>{property?.propertyAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property?.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{property?.propertyRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{property?.propertySquare} m2</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<div>{property?.propertyRent ? <p>Rent</p> : <span>Rent</span>}</div>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PropertyBigCard;
