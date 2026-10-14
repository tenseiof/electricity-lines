import { useState } from 'react';

import {
	// Activity,
	// ArrowUpRight,
	House,
	Lightbulb,
	Plug,
	// Settings2,
	Zap
} from 'lucide-react';

const breakers = [
	{
		id: 'green',
		number: '01',
		name: 'Линия 1',
		color: 'green',
		description: 'Розетка и освещение',
		icon: Lightbulb,
		status: 'Включена'
	},
	{
		id: 'cyan',
		number: '02',
		name: 'Линия 2',
		color: 'cyan',
		description: 'Розетки',
		icon: Plug,
		status: 'Включена'
	},
	{
		id: 'yellow',
		number: '03',
		name: 'Линия 3',
		color: 'yellow',
		description: '2 розетки',
		icon: Zap,
		status: 'Включена'
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
						? 'border-emerald-400/20 bg-emerald-400/[0.07]'
						: 'border-amber-400/20 bg-amber-400/[0.07]'
				}`}
			>
				<span
					className={`h-2 w-2 rounded-full ${
						allEnabled ? 'bg-emerald-400' : 'bg-amber-400'
					}`}
				/>
				<span
					className={`text-xs font-medium ${
						allEnabled ? 'text-emerald-300' : 'text-amber-300'
					}`}
				>
					{enabledCount} / {totalCount} ЛИНИИ ВКЛЮЧЕНЫ
				</span>
			</div>
		</header>
	);
}

function BreakerCard({ breaker, isEnabled, onToggle }) {
	const Icon = breaker.icon;

	const colors = {
		green: {
			border: 'border-emerald-400/20',
			background: 'bg-emerald-400/[0.05]',
			icon: 'bg-emerald-400/10 text-emerald-300',
			dot: 'bg-emerald-400',
			text: 'text-emerald-300',
			toggle: 'bg-emerald-400'
		},
		cyan: {
			border: 'border-cyan-400/20',
			background: 'bg-cyan-400/[0.05]',
			icon: 'bg-cyan-400/10 text-cyan-300',
			dot: 'bg-cyan-400',
			text: 'text-cyan-300',
			toggle: 'bg-cyan-400'
		},
		yellow: {
			border: 'border-amber-400/20',
			background: 'bg-amber-400/[0.05]',
			icon: 'bg-amber-400/10 text-amber-300',
			dot: 'bg-amber-400',
			text: 'text-amber-300',
			toggle: 'bg-amber-400'
		}
	};

	const style = colors[breaker.color];

	return (
		<article
			className={`rounded-2xl border ${style.border} ${style.background} p-5 transition duration-200 hover:-translate-y-1 hover:bg-white/4`}
		>
			<div className='flex items-start justify-between'>
				<div
					className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.icon}`}
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
							isEnabled ? style.dot : 'bg-slate-600'
						}`}
					/>
					<span className={`text-xs font-medium ${style.text}`}>
						{isEnabled ? 'Включена' : 'Отключена'}
					</span>
				</div>

				<button
					type='button'
					role='switch'
					aria-checked={isEnabled}
					aria-label={`${breaker.name}: ${isEnabled ? 'выключить' : 'включить'}`}
					onClick={onToggle}
					className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
						isEnabled ? style.toggle : 'bg-slate-700'
					}`}
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

function ApartmentMap() {
	return (
		<section className='overflow-hidden rounded-2xl border border-white/8 bg-[#0e141e]'>
			<div className='flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4'>
				<div className='flex items-center gap-3'>
					<House size={18} className='text-slate-400' />
					<div>
						<h2 className='font-semibold text-white'>Схема квартиры</h2>
						<p className='mt-1 text-xs text-slate-500'>План электроснабжения</p>
					</div>
				</div>

				<span className='rounded-lg border border-white/8 px-3 py-1.5 text-xs text-slate-400'>
					PLAN VIEW
				</span>
			</div>

			<div className='p-4 sm:p-6'>
				<div className='relative flex min-h-75 items-center justify-center overflow-hidden rounded-xl border border-white/6 bg-[#0a1019] p-6'>
					<div className='overflow-hidden rounded-xl border border-white/6 bg-black'>
						<img
							src='/public/images/apartment-plan.png'
							alt='Apartment floor plan / План квартири'
							className='block h-auto w-full select-none bg-[#0a1019]'
							draggable='false'
						/>
					</div>
				</div>

				<div className='mt-4 flex flex-wrap gap-x-5 gap-y-3'>
					{breakers.map(breaker => (
						<div key={breaker.id} className='flex items-center gap-2'>
							<span
								className={`h-2.5 w-2.5 rounded-full ${
									breaker.color === 'green'
										? 'bg-emerald-400'
										: breaker.color === 'cyan'
											? 'bg-cyan-400'
											: 'bg-amber-400'
								}`}
							/>
							<span className='text-xs text-slate-400'>{breaker.name}</span>
						</div>
					))}

					<div className='flex items-center gap-2'>
						<span className='h-2.5 w-2.5 rounded-full bg-red-400' />
						<span className='text-xs text-slate-400'>Отдельная линия</span>
					</div>
				</div>
			</div>
		</section>
	);
}

// function StatusPanel({ enabledCount, totalCount }) {
// 	const allEnabled = enabledCount === totalCount;
// 	const allDisabled = enabledCount === 0;

// 	const message = allEnabled
// 		? 'Все линии включены'
// 		: allDisabled
// 			? 'Все линии отключены'
// 			: `Включено линий: ${enabledCount} из ${totalCount}`;

// 	return (
// 		<aside className='flex flex-col justify-between gap-4 rounded-2xl border border-white/8 bg-[#0e141e] p-5 sm:flex-row sm:items-center'>
// 			<div className='flex items-start gap-3'>
// 				<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300'>
// 					<Activity size={20} />
// 				</div>

// 				<div>
// 					<h2 className='font-medium text-white'>{message}</h2>
// 					<p className='mt-1 text-sm leading-5 text-slate-500'>
// 						Визуальное состояние панели. Реальное наличие напряжения приложение
// 						не измеряет.
// 					</p>
// 				</div>
// 			</div>

// 			<div className='flex items-center gap-2 text-xs text-slate-500'>
// 				<span>HOME POWER</span>
// 				<ArrowUpRight size={14} />
// 			</div>
// 		</aside>
// 	);
// }

function App() {
	const [breakerStates, setBreakerStates] = useState({
		green: true,
		cyan: true,
		yellow: true
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
							Управление электрикой
						</h2>

						<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-400'>
							Контролируй линии электроснабжения и смотри, какие точки относятся
							к каждому рубильнику.
						</p>
					</div>

					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
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
					<ApartmentMap />
				</section>

				{/* <section className='mt-4'>
					<StatusPanel enabledCount={enabledCount} totalCount={totalCount} />
				</section> */}

				<footer className='mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-white/6 pt-5 text-xs text-slate-600'>
					<span>HOME POWER © 2026</span>
					<span>Apartment electrical map · v0.1</span>
				</footer>
			</div>
		</main>
	);
}

export default App;
