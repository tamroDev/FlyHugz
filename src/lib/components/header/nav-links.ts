interface Route {
	title: string;
	href: string;
	subItem?: Route[];
}

export const routes: Route[] = [
	{
		title: 'FlyHugz® Pillow',
		href: '#'
	},
	{
		title: 'FlyHugz® Travel Collection',
		href: '#'
	},
	{
		title: 'Support',
		href: '#',
		subItem: [
			{
				title: 'About Us',
				href: '#'
			},
			{
				title: 'Contact Us',
				href: '#'
			},
			{
				title: 'Track Us',
				href: '#'
			}
		]
	}
];
