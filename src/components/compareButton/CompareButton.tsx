import "./compareButton.css";

interface CompareButtonProps {
	showsScale: ComparisonWesternScale | ComparisonMaqam;
	comparingScaleName: ComparisonWesternScale | ComparisonMaqam | null;
	setComparingScaleName: (
		value: ComparisonWesternScale | ComparisonMaqam | null
	) => void;
}

function CompareButton({
	showsScale,
	comparingScaleName,
	setComparingScaleName,
}: CompareButtonProps) {
	const handleComparisonClick = () => {
		if (
			!comparingScaleName ||
			(comparingScaleName &&
				comparingScaleName !==
					showsScale)
		) {
			setComparingScaleName(
				showsScale as
					| ComparisonWesternScale
					| ComparisonMaqam
			);
		} else {
			setComparingScaleName(null);
		}
	};
	return (
		<button
			className="comparison-button"
			data-comparing-scale-name={showsScale}
			onClick={handleComparisonClick}
		>
			{showsScale}
		</button>
	);
}

export default CompareButton;
