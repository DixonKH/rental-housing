import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { formatterStr } from '../../utils';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import classes from '../../../scss/Carusel.module.css';
import Link from 'next/link';
import { Image } from '@mantine/core';

interface TrendPropertyCardProps {
	property: Property;
	likePropertyHandler: any;
}

const TrendPropertyCard = (props: TrendPropertyCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="trend-card-box" key={property._id}>
				<Box component={'div'} className={'card-img'}>
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
					{/* <div>${property.propertyPrice}</div> */}
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{property.propertyTitle}</strong>
					<p className={'desc'}>{property.propertyAddress ?? 'no address'}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{property.propertyRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{property.propertySquare} m2</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>
							{property.propertyRent ? 'Rent' : ''} {property.propertyRent && '/'}{' '}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="trend-card-box" key={property._id}>
				<Carousel
					withIndicators
					height={203}
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
				<Box className="property-type">{property.propertyType}</Box>
				<IconButton color={'default'} className="like-btn" onClick={() => likePropertyHandler(user, property?._id)}>
					{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
						<FavoriteIcon color="primary" style={{ color: 'red' }} />
					) : (
						<FavoriteIcon />
					)}
				</IconButton>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>
						{property.propertyTitle}
						<p>${formatterStr(property.propertyPrice)}</p>
					</strong>
					<p className={'desc'}>{property.propertyAddress ?? 'no address'}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{property.propertyRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{property.propertySquare} m2</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '5px' }} />
					<div className={'bott'}>
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
						<div className="view-like-box">
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

export default TrendPropertyCard;
