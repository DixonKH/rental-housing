import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
	Container,
	Box,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { PropertyLocation, PropertyType } from '../../enums/property.enum';
import { PropertiesInquiry } from '../../types/property/property.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { propertySquare } from '../../config';
import RefreshIcon from '@mui/icons-material/Refresh';
import Menu from '@mui/material/Menu';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import PushPinIcon from '@mui/icons-material/PushPin';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

// const MenuProps = {
// 	PaperProps: {
// 		style: {
// 			maxHeight: '200px',
// 		},
// 	},
// };

interface FilterType {
	searchFilter: PropertiesInquiry;
	setSearchFilter: any;
	initialInput: PropertiesInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [propertyLocation, setPropertyLocation] = useState<PropertyLocation[]>(Object.values(PropertyLocation));
	const [propertyType, setPropertyType] = useState<PropertyType[]>(Object.values(PropertyType));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);
	const theme = useTheme();
	const [personName, setPersonName] = React.useState<string[]>([]);
	const [propType, setPropType] = React.useState<string[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [showModalBeds, setShowModalBeds] = useState(false);

	/** LIFECYCLES **/
	useEffect(() => {
		const queryParams = JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		});

		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.roomsList?.length == 0) {
			delete searchFilter.search.roomsList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.bedsList?.length == 0) {
			delete searchFilter.search.bedsList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};

	const handleChangeType = (event: SelectChangeEvent<typeof propType>) => {
		const {
			target: { value },
		} = event;
		setPropType(typeof value === 'string' ? value.split(',') : value);
	};

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleOpenModalBeds = () => {
		setShowModalBeds(true);
	};

	const handleCloseModalBeds = () => {
		setShowModalBeds(false);
	};

	const PrettoSlider = styled(Slider)({
		color: '#52af77',
		height: 8,
		width: 260,
		margin: '36px 0px 15px 0px',
		'& .MuiSlider-track': {
			border: 'none',
		},
		'& .MuiSlider-thumb': {
			height: 24,
			width: 24,
			backgroundColor: '#fff',
			border: '2px solid currentColor',
			'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
				boxShadow: 'inherit',
			},
			'&::before': {
				display: 'none',
			},
		},
		'& .MuiSlider-valueLabel': {
			lineHeight: 1.2,
			fontSize: 12,
			background: 'unset',
			padding: 0,
			width: 32,
			height: 32,
			borderRadius: '50% 50% 50% 0',
			backgroundColor: '#52af77',
			transformOrigin: 'bottom left',
			transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
			'&::before': { display: 'none' },
			'&.MuiSlider-valueLabelOpen': {
				transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
			},
			'& > *': {
				transform: 'rotate(45deg)',
			},
		},
	});

	const propertyLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyRoomSelectHandler = useCallback(
		async (number: Number) => {
			try {
				let newSearchFilter = { ...searchFilter };

				if (number !== 0) {
					if (searchFilter?.search?.roomsList?.includes(number)) {
						newSearchFilter = {
							...searchFilter,
							search: {
								...searchFilter.search,
								roomsList: searchFilter?.search?.roomsList?.filter((item: Number) => item !== number),
							},
						};
					} else {
						newSearchFilter = {
							...searchFilter,
							search: {
								...searchFilter.search,
								roomsList: [...(searchFilter?.search?.roomsList || []), number],
							},
						};
					}
				} else {
					delete newSearchFilter.search.roomsList;
				}

				setSearchFilter(newSearchFilter);

				await router.push(`/property?input=${JSON.stringify(newSearchFilter)}`, undefined, { scroll: false });

				console.log('propertyRoomSelectHandler:', number);
			} catch (err: any) {
				console.log('ERROR, propertyRoomSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyBedSelectHandler = useCallback(
		async (number: Number) => {
			try {
				let newSearchFilter = { ...searchFilter };

				if (number !== 0) {
					if (searchFilter?.search?.bedsList?.includes(number)) {
						newSearchFilter = {
							...searchFilter,
							search: {
								...searchFilter.search,
								bedsList: searchFilter?.search?.bedsList?.filter((item: Number) => item !== number),
							},
						};
					} else {
						newSearchFilter = {
							...searchFilter,
							search: {
								...searchFilter.search,
								bedsList: [...(searchFilter?.search?.bedsList || []), number],
							},
						};
					}
				} else {
					delete newSearchFilter.search.bedsList;
				}

				setSearchFilter(newSearchFilter);

				await router.push(`/property?input=${JSON.stringify(newSearchFilter)}`, undefined, { scroll: false });

				console.log('propertyBedSelectHandler:', number);
			} catch (err: any) {
				console.log('ERROR, propertyBedSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/property?input=${JSON.stringify(initialInput)}`,
				`/property?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>PROPERTIES FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<motion.div whileTap={{ scale: 0.8 }} className={'find-your-home'}>
					<FormControl className={'property-location'}>
						<img src="/img/icons/location.svg" alt="" />
						<Select
							labelId="demo-multiple-checkbox-label"
							id="demo-multiple-checkbox"
							multiple
							value={personName}
							sx={{
								boxShadow: 'none',
								'.MuiOutlinedInput-notchedOutline': { border: 0 },
								'&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
									border: 0,
								},
								'&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
									border: 0,
								},
								'.MuiSelect-icon': {
									display: 'none',
								},
							}}
							displayEmpty
							onChange={handleChange}
							className="property-checkbox"
							input={<OutlinedInput label="Tag" />}
							renderValue={(selected) => {
								if (selected.length === 0) {
									return <p>Search Location</p>;
								}
								return selected.join(', ');
							}}
							MenuProps={MenuProps}
						>
							<MenuItem disabled value="">
								<em>Select an option</em>
							</MenuItem>
							{propertyLocation.map((location: string) => (
								<MenuItem key={location} value={location} className={'input-box'}>
									<Checkbox
										id={location}
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as PropertyLocation)}
										onChange={propertyLocationSelectHandler}
									/>
									<label style={{ cursor: 'pointer' }}>
										<Typography className="property_type">{location}</Typography>
									</label>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</motion.div>
				<Stack className={'find-your-home'}>
					<Stack className="search-bedroom">
						<Button onClick={handleOpenModalBeds} className="bedroom-title">
							<img src="/img/icons/bedroom.svg" alt="/" /> Search Bedrooms
						</Button>
						<Stack className={`dropdown-modal ${showModalBeds ? 'show' : ''}`}>
							<Stack className="dropdown-content">
								<Button className="close" onClick={handleCloseModalBeds}>
									save
								</Button>
								<strong>You can select from 1 to 5+</strong>
								<Stack>
									<p className={'title'}>Select Rooms:</p>
									<Stack className="button-group">
										<Button
											sx={{
												border: !searchFilter?.search?.roomsList ? '2px solid #6cc2b7' : '1px solid #b9b9b9',
											}}
											onClick={() => propertyRoomSelectHandler(0)}
										>
											Any
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.roomsList?.includes(1)
													? '2px solid #6cc2b7'
													: '1px solid #b9b9b9',
												borderLeft: searchFilter?.search?.roomsList?.includes(1) ? undefined : 'none',
											}}
											onClick={() => propertyRoomSelectHandler(1)}
										>
											1
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.roomsList?.includes(2)
													? '2px solid #6cc2b7'
													: '1px solid #b9b9b9',
												borderLeft: searchFilter?.search?.roomsList?.includes(2) ? undefined : 'none',
											}}
											onClick={() => propertyRoomSelectHandler(2)}
										>
											2
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.roomsList?.includes(3)
													? '2px solid #6cc2b7'
													: '1px solid #b9b9b9',
												borderLeft: searchFilter?.search?.roomsList?.includes(3) ? undefined : 'none',
											}}
											onClick={() => propertyRoomSelectHandler(3)}
										>
											3
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.roomsList?.includes(4)
													? '2px solid #6cc2b7'
													: '1px solid #b9b9b9',
												borderLeft: searchFilter?.search?.roomsList?.includes(4) ? undefined : 'none',
												borderRight: searchFilter?.search?.roomsList?.includes(4) ? undefined : 'none',
											}}
											onClick={() => propertyRoomSelectHandler(4)}
										>
											4
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.roomsList?.includes(5)
													? '2px solid #6cc2b7'
													: '1px solid #b9b9b9',
											}}
											onClick={() => propertyRoomSelectHandler(5)}
										>
											5+
										</Button>
									</Stack>
								</Stack>
								<Stack>
									<p>Select Bedrooms:</p>
									<Stack className="button-group">
										<Button
											sx={{
												border: !searchFilter?.search?.bedsList ? '2px solid #6cc2b7' : '1px solid #b9b9b9',
											}}
											onClick={() => propertyBedSelectHandler(0)}
										>
											Any
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.bedsList?.includes(1) ? '2px solid #6cc2b7' : '1px solid #b9b9b9',
												borderLeft: searchFilter?.search?.bedsList?.includes(1) ? undefined : 'none',
											}}
											onClick={() => propertyBedSelectHandler(1)}
										>
											1
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.bedsList?.includes(2) ? '2px solid #6cc2b7' : '1px solid #b9b9b9',
												borderLeft: searchFilter?.search?.bedsList?.includes(2) ? undefined : 'none',
											}}
											onClick={() => propertyBedSelectHandler(2)}
										>
											2
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.bedsList?.includes(3) ? '2px solid #6cc2b7' : '1px solid #b9b9b9',
												borderLeft: searchFilter?.search?.bedsList?.includes(3) ? undefined : 'none',
											}}
											onClick={() => propertyBedSelectHandler(3)}
										>
											3
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.bedsList?.includes(4) ? '2px solid #6cc2b7' : '1px solid #b9b9b9',
												borderLeft: searchFilter?.search?.bedsList?.includes(4) ? undefined : 'none',
												// borderRight: false ? undefined : 'none',
											}}
											onClick={() => propertyBedSelectHandler(4)}
										>
											4
										</Button>
										<Button
											sx={{
												border: searchFilter?.search?.bedsList?.includes(5) ? '2px solid #6cc2b7' : '1px solid #b9b9b9',
												borderLeft: searchFilter?.search?.bedsList?.includes(5) ? undefined : 'none',
											}}
											onClick={() => propertyBedSelectHandler(5)}
										>
											5+
										</Button>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'}>
					<Button onClick={handleOpenModal} className="price-btn">
						<img src="/img/icons/price.svg" alt="/" />
						Select Price
					</Button>
					<Stack className={`square-year-input dropdown-modal ${showModal ? 'show' : ''}`}>
						<Stack className="dropdown-content">
							<Button className="close" onClick={handleCloseModal}>
								save
							</Button>
							<p className="price-title">The average price is $200 per person/month.</p>
							<Stack>
								<PrettoSlider
									className="pretto-slider"
									valueLabelDisplay="auto"
									aria-label="pretto slider"
									defaultValue={450}
									min={0}
									max={2000}
								/>
							</Stack>
							<Stack className="input-label">
								<p>Min price</p>
								<p>Max price</p>
							</Stack>
							<Stack className="price-input">
								<input
									type="number"
									placeholder="$ min"
									min={0}
									value={searchFilter?.search?.pricesRange?.start ?? 0}
									onChange={(e: any) => {
										if (e.target.value >= 0) {
											propertyPriceHandler(e.target.value, 'start');
										}
									}}
								/>
								<div className="central-divider"></div>
								<input
									type="number"
									placeholder="$ max"
									value={searchFilter?.search?.pricesRange?.end ?? 0}
									onChange={(e: any) => {
										if (e.target.value >= 0) {
											propertyPriceHandler(e.target.value, 'end');
										}
									}}
								/>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
				<motion.div whileTap={{ scale: 0.8 }} className={'find-your-home'}>
					<FormControl>
						<Select
							labelId="demo-multiple-checkbox-label"
							id="demo-multiple-checkbox"
							multiple
							sx={{
								boxShadow: 'none',
								'.MuiOutlinedInput-notchedOutline': { border: 0 },
								'&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
									border: 0,
								},
								'&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
									border: 0,
								},
								'.MuiSelect-icon': {
									display: 'none',
								},
							}}
							displayEmpty
							onChange={handleChangeType}
							className="type-checkbox"
							input={<OutlinedInput label="Tag" />}
							renderValue={(selected) => {
								if (selected.length === 0) {
									return (
										<p>
											<PushPinIcon />
											Types
										</p>
									);
								}
								return (
									<p>
										<PushPinIcon />
										Types
									</p>
								);
							}}
							MenuProps={MenuProps}
							value={propType}
						>
							<MenuItem disabled value="">
								<em>Select an option</em>
							</MenuItem>
							{propertyType.map((type: string) => (
								<MenuItem className={'input-box'} key={type} value={type}>
									<Checkbox
										id={type}
										className="property-checkbox"
										color="default"
										size="small"
										value={type}
										onChange={propertyTypeSelectHandler}
										checked={(searchFilter?.search?.typeList || []).includes(type as PropertyType)}
									/>
									<label style={{ cursor: 'pointer' }}>
										<Typography className="property_type">{type}</Typography>
									</label>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</motion.div>
				<Stack className={'find-your-home'}>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<SearchIcon className="search-icon" />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				{/* <Stack className={'find-your-home'}>
					<Typography className={'title'}>Square meter</Typography>
					<Stack className="square-year-input">
						<FormControl>
							<InputLabel id="demo-simple-select-label">Min</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.squaresRange?.start ?? 0}
								label="Min"
								onChange={(e: any) => propertySquareHandler(e, 'start')}
								MenuProps={MenuProps}
							>
								{propertySquare.map((square: number) => (
									<MenuItem
										value={square}
										disabled={(searchFilter?.search?.squaresRange?.end || 0) < square}
										key={square}
									>
										{square}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Max</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.squaresRange?.end ?? 500}
								label="Max"
								onChange={(e: any) => propertySquareHandler(e, 'end')}
								MenuProps={MenuProps}
							>
								{propertySquare.map((square: number) => (
									<MenuItem
										value={square}
										disabled={(searchFilter?.search?.squaresRange?.start || 0) > square}
										key={square}
									>
										{square}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack> */}
			</Stack>
		);
	}
};

export default Filter;
