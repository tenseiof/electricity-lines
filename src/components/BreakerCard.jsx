import { THEME, LINE_COLORS } from '../constants/theme';

export function BreakerCard({ breaker, isEnabled, onToggle, isSelected }) {
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
					className='relative h-5 w-9 shrink-0 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
					style={{
						backgroundColor: isEnabled ? color : THEME.switchOff
					}}
				>
					<span
						className={`absolute top-1 h-3 w-3 rounded-full shadow transition-all duration-300 ${
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
