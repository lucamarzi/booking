import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import {
	faBed,
	faCar,
	faMonument,
	faPerson,
	faPlane,
	faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import './header.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export const Header = () => {
	const [openDate, setOpenDate] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
		room: 1,
	});

	const handleOption = (name, operation) => {
		setOptions((prev) => {
			return {
				...prev,
				[name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
			};
		});
	};

	return (
		<div className='header'>
			<div className='headerContainer'>
				<div className='headerList'>
					<div className='headerListItem active'>
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faPlane} />
						<span>Flight</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faCar} />
						<span>Car rentals</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faMonument} />
						<span>Attractions</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faTaxi} />
						<span>Airport taxis</span>
					</div>
				</div>
				<h1 className='headerTitle'>Una vita di sconti? Solo con Genius.</h1>
				<p className='headerDesc'>
					Viaggiare ti premia: sblocca subito sconti del 10% o più con un
					account gratuito su Booking.com.
				</p>
				<button className='headerBtn'>Accedi / Iscriviti</button>
				<div className='headerSearch'>
					<div className='headerSearchItem'>
						<FontAwesomeIcon icon={faBed} className='headerSearchIcon' />
						<input
							type='text'
							placeholder='Dove vuoi andare?'
							className='headerSearchInput'
						/>
					</div>
					<div className='headerSearchItem'>
						<FontAwesomeIcon
							icon={faCalendarDays}
							className='headerSearchIcon'
						/>
						<span
							onClick={() => setOpenDate(!openDate)}
							className='headerSearchText'>{`${format(
							date[0].startDate,
							'dd/MM/yyyy'
						)} - ${format(date[0].endDate, 'dd/MM/yyyy')}`}</span>
						{openDate && (
							<DateRange
								editableDateInputs={true}
								onChange={(item) => setDate([item.selection])}
								moveRangeOnFirstSelection={false}
								ranges={date}
								className='date'
							/>
						)}
					</div>
					<div className='headerSearchItem'>
						<FontAwesomeIcon icon={faPerson} className='headerSearchIcon' />
						<span
							className='headerSearchText'
							onClick={() => setOpenOptions(!openOptions)}>
							{`${options.adult} adulti - ${options.children} bambini - ${options.room} camere`}
						</span>
						{openOptions && (
							<div className='options'>
								<div className='optionItem'>
									<span className='optionText'>Adulti</span>
									<div className='optionCounter'>
										<button
											disabled={options.adult <= 1}
											className='optionCounterButton'
											onClick={() => handleOption('adult', 'd')}>
											-
										</button>
										<span className='optionCounterNumber'>{options.adult}</span>
										<button
											className='optionCounterButton'
											onClick={() => handleOption('adult', 'i')}>
											+
										</button>
									</div>
								</div>
								<div className='optionItem'>
									<span className='optionText'>Bambini</span>
									<div className='optionCounter'>
										<button
											disabled={options.children <= 0}
											className='optionCounterButton'
											onClick={() => handleOption('children', 'd')}>
											-
										</button>
										<span className='optionCounterNumber'>
											{options.children}
										</span>
										<button
											className='optionCounterButton'
											onClick={() => handleOption('children', 'i')}>
											+
										</button>
									</div>
								</div>
								<div className='optionItem'>
									<span className='optionText'>Camere</span>
									<div className='optionCounter'>
										<button
											disabled={options.room <= 1}
											className='optionCounterButton'
											onClick={() => handleOption('room', 'd')}>
											-
										</button>
										<span className='optionCounterNumber'>{options.room}</span>
										<button
											className='optionCounterButton'
											onClick={() => handleOption('room', 'i')}>
											+
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className='headerSearchItem'>
						<button className='headerBtn'>Cerca</button>
					</div>
				</div>
			</div>
		</div>
	);
};
