import { House, Zap } from 'lucide-react';

//constant
import { THEME, LINE_COLORS } from '../constants/theme';

// data
import { breakers } from '../data/breakers';
import { electricalPoints } from '../data/electricalPoints';

export function ApartmentMap({
	breakerStates,
	selectedBreakerId,
	onSelectBreaker,
	onToggleBreaker,
	onFocusBreaker
}) {
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
										borderColor: isEnabled ? '#ffffff' : THEME.switchKnobOff,
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
						<div
							className='absolute bottom-2 right-2 z-40 w-20 rounded-lg border border-white/10 bg-slate-950/95 p-1.5 shadow-xl backdrop-blur-sm sm:bottom-4 sm:right-4 sm:w-32 sm:rounded-xl sm:p-2'
							aria-label='Керування лініями'
						>
							<div className='mb-1 flex items-center justify-between border-b border-white/10 pb-1 sm:mb-2 sm:pb-2'>
								<span className='text-[8px] font-semibold uppercase tracking-wide text-slate-400 sm:text-[9px] sm:tracking-wider'>
									Лінії
								</span>

								<Zap size={12} className='text-slate-500' />
							</div>

							<div className='space-y-0.5 sm:space-y-1'>
								{breakers.map(breaker => {
									const color = LINE_COLORS[breaker.color];
									const isEnabled = breakerStates[breaker.id];
									const isSelected = selectedBreakerId === breaker.id;

									const shortName = {
										teal: 'L1',
										blue: 'L2',
										rose: 'L3',
										auxA: 'A',
										auxB: 'B'
									}[breaker.id];

									return (
										<div
											key={breaker.id}
											className='flex items-center justify-between gap-1 rounded px-1 py-0.5 transition-colors duration-200 sm:gap-2 sm:rounded-md sm:px-1.5 sm:py-1'
											style={{
												backgroundColor: isSelected
													? `${color}18`
													: 'transparent',
												boxShadow: isSelected
													? `inset 0 0 0 1px ${color}66`
													: 'none'
											}}
										>
											<button
												type='button'
												onClick={event => {
													event.stopPropagation();
													onFocusBreaker(breaker.id);
												}}
												className='flex min-w-0 flex-1 items-center gap-1.5 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70'
												aria-label={`Вибрати ${breaker.name}`}
												aria-pressed={isSelected}
											>
												<span
													className='h-1.5 w-1.5 shrink-0 rounded-full'
													style={{
														backgroundColor: isEnabled ? color : THEME.muted,
														boxShadow: isEnabled ? `0 0 6px ${color}90` : 'none'
													}}
												/>

												<span
													className='truncate text-[10px] font-medium'
													style={{
														color: isSelected ? color : THEME.switchKnobOff
													}}
												>
													{shortName}
												</span>
											</button>

											<button
												type='button'
												role='switch'
												aria-checked={isEnabled}
												aria-label={`${breaker.name}: ${isEnabled ? 'вимкнути' : 'увімкнути'}`}
												onClick={event => {
													event.stopPropagation();
													onToggleBreaker(breaker.id);
												}}
												className='relative h-3.5 w-6 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:h-4 sm:w-7'
												style={{
													backgroundColor: isEnabled ? color : THEME.switchOff
												}}
											>
												<span
													className={`absolute top-0.5 h-2.5 w-2.5 rounded-full shadow-sm transition-all duration-200 sm:h-3 sm:w-3 ${
														isEnabled ? 'right-0.5' : 'left-0.5'
													}`}
													style={{
														backgroundColor: isEnabled
															? THEME.switchKnobOn
															: THEME.switchKnobOff
													}}
												/>
											</button>
										</div>
									);
								})}
							</div>
						</div>
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
								className='flex items-center gap-2 rounded-md border border-transparent px-2 py-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60'
								style={{
									backgroundColor: isSelected ? `${color}18` : 'transparent',
									opacity: isEnabled ? 1 : 0.55,
									borderColor: isSelected ? `${color}66` : 'transparent'
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
