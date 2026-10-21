import { Lightbulb, Plug, Monitor, Heater } from 'lucide-react';

export const breakers = [
	// Line 1 — hрозетки та світло
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

	// Додаткова лінія A — комп'ютер
	{
		id: 'auxA',
		number: '04',
		name: 'Додаткова лінія A',
		color: 'auxA',
		description: 'Комп’ютер · 2 розетки',
		icon: Monitor,
		status: 'ON'
	},

	// Додаткова лінія — комп'ютер
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
