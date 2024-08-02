import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Button, Container, Stack } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Advertisement = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return <Stack className={'advertisement'}></Stack>;
	} else {
		return (
			<Container className={'advertisement'}>
				<motion.div
					variants={fadeIn('right', 0.3)}
					initial="hidden"
					whileInView={'show'}
					viewport={{ once: false, amount: 0.7 }}
					className="left"
				>
					<Stack className="adv-main">
						<p>Accomodation providerds</p>
					</Stack>
					<Stack className="adv-title">
						<strong>Advertise your properties with confidence!</strong>
					</Stack>
					<Stack>
						<p>
							Landlords, letting agents, and private hall managers – advertise your property in minutes and reach
							thousands of students daily. Get unparalleled exposure and attract the ideal tenants for your spaces!
						</p>
					</Stack>
					<Button>
						Advertise your property <EastIcon />
					</Button>
				</motion.div>
				<motion.div
					variants={fadeIn('left', 0.3)}
					initial="hidden"
					whileInView={'show'}
					viewport={{ once: false, amount: 0.7 }}
					className="right"
				>
					<img src="/img/community/advertise.png" alt="/" />
				</motion.div>
			</Container>
		);
	}
};

export default Advertisement;
