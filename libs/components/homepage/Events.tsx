import React from 'react';
import { Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Color } from 'three';
import { FaCheckCircle, FaComments, FaSearchLocation } from 'react-icons/fa';
import { BorderBottom } from '@mui/icons-material';

interface Step {
	title: string;
	description: string;
	icon: React.ReactNode;
}

const steps: Step[] = [
	{
		title: 'Search your ideal home',
		description:
			'Browse verified accommodations for students. Filter by price, location, and facilities to find the perfect match.',
		icon: <FaSearchLocation size={22} />,
	},
	{
		title: 'Chat with the landlord',
		description:
			'Contact property owners directly through our secure messaging system and ask any questions before booking.',
		icon: <FaComments size={22} />,
	},
	{
		title: 'Book safely online',
		description: 'Reserve your accommodation safely online and move into your new home with confidence.',
		icon: <FaCheckCircle size={22} />,
	},
];

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
	return value === index ? (
		<Box sx={{ pt: 2 }}>
			<Typography
				sx={{
					fontSize: 18,
					fontWeight: 700,
					borderBottom: '2px solid #ffb31e',
					width: 'fit-content',
					mb: 1,
				}}
			>
				{steps[index].title}
			</Typography>

			<Typography sx={{ color: '#555', lineHeight: 1.7 }}>{children}</Typography>
		</Box>
	) : null;
}

const Events = () => {
	const device = useDeviceDetect();
	const [value, setValue] = React.useState(0);

	const handleChange = (_: any, newValue: number) => {
		setValue(newValue);
	};

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className="events" sx={{ py: 10 }}>
				<Stack className="container">
					{/* LEFT */}
					<Stack className="left" maxWidth={520} spacing={2}>
						<Typography className="left-title">How FindHouse Works</Typography>

						<Typography className="strong">Find your student home in 3 easy steps</Typography>

						<p>
							FindHouse helps students quickly find safe and verified housing. Discover accommodations, communicate with
							landlords, and secure your next home easily.
						</p>

						{/* TABS */}
						<Tabs
							value={value}
							onChange={handleChange}
							sx={{
								'& .MuiTabs-indicator': {
									backgroundColor: '#ffb31e',
								},
								'& .Mui-selected': {
									color: '#ffb31e', // active tab rangi
								},
							}}
						>
							{steps.map((step, index) => (
								<Tab key={index} icon={step.icon} iconPosition="start" label={`Step ${index + 1}`} />
							))}
						</Tabs>

						{steps.map((step, index) => (
							<TabPanel key={index} value={value} index={index}>
								{step.description}
							</TabPanel>
						))}
					</Stack>

					{/* RIGHT IMAGE */}
					<Stack
						sx={{
							width: 440,
							overflow: 'hidden',
						}}
					>
						<img
							src="/img/banner/community.png"
							alt="student housing"
							style={{ width: '100%', height: 'auto' }}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
