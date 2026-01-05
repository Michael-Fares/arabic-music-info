import "./description.css";

import CompareButton from "../compareButton/CompareButton";

interface DescriptionProps {
	scale: Scale;
	comparingScaleName: ComparisonWesternScale | ComparisonMaqam | null;
	setComparingScaleName: (
		value: ComparisonWesternScale | ComparisonMaqam | null
	) => void;
}

function Description({
	scale,
	comparingScaleName,
	setComparingScaleName,
}: DescriptionProps) {
	const { name } = scale;
	let descriptionMarkup;

	switch (name) {
		case "rast":
			descriptionMarkup = (
				<p>
					Maqam {name} has 2 variations. The 1st and most common varation of
					maqam Rast is is like the western{" "}
					<CompareButton
						showsScale="major"
						comparingScaleName={comparingScaleName}
						setComparingScaleName={setComparingScaleName}
					/>{" "}
					scale but with the 3rd and 7th degrees lowered by a <i>quater tone</i>
					. In other words, they are half flat. The 2nd variation is like the
					western{" "}
					<CompareButton
						showsScale="mixolydian"
						comparingScaleName={comparingScaleName}
						setComparingScaleName={setComparingScaleName}
					/>{" "}
					scale but with a the 3rd degree lowered by a <i>quarter tone</i>, or
					half flat.{" "}
				</p>
			);
			break;
		case "bayati":
			descriptionMarkup = (
				<p>
					Maqam {name} is like the western{" "}
					<CompareButton
						showsScale="minor"
						comparingScaleName={comparingScaleName}
						setComparingScaleName={setComparingScaleName}
					/>{" "}
					scale
				</p>
			);
			break;
		default:
			descriptionMarkup = null;
	}
	return <div className="description">{descriptionMarkup}</div>;
}

export default Description;
