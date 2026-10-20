import { useState } from 'react';

import { House, Lightbulb, Plug, Zap, Monitor, Heater } from 'lucide-react';

const LINE_COLORS = {
	teal: '#5EEAD4',
	blue: '#60A5FA',
	rose: '#D97786',
	auxA: '#C4B5FD',
	auxB: '#C49A6C'
};

const THEME = {
	page: '#090d14',
	cardOff: '#0e141e',
	cardBorderOff: '#334155',
	mapSection: '#0e141e',
	mapCanvas: '#0a1019',

	iconOff: '#1e293b',
	muted: '#64748b',
	statusOff: '#475569',

	switchOff: '#334155',
	switchKnobOff: '#94a3b8',
	switchKnobOn: '#020617',

	lightingOverlay: '#090d14',
	lightingOverlayOpacity: 0.65
};

const breakers = [
	// Line 1 — розетки и свет
	{
		id: 'teal',
		number: '01',
		name: 'Лінія 1',
		color: 'teal',
		description: 'Розетка та освітлення',
		icon: Lightbulb,
		status: 'ON'
	},

	// Line 2 — розетки
	{
		id: 'blue',
		number: '02',
		name: 'Лінія 2',
		color: 'blue',
		description: '10 розеток',
		icon: Plug,
		status: 'ON'
	},

	// Line 3 — розетки
	{
		id: 'rose',
		number: '03',
		name: 'Лінія 3',
		color: 'rose',
		description: '2 розетки',
		icon: Plug,
		status: 'ON'
	},

	// Auxiliary A — комп'ютер
	{
		id: 'auxA',
		number: '04',
		name: 'Додаткова лінія A',
		color: 'auxA',
		description: 'Комп’ютер · 2 розетки',
		icon: Monitor,
		status: 'ON'
	},

	// Auxiliary B — комп'ютер
	{
		id: 'auxB',
		number: '05',
		name: 'Додаткова лінія B',
		color: 'auxB',
		description: 'Бойлер · 1 розетка',
		icon: Heater,
		status: 'ON'
	}
];

const electricalPoints = [
	// Line 1 — lighting + 1 socket
	{
		id: 'line-1-socket-01',
		label: 'Socket 01',
		breakerId: 'teal',
		x: 53.5,
		y: 18.8
	},

	// Line 2 — 10 sockets
	{
		id: 'line-2-socket-01',
		label: 'Socket 01',
		breakerId: 'blue',
		x: 20.2,
		y: 4.6
	},
	{
		id: 'line-2-socket-02',
		label: 'Socket 02',
		breakerId: 'blue',
		x: 66.6,
		y: 9.0
	},
	{
		id: 'line-2-socket-03',
		label: 'Socket 03',
		breakerId: 'blue',
		x: 91.1,
		y: 4.6
	},
	{
		id: 'line-2-socket-04',
		label: 'Socket 04',
		breakerId: 'blue',
		x: 17.7,
		y: 26.4
	},
	{
		id: 'line-2-socket-05',
		label: 'Socket 05',
		breakerId: 'blue',
		x: 36.3,
		y: 29.9
	},
	{
		id: 'line-2-socket-06',
		label: 'Socket 06',
		breakerId: 'blue',
		x: 20.9,
		y: 36.1
	},
	{
		id: 'line-2-socket-07',
		label: 'Socket 07',
		breakerId: 'blue',
		x: 70.1,
		y: 34.4
	},
	{
		id: 'line-2-socket-08',
		label: 'Socket 08',
		breakerId: 'blue',
		x: 91.1,
		y: 34.4
	},
	{
		id: 'line-2-socket-09',
		label: 'Socket 09',
		breakerId: 'blue',
		x: 29.6,
		y: 68.0
	},
	{
		id: 'line-2-socket-10',
		label: 'Socket 10',
		breakerId: 'blue',
		x: 42.0,
		y: 68.0
	},

	// Line 3 — 2 sockets

	{
		id: 'line-3-socket-02',
		label: 'Socket 02',
		breakerId: 'rose',
		x: 43.6,
		y: 84.5
	},
	{
		id: 'line-3-socket-01',
		label: 'Socket 01',
		breakerId: 'rose',
		x: 24.2,
		y: 90.0
	},

	// Auxiliary Line A — 2 sockets
	{
		id: 'aux-a-socket-01',
		label: 'Auxiliary A · Socket 01',
		breakerId: 'auxA',
		x: 42.3,
		y: 64.9
	},
	{
		id: 'aux-a-socket-02',
		label: 'Auxiliary A · Socket 02',
		breakerId: 'auxA',
		x: 9.8,
		y: 64.9
	},

	// Auxiliary Line B — 1 socket
	{
		id: 'aux-b-socket-01',
		label: 'Auxiliary B · Socket 01',
		breakerId: 'auxB',
		x: 60.5,
		y: 18.9
	}
];

function Header({ enabledCount, totalCount }) {
	const allEnabled = enabledCount === totalCount;

	return (
		<header className='flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-6'>
			<div className='flex items-center gap-3'>
				<div className='flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10'>
					<Zap size={23} className='text-cyan-300' />
				</div>

				<div>
					<h1 className='text-xl font-bold tracking-[0.16em] text-white'>
						HOME POWER
					</h1>
					<p className='mt-1 text-[10px] tracking-[0.2em] text-slate-500'>
						APARTMENT CONTROL SYSTEM
					</p>
				</div>
			</div>

			<div
				className={`flex items-center gap-2 rounded-full border px-3 py-2 ${
					allEnabled
						? 'border-cyan-400/20 bg-cyan-400/10'
						: 'border-amber-400/20 bg-amber-400/10'
				}`}
			>
				<span
					className={`h-2 w-2 rounded-full ${
						allEnabled ? 'bg-cyan-400' : 'bg-amber-400'
					}`}
				/>
				<span
					className={`text-xs font-medium ${
						allEnabled ? 'text-cyan-300' : 'text-amber-300'
					}`}
				>
					{enabledCount} / {totalCount} ЛІНІЇ ПІДКЛЮЧЕНІ
				</span>
			</div>
		</header>
	);
}

function BreakerCard({ breaker, isEnabled, onToggle, isSelected }) {
	const Icon = breaker.icon;
	const color = LINE_COLORS[breaker.color];

	return (
		<article
			className='rounded-2xl border p-5 transition duration-200 hover:-translate-y-1'
			style={{
				borderColor: isSelected
					? LINE_COLORS[breaker.color]
					: isEnabled
						? `${LINE_COLORS[breaker.color]}33`
						: THEME.cardBorderOff,
				backgroundColor: isEnabled
					? `${LINE_COLORS[breaker.color]}0D`
					: THEME.cardOff,
				boxShadow: isSelected
					? `0 0 0 1px ${LINE_COLORS[breaker.color]}66, 0 0 20px ${LINE_COLORS[breaker.color]}18`
					: 'none'
			}}
		>
			<div className='flex items-start justify-between'>
				<div
					className='flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300'
					style={{
						backgroundColor: isEnabled ? `${color}1A` : THEME.iconOff,
						color: isEnabled ? color : THEME.muted
					}}
				>
					<Icon size={22} />
				</div>

				<span className='font-mono text-xs text-slate-600'>
					CH-{breaker.number}
				</span>
			</div>

			<h2 className='mt-5 text-lg font-semibold text-white'>{breaker.name}</h2>

			<p className='mt-1 min-h-5 text-sm text-slate-400'>
				{breaker.description}
			</p>

			<div className='mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4'>
				<div className='flex items-center gap-2'>
					<span
						className='h-2 w-2 rounded-full transition-all duration-300'
						style={{
							backgroundColor: isEnabled ? color : THEME.statusOff,
							boxShadow: isEnabled ? `0 0 8px ${color}80` : 'none'
						}}
					/>

					<span
						className='text-xs font-medium transition-colors duration-300'
						style={{ color: isEnabled ? color : THEME.muted }}
					>
						{isEnabled ? 'Увімкнена' : 'Вимкнена'}
					</span>
				</div>

				<button
					type='button'
					role='switch'
					aria-checked={isEnabled}
					aria-label={`${breaker.name}: ${isEnabled ? 'вимкнути' : 'увімкнути'}`}
					onClick={onToggle}
					className='relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
					style={{
						backgroundColor: isEnabled ? color : THEME.switchOff
					}}
				>
					<span
						className={`absolute top-1 h-4 w-4 rounded-full shadow transition-all duration-300 ${
							isEnabled ? 'right-1' : 'left-1'
						}`}
						style={{
							backgroundColor: isEnabled
								? THEME.switchKnobOn
								: THEME.switchKnobOff
						}}
					/>
				</button>
			</div>
		</article>
	);
}

function ApartmentMap({ breakerStates, selectedBreakerId, onSelectBreaker }) {
	return (
		<section
			className='overflow-hidden rounded-2xl border border-white/8'
			style={{ backgroundColor: THEME.mapSection }}
		>
			<div className='flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4'>
				<div className='flex items-center gap-3'>
					<House size={18} className='text-slate-400' />
					<div>
						<h2 className='font-semibold text-white'>Схема квартири</h2>
						<p className='mt-1 text-xs text-slate-500'>
							План електропостачання
						</p>
					</div>
				</div>

				<span className='rounded-lg border border-white/8 px-3 py-1.5 text-xs text-slate-400'>
					PLAN VIEW
				</span>
			</div>

			<div className='p-4 sm:p-6'>
				<div className='relative flex min-h-75 items-center justify-center rounded-xl border border-white/6 bg-[#0a1019] p-6'>
					<div
						className='relative rounded-xl border border-white/6 bg-black'
						style={{ backgroundColor: THEME.mapCanvas }}
						onClick={() => onSelectBreaker(null)}
					>
						<img
							src='/images/apartment-plan-mini.png'
							alt='Apartment floor plan'
							className='block h-auto w-full select-none rounded-xl'
							draggable='false'
						/>
						<div
							className='pointer-events-none absolute inset-0 z-0 transition-opacity duration-500'
							style={{
								backgroundColor: THEME.lightingOverlay,
								opacity: breakerStates.teal ? 0 : THEME.lightingOverlayOpacity
							}}
							aria-hidden='true'
						/>

						{electricalPoints.map(point => {
							const isEnabled = breakerStates[point.breakerId] ?? true;
							const color = LINE_COLORS[point.breakerId];
							const breaker = breakers.find(
								item => item.id === point.breakerId
							);

							const isSelected = selectedBreakerId === point.breakerId;

							return (
								<button
									key={point.id}
									type='button'
									title={`${breaker.name} · ${isEnabled ? 'Увімкнена' : 'Вимкнена'}`}
									aria-label={`${breaker.name} · ${isEnabled ? 'Увімкнена' : 'Вимкнена'}`}
									aria-pressed={isSelected}
									onClick={event => {
										event.stopPropagation();
										onSelectBreaker(point.breakerId);
									}}
									className={`group absolute z-10 h-2.5 w-2.5 rounded-full border-2 transition-[width,height,scale,box-shadow] duration-200 hover:z-30 focus-visible:z-30 sm:h-4 sm:w-4 ${
										isSelected ? 'z-20 scale-125' : ''
									}`}
									style={{
										left: `${point.x}%`,
										top: `${point.y}%`,
										translate: '-50% -50%',
										backgroundColor: isEnabled ? color : THEME.muted,
										borderColor: isEnabled ? color : THEME.switchKnobOff,
										boxShadow: isEnabled
											? `0 0 8px ${color}, 0 0 18px ${color}80`
											: 'none',
										opacity: isEnabled ? 1 : 0.55,
										outline: isSelected ? `2px solid ${color}` : 'none',
										outlineOffset: '3px'
									}}
								>
									<span className='pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-max max-w-48 -translate-x-1/2 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-left text-xs text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100'>
										<span className='block font-medium'>{breaker.name}</span>

										<span
											className='mt-1 block'
											style={{ color: isEnabled ? color : THEME.switchKnobOff }}
										>
											{isEnabled ? 'Увімкнена' : 'Вимкнена'}
										</span>
									</span>
								</button>
							);
						})}
					</div>
				</div>

				<div className='mt-4 flex flex-wrap gap-x-5 gap-y-3'>
					{breakers.map(breaker => {
						const color = LINE_COLORS[breaker.color];
						const isSelected = selectedBreakerId === breaker.id;
						const isEnabled = breakerStates[breaker.id];

						return (
							<button
								key={breaker.id}
								type='button'
								onClick={() => onSelectBreaker(breaker.id)}
								aria-pressed={isSelected}
								className='flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60'
								style={{
									backgroundColor: isSelected ? `${color}18` : 'transparent',
									opacity: isEnabled ? 1 : 0.55,
									outline: isSelected ? `1px solid ${color}66` : 'none'
								}}
							>
								<span
									className='h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-200'
									style={{
										backgroundColor: isEnabled ? color : THEME.muted,
										boxShadow:
											isSelected && isEnabled ? `0 0 8px ${color}` : 'none'
									}}
								/>

								<span
									className='text-xs transition-colors duration-200'
									style={{ color: isSelected ? color : THEME.switchKnobOff }}
								>
									{breaker.name}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function App() {
	const [breakerStates, setBreakerStates] = useState({
		teal: true,
		blue: true,
		rose: true,
		auxA: true,
		auxB: true
	});

	const [selectedBreakerId, setSelectedBreakerId] = useState(null);

	const enabledCount = Object.values(breakerStates).filter(Boolean).length;
	const totalCount = breakers.length;

	const handleSelectBreaker = id => {
		setSelectedBreakerId(prev => (prev === id ? null : id));
	};

	return (
		<main className='min-h-screen bg-[#090d14] px-4 py-6 text-slate-100 sm:px-6 sm:py-9 lg:px-10'>
			<div className='mx-auto max-w-7xl'>
				<Header enabledCount={enabledCount} totalCount={totalCount} />

				<section className='mt-8'>
					<div className='mb-5'>
						<p className='text-xs font-medium uppercase tracking-[0.2em] text-cyan-400'>
							Control center
						</p>

						<h2 className='mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
							Управління електрикою
						</h2>

						<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-400'>
							Контролюй лінії електропостачання та дивись, які точки відносяться
							до кожного рубильника.
						</p>
					</div>

					<div className='grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3'>
						{breakers.map(breaker => (
							<BreakerCard
								key={breaker.id}
								breaker={breaker}
								isEnabled={breakerStates[breaker.id]}
								isSelected={selectedBreakerId === breaker.id}
								onToggle={() => {
									setBreakerStates(prev => ({
										...prev,
										[breaker.id]: !prev[breaker.id]
									}));
								}}
							/>
						))}
					</div>
				</section>

				<section className='mt-8'>
					<ApartmentMap
						breakerStates={breakerStates}
						selectedBreakerId={selectedBreakerId}
						onSelectBreaker={handleSelectBreaker}
					/>
				</section>

				<footer className='mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-white/6 pt-5 text-xs text-slate-600'>
					<span>HOME POWER © 2026</span>
					<span>Apartment electrical map · v0.1</span>
				</footer>
			</div>
		</main>
	);
}

export default App;
