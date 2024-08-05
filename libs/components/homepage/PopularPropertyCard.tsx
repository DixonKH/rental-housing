import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import classes from '../../../scss/Carusel.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

interface PopularPropertyCardProps {
	property: Property;
}

const PopularPropertyCard = (props: PopularPropertyCardProps) => {
	const { property } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (propertyId: string) => {
		console.log('ID: ', propertyId);
		await router.push({
			pathname: '/property/detail',
			query: { id: propertyId },
		});
	};

	if (device === 'mobile') {
		return (
			<motion.div
				variants={fadeIn('left', 0.5)}
				initial="hidden"
				whileInView={'show'}
				viewport={{ once: false, amount: 0.2 }}
				className="popular-card-box"
			>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => pushDetailHandler(property._id)}
				>
					{property && property?.propertyRank >= topPropertyRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}

					<div className={'price'}>${property.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(property._id)}>
						{property.propertyTitle}
					</strong>
					<p className={'desc'}>{property.propertyAddress}</p>
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
						<p>{property?.propertyRent ? 'rent' : 'sale'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
						</div>
					</div>
				</Box>
			</motion.div>
		);
	} else {
		return (
			<motion.div
				variants={fadeIn('left', 0.3)}
				initial="hidden"
				whileInView={'show'}
				viewport={{ once: false, amount: 0.7 }}
				className="popular-card-box"
			>
				<Stack>
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
				</Stack>
				<Box component={'div'} className="property-type">
					{property.propertyType}
				</Box>
				<Box component={'div'} className={'info'}>
					<Box className={'title'}>
						<strong onClick={() => pushDetailHandler(property._id)}>{property.propertyTitle}</strong>
						<p>${property.propertyPrice}</p>
					</Box>
					<p className={'desc'}>{property.propertyAddress}</p>
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
						<p>{property?.propertyRent ? 'rent' : 'sale'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
						</div>
					</div>
				</Box>
			</motion.div>
		);
	}
};

export default PopularPropertyCard;
