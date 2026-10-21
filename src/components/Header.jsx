import { Zap } from 'lucide-react';

export function Header({ enabledCount, totalCount }) {
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
