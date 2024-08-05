import React from 'react';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Color } from 'three';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Stack sx={{ p: 3 }}>{children}</Stack>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export function BasicTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Stack
			sx={{
				width: '100%',
				height: '250px',
				marginTop: '15px',
				borderRadius: '10px',
				boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
			}}
		>
			<Box component={'div'} sx={{ border: 'none' }}>
				<Tabs value={value} onChange={handleChange}>
					<Tab label="1" {...a11yProps(0)} style={{ color: '#fff' }} />
					<Tab label="2" {...a11yProps(1)} />
					<Tab label="3" {...a11yProps(2)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<p style={{ fontSize: '18px', color: '#2097b0', fontWeight: '700', marginBottom: '7px', marginTop: '-2px' }}>
					Specify your rental terms
				</p>
				At Studapart, we are looking for the perfect match : landlords and tenants exchange information based on the
				criteria entered on the platform (entry date, rental duration, rental file). 100% of our ads are verified : we
				select offers that are made just for you. Here, it's all tailor-made!
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<p style={{ fontSize: '18px', color: '#2097b0', fontWeight: '700', marginBottom: '7px', marginTop: '-2px' }}>
					Interact with the lessor
				</p>
				Got a crush? Express your interest to the lessor via our instant messenger. Complete your rental file online and
				chat with trusted owners who are committed to getting back to you within 48 hours. You're then free to visit the
				property.
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				<p style={{ fontSize: '18px', color: '#2097b0', fontWeight: '700', marginBottom: '7px', marginTop: '-7px' }}>
					Book and pay online
				</p>
				Complete booking of your accommodation by making payment on the platform in total safety (1st month of rent,
				services charges, Studapart Guarantee if requested by the lessor). Online booking covers you against unexpected
				events (fraud, last-minute cancellations, non-compliant accommodation, non-compliance with rental rules, etc.).
				We will find you a new home if an unexpected event prevents the accommodation from being available.
			</CustomTabPanel>
		</Stack>
	);
}

const Events = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className="container">
					<Stack className="left">
						<Stack className="left-title">How to rent your accommodation with Studapart?</Stack>
						<strong>3 steps to rent your home!</strong>
						<p>
							Whether you're on your own or a company, a student or a worker, already living in France or planning to
							move therre, your future home is on our platform. For a few months or a few years, it's up to you!
						</p>
						<BasicTabs />
					</Stack>
					<Stack>
						<img src="/img/profile/main.png" alt="" />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
