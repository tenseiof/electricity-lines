import { useState } from 'react';

//components
import { Header } from './components/Header';
import { BreakerCard } from './components/BreakerCard';
import { ApartmentMap } from './components/ApartmentMap';

//data
import { breakers } from './data/breakers';

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

	const handleToggleBreaker = id => {
		setBreakerStates(prev => ({
			...prev,
			[id]: !prev[id]
		}));
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
								onToggle={() => handleToggleBreaker(breaker.id)}
							/>
						))}
					</div>
				</section>

				<section className='mt-8'>
					<ApartmentMap
						breakerStates={breakerStates}
						selectedBreakerId={selectedBreakerId}
						onSelectBreaker={handleSelectBreaker}
						onToggleBreaker={handleToggleBreaker}
						onFocusBreaker={handleSelectBreaker}
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
