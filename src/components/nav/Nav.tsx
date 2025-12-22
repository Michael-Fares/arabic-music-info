import "./nav.css";

function Nav({ maqamList }: { maqamList: string[] }) {
	return (
		<nav>
			<p>Select a Maqam:</p>
			<ul>
				{maqamList.map((maqam) => (
					<li key={maqam}>
						<a href={`#${maqam}`}>{maqam.toUpperCase()}</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
export default Nav;
