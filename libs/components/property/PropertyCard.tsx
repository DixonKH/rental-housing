import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import classes from '../../../scss/Carusel.module.css';
import { motion } from 'framer-motion';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const PropertyCard = (props: PropertyCardType) => {
	const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);

	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Carousel
						withIndicators
						height={240}
						classNames={{
							root: classes.carousel,
							controls: classes.carouselControls,
							indicator: classes.carouselIndicator,
						}}
					>
						{property.propertyImages.map((image, index) => {
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
					{property && property?.propertyRank > topPropertyRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<IconButton className="like-btn" color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
						{myFavorites ? (
							<FavoriteIcon color="primary" />
						) : property?.meLiked && property?.meLiked[0]?.myFavorite ? (
							<FavoriteIcon color="primary" />
						) : (
							<FavoriteBorderIcon />
						)}
					</IconButton>
					<Box component={'div'} className={'property-type'}>
						<Typography>{property?.propertyType}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/property/detail',
									query: { id: property?._id },
								}}
							>
								<Typography>{property.propertyTitle}</Typography>
							</Link>
							<Box className="price">${formatterStr(property.propertyPrice)}</Box>
						</Stack>
						<Stack className="address">
							<Typography>
								<img src="/img/icons/location.svg" />
								{property.propertyAddress}, {property.propertyLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography>
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							{property.propertyStatus === 'ACTIVE' ? (
								<Stack className="aviable-option">
									<div></div>
									<p>Aviable now</p>
								</Stack>
							) : (
								<Stack className="disable-option">
									<div></div>
									<p>not Aviable</p>
								</Stack>
							)}
						</Stack>
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{property?.propertyViews}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default PropertyCard;
