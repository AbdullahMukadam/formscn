import {
	GithubIcon,
	TwitterIcon,
} from 'lucide-react';

export function Footer() {
	const year = new Date().getFullYear();

	const company = [
		{
			title: 'Github',
			href: 'https://github.com/AbdullahMukadam/formscn',
		},
		{
			title: 'Twitter',
			href: 'https://x.com/abd_mukadam',
		}
	];

	const resources = [
		{
			title: 'Docs',
			href: '/docs',
		},
		{
			title: 'Templates',
			href: '/templates',
		},
		{
			title: 'Editor',
			href: '/editor',
		}
	];

	const socialLinks = [
		{
			icon: <GithubIcon className="size-4" />,
			link: 'https://github.com/AbdullahMukadam/formscn',
		},
		{
			icon: <TwitterIcon className="size-4" />,
			link: 'https://x.com/abd_mukadam',
		}
	];
	return (
		<footer className="relative">
			<div className="bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)] mx-auto max-w-4xl md:border-x">
				<div className="bg-border absolute inset-x-0 h-px w-full" />
				<div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
					<div className="col-span-6 flex flex-col gap-5 md:col-span-4">
						<a href="/" className="w-max font-mono">
							<h1 className='text-white'>Formscn</h1>
						</a>
						<p className="text-muted-foreground max-w-sm text-sm text-balance">
            Visual Form Builder
            for shadcn
						</p>
						<div className="flex gap-2">
							{socialLinks.map((item, i) => (
								<a
									key={i}
									className="hover:bg-accent rounded-md border p-1.5"
									target="_blank"
									href={item.link}
								>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground mb-1 text-xs">
							Resources
						</span>
						<div className="flex flex-col gap-1">
							{resources.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm duration-200 hover:underline`}
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground mb-1 text-xs">Social</span>
						<div className="flex flex-col gap-1">
							{company.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm duration-200 hover:underline`}
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="bg-border absolute inset-x-0 h-px w-full" />
				<div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5">
					<p className="text-muted-foreground text-center font-thin">
						© <a href="https://x.com/sshahaider">formscn</a>. All rights
						reserved {year}
					</p>
				</div>
			</div>
		</footer>
	);
}
