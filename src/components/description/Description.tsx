import "./description.css";

function Description({ scale }: { scale: Scale }) {
	const { name, isMaqam, comparisonWesternScaleNames } = scale;

	const comparisonScaleNameAsc = comparisonWesternScaleNames?.asc?.name ?? null;

	const degreesChangedAsc =
		comparisonWesternScaleNames?.asc?.withDegreesAsQuarterTones?.join(
			" and "
		) ?? null;

	const comparisonScaleNameDesc =
		comparisonWesternScaleNames?.desc?.name ?? null;

	const degreesChangedDesc =
		comparisonWesternScaleNames?.desc?.withDegreesAsQuarterTones?.join(
			" and "
		) ?? null;

	const comparisonScaleNameBoth =
		comparisonWesternScaleNames?.both?.name ?? null;

	const twoVariants =
		comparisonWesternScaleNames?.asc && comparisonWesternScaleNames?.desc;

	if (isMaqam) {
		return (
			<div className="description">
				<p>About Maqam {name}</p>

				{twoVariants && (
					<p>
						Maqam {name} has 2 variations. The 1st and most common variant is
						played when ascending, and is is like the western {``}
						<span>{comparisonScaleNameAsc}</span> scale, only with the {degreesChangedAsc?.includes("and") ? `${degreesChangedAsc} degrees as quarter tones . In other words, they are lowered by a quarter tone, or half flat.` : `${degreesChangedAsc} degree as quarter tones . In other words, it is lowered by a quarter tone, or half flat.`}  

                        The 2nd variant is typically by not necessarily always played when descending, and is is like the western {``}
                        <span>{comparisonScaleNameDesc}</span> scale, only with the {degreesChangedDesc?.includes("and") ? `${degreesChangedDesc} degrees as quarter tones . In other words, they are lowered by a quarter tone, or half flat.` : `${degreesChangedDesc} degree as quarter tones . In other words, it is lowered by a quarter tone, or half flat.`}  
					</p>
				)}
			</div>
		);
	} else {
		return (
			<div className="description">
				<p>This is the {name} scale in western music.</p>
			</div>
		);
	}
}

export default Description;
