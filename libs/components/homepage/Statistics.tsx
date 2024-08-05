import { Box, Container, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ForumIcon from '@mui/icons-material/Forum';
import GppGoodIcon from '@mui/icons-material/GppGood';

const Statistics = () => {
	return (
		<Stack className={'statistic'}>
			<Container className="stat-container">
				<Stack className="stat-div">
					<Box component={'div'}>
						<img src="/img/logo/star.svg" alt="" />
					</Box>
					<Stack className="stat-info">
						<strong>Trusted by 1m+ students</strong>
						<p>Every year, we help over a million students find their ideal place</p>
					</Stack>
				</Stack>
				<Stack className="stat-div">
					<Box component={'div'}>
						<img src="/img/logo/home.svg" alt="" />
					</Box>
					<Stack className="stat-info">
						<strong>Trusted by 1m+ students</strong>
						<p>Every year, we help over a million students find their ideal place</p>
					</Stack>
				</Stack>
				<Stack className="stat-div">
					<Box component={'div'}>
						<img src="/img/logo/message.svg" alt="" />
					</Box>
					<Stack className="stat-info">
						<strong>Trusted by 1m+ students</strong>
						<p>Every year, we help over a million students find their ideal place</p>
					</Stack>
				</Stack>
				<Stack className="stat-div">
					<Box component={'div'}>
						<img src="/img/logo/security.svg" alt="" />
					</Box>
					<Stack className="stat-info">
						<strong>Trusted by 1m+ students</strong>
						<p>Every year, we help over a million students find their ideal place</p>
					</Stack>
				</Stack>
			</Container>
		</Stack>
	);
};

export default Statistics;
