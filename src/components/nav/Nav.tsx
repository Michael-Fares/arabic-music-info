import "./nav.css";

import { useEffect } from "react";

function Nav({ maqamList }: { maqamList: string[] }) {
	useEffect(() => {
		const CSS_only_scrollspy = window.CSS.supports(
			"scroll-target-group",
			"auto"
		);
		if (CSS_only_scrollspy) {
			return;
		}

		// 1. Keep track of all visible sections in a Map
		const visibleSections = new Map();

		const observerOptions = {
			root: null,
			rootMargin: "-30% 0px -70% 0px", // Adjusted for better reliability
			threshold: [0, 0.1, 0.2], // Give Firefox / Safari more data points to work with
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const id = entry.target.getAttribute("id");

				// Update our tracker Map
				if (entry.isIntersecting) {
					visibleSections.set(id, entry.intersectionRatio);
				} else {
					visibleSections.delete(id);
				}

				// Determine which section is "most" visible
				updateActiveLink();
			});
		}, observerOptions);

		function updateActiveLink() {
			if (visibleSections.size === 0) return;

			// Find the ID with the highest intersection ratio
			// Or, for simple single-page sites, just the first one in the Map
			const activeId = [...visibleSections.keys()].pop();

			const navLinks = document.querySelectorAll("nav a");
			navLinks.forEach((link) => {
				if (link.getAttribute("href") === `#${activeId}`) {
					link.classList.add("active");
				} else {
					link.classList.remove("active");
				}
			});
		}

		// Start observing
		document
			.querySelectorAll(".scale-panel[id]")
			.forEach((section) => observer.observe(section));

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<nav>
			<p>Maqams:</p>
			<ul>
				{maqamList.map((maqam) => {
					const formattedMaqamName = maqam.charAt(0).toUpperCase() + maqam.substring(1);
					return (
						<li key={maqam}>
							<a href={`#${maqam}`}>{formattedMaqamName}</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
export default Nav;
