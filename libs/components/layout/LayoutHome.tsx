import React, { useEffect } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import HeaderFilter from '../homepage/HeaderFilter';
import { userVar } from '../../../apollo/store';
import { useReactiveVar } from '@apollo/client';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Opacity } from '@mui/icons-material';

const fadeUp = (delay: number) => {
	return {
		hidden: {
			opacity: 0,
			y: 100,
			scale: 0.5,
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				delay: delay,
				ease: 'easeInOut',
			},
		},
		exit: {
			opacity: 0,
			y: 50,
			transition: {
				duration: 0.2,
				ease: 'easeInOut',
			},
		},
	};
};

const withLayoutMain = (Component: any) => {
	return (props: any) => {
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Rental-Housing</title>
						<meta name={'title'} content={`Nestar`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>Rental-Housing</title>
						<meta name={'title'} content={`Nestar`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack className={'header-main'}>
							<div className="header-img-cover"></div>
							<AnimatePresence mode="wait">
								<motion.div variants={fadeUp(0.2)} initial="hidden" animate="show" exit="exit" className={'container'}>
									<HeaderFilter />
								</motion.div>
							</AnimatePresence>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						{<Chat />}

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutMain;
