import { useState } from 'react';

import { House, Lightbulb, Plug, Zap, Monitor, Heater } from 'lucide-react';

const LINE_COLORS = {
	teal: '#5EEAD4',
	blue: '#60A5FA',
	rose: '#D97786',
	auxA: '#C4B5FD',
	auxB: '#C49A6C'
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

function BreakerCard({ breaker, isEnabled, onToggle }) {
	const Icon = breaker.icon;

	const color = LINE_COLORS[breaker.color];

	return (
		<article
			className='rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 hover:bg-white/4'
			style={{
				borderColor: `${color}33`,
				backgroundColor: `${color}0D`
			}}
		>
			<div className='flex items-start justify-between'>
				<div
					className={`flex h-11 w-11 items-center justify-center rounded-xl`}
					style={{
						backgroundColor: `${color}1A`,
						color
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
						className={`h-2 w-2 rounded-full ${
							isEnabled ? '' : 'bg-slate-600'
						}`}
						style={{
							backgroundColor: isEnabled ? color : undefined
						}}
					/>
					<span className='text-xs font-medium' style={{ color }}>
						{isEnabled ? 'Увімкнена' : 'Вимкнена'}
					</span>
				</div>

				<button
					type='button'
					role='switch'
					aria-checked={isEnabled}
					aria-label={`${breaker.name}: ${isEnabled ? 'выключить' : 'включить'}`}
					onClick={onToggle}
					className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
						isEnabled ? '' : 'bg-slate-700'
					}`}
					style={{
						backgroundColor: isEnabled ? color : undefined
					}}
				>
					<span
						className={`absolute top-1 h-4 w-4 rounded-full bg-slate-950 shadow transition-all ${
							isEnabled ? 'right-1' : 'left-1'
						}`}
					/>
				</button>
			</div>
		</article>
	);
}

function ApartmentMap({ breakerStates }) {
	return (
		<section className='overflow-hidden rounded-2xl border border-white/8 bg-[#0e141e]'>
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
				<div className='relative flex min-h-75 items-center justify-center overflow-hidden rounded-xl border border-white/6 bg-[#0a1019] p-6'>
					<div className='relative overflow-hidden rounded-xl border border-white/6 bg-black'>
						<img
							src='/images/apartment-plan.png'
							alt='Apartment floor plan'
							className='block h-auto w-full select-none'
							draggable='false'
						/>

						{electricalPoints.map(point => {
							const isEnabled = breakerStates[point.breakerId] ?? true;
							const color = LINE_COLORS[point.breakerId];

							return (
								<button
									key={point.id}
									type='button'
									title={point.label}
									aria-label={`${point.label} — ${isEnabled ? 'ON' : 'OFF'}`}
									className='absolute z-10 rounded-full border-2 transition-all duration-300'
									style={{
										left: `${point.x}%`,
										top: `${point.y}%`,
										width: '13px',
										height: '13px',
										transform: 'translate(-50%, -50%)',
										backgroundColor: isEnabled ? color : '#64748b',
										borderColor: isEnabled ? '#ffffff' : '#94a3b8',
										boxShadow: isEnabled
											? `0 0 8px ${color}, 0 0 18px ${color}80`
											: 'none',
										opacity: isEnabled ? 1 : 0.55
									}}
								/>
							);
						})}
					</div>
				</div>

				<div className='mt-4 flex flex-wrap gap-x-5 gap-y-3'>
					{breakers.map(breaker => (
						<div key={breaker.id} className='flex items-center gap-2'>
							<span
								className='h-2.5 w-2.5 shrink-0 rounded-full'
								style={{
									backgroundColor: LINE_COLORS[breaker.color]
								}}
							/>

							<span className='text-xs text-slate-400'>{breaker.name}</span>
						</div>
					))}
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

	const enabledCount = Object.values(breakerStates).filter(Boolean).length;
	const totalCount = breakers.length;

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
					<ApartmentMap breakerStates={breakerStates} />
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
