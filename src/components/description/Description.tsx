import "./description.css";
import { uppercase } from "../../utils";
import { Fragment } from "react/jsx-runtime";

import CompareButton from "./compareButton/CompareButton";

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
	const nameUpper = uppercase(name);
	let descriptionMarkup;
	const restProps = { comparingScaleName, setComparingScaleName };

	const variationSwitchPossibilityNoteLong = (
		<p className="variation-swap-note">
			The 1st and main variation is usually played when ascending and the 2nd
			variation is usually played when descending. However,{" "}
			<i>this is not a hard and fast requirement!</i> For example, especially in
			the course of improvising on Maqam {nameUpper} it's common to hear these
			played visa-versa, in an interchangable and interleaved manner, wherein
			the 2nd variation can be periodically used when ascensding and the 1st
			variation used when descending. You will often hear this as a hallmark
			feature of Arabic music improvistations or melodies composed in Maqam{" "}
			{nameUpper}. This same pattern is common is several other Maqams, as
			you'll see in Maqams{" "}
			<a className="maqam-jump" href="#bayati">
				Bayati
			</a>
			,{" "}
			<a className="maqam-jump" href="#hijaz">
				Hijaz
			</a>
			,{" "}
			<a className="maqam-jump" href="#nahawand">
				Nahawand
			</a>
			, and{" "}
			<a className="maqam-jump" href="#ajam">
				Ajam
			</a>{" "}
			below.
		</p>
	);

	const variationSwitchPossibilityNoteShort = (
		<span className="variation-swap-note">
			the 1st and main variation of Maqam {nameUpper} is primarily played when
			ascending and the 2nd variation is primarily played when descending. But{" "}
			this is not a hard and fast requirement. Therefore when improvising it's
			possible to play these visa-versa wherein the 2nd variation can be
			periodically used when ascensding and the 1st variation used when
			descending.
		</span>
	);

	switch (name) {
		case "rast":
			descriptionMarkup = (
				<Fragment>
					<p>
						Maqam {nameUpper} has 2 variations. The 1st and most common
						variation is like the western{" "}
						<CompareButton showsScale="major" {...restProps} /> scale but with
						the{" "}
						<i className="text-italic-qt">
							3rd and 7th degrees lowered by a quater tone
						</i>
						. In other words, they are half flat. The 2nd variation is like the
						western <CompareButton showsScale="mixolydian" {...restProps} />{" "}
						scale but with the{" "}
						<i className="text-italic-qt">
							3rd degree lowered by a quarter tone
						</i>
						, or half flat.{" "}
					</p>
					<br />
					{variationSwitchPossibilityNoteLong}
				</Fragment>
			);
			break;
		case "bayati":
			descriptionMarkup = (
				<Fragment>
					<p>
						Maqam {nameUpper} has 2 variations. The 1st and most common
						variation is like the western{" "}
						<CompareButton showsScale="dorian" {...restProps} /> mode but with
						the{" "}
						<i className="text-italic-qt">
							3rd and 7th degrees lowered by a quater tone
						</i>
						. In other words, they are half flat. The 2nd variation is like the
						western <CompareButton showsScale="minor" {...restProps} /> scale
						but with a the{" "}
						<i className="text-italic-qt">
							3rd degree lowered by a quarter tone
						</i>
						, or half flat.
					</p>
					<br />
					Similar to Maqam{" "}
					<a className="maqam-jump" href="#rast">
						Rast
					</a>{" "}
					above, {variationSwitchPossibilityNoteShort}
				</Fragment>
			);
			break;
		case "hijaz":
			descriptionMarkup = (
				<Fragment>
					<p>
						Maqam {nameUpper} has 2 variations. The 1st and most common
						variation is like the western{" "}
						<CompareButton showsScale="phrygian dominant" {...restProps} />{" "}
						scale but with the{" "}
						<i className="text-italic-qt">6th degree raised by a quater tone</i>
						. In other words, it is{" "}
						<i className="text-italic-qt">"half sharp"</i>, However you will
						notice that this note is notated as half flat for notiational
						consistency. The 2nd variation is technically identical to the
						western Phrygian Dominant Scale.
						<br />
						Another way to think of the 1st variation of Maqam {nameUpper} is
						the first 3 notes of the Phrygian Dominant scale, and then starting
						with the 4th note, the{" "}
						<i>
							first 5 notes of Maqam{" "}
							<a className="maqam-jump" href="#rast">
								Rast
							</a>
						</i>
						. In other words, if the starting note of maqam {nameUpper} is "D",
						then starting from the perfect 4th of "G" it will end with the first
						5 notes of Maqam Rast. Similarly if the starting note of Maqam{" "}
						{nameUpper} is "G", then starting from the perfect 4th of "C" it
						will end with the first 5 notes of Maqam Rast. And likewise, if the
						starting note of Maqam {nameUpper} is "A", then starting from the
						perfect 4th of "D" it will end with the first 5 notes of Maqam Rast.
					</p>
					<br />
					Like Maqam{" "}
					<a className="maqam-jump" href="#bayati">
						Bayati
					</a>{" "}
					above, {variationSwitchPossibilityNoteShort}
				</Fragment>
			);
			break;
		case "nahawand":
			descriptionMarkup = (
				<Fragment>
					<p>
						Maqam {nameUpper} has 2 variations. The 1st and most common
						variation is technically identical to the western{" "}
						<CompareButton showsScale="harmonic minor" {...restProps} /> scale.
						The 2nd varitation is technically identical to the western{" "}
						<CompareButton showsScale="minor" {...restProps} /> Scale.
					</p>
					<br />
					Like Maqam{" "}
					<a className="maqam-jump" href="#hijaz">
						Hijaz
					</a>{" "}
					above, {variationSwitchPossibilityNoteShort}
				</Fragment>
			);
			break;
		case "kurd":
			descriptionMarkup = (
				<Fragment>
					<p>
						Maqam {nameUpper} is identical to the western{" "}
						<CompareButton showsScale="phrygian" {...restProps} /> mode, which
						is a <CompareButton showsScale="minor" {...restProps} /> but with a
						flatted 2nd degree. You may recognize this scale from Spanish
						Adalusian Flamenco music, particularly Flamenco guitar music. As the
						Arabic speaking peoples ruled over this region during the Middle
						Ages more than 400 years, from roughly 711 - 1492 C.E., it's widely
						believed that Flamenco style music later played on the guitar had
						it's very first roots in Arabic Maqam music and took specific
						influence from this particular Maqam.
					</p>
					<br />
				</Fragment>
			);
			break;
		case "ajam":
			descriptionMarkup = (
				<Fragment>
					<p>
						Maqam {nameUpper} has 2 variations. The 1st and most common
						variation is identical to the western{" "}
						<CompareButton showsScale="major" {...restProps} /> scale, and th
						2nd variation is identical to the the western{" "}
						<CompareButton showsScale="mixolydian" {...restProps} /> Scale.
					</p>
					<br />
					Like Maqam's{" "}
					<a className="maqam-jump" href="#rast">
						Rast
					</a>
					,{" "}
					<a className="maqam-jump" href="#bayati">
						Bayati
					</a>
					,{" "}
					<a className="maqam-jump" href="#hijaz">
						Hijaz
					</a>
					, and{" "}
					<a className="maqam-jump" href="#nahawand">
						Nahawand
					</a>{" "}
					above, {variationSwitchPossibilityNoteShort}
				</Fragment>
			);
			break;
		case "saba":
			descriptionMarkup = (
				<Fragment>
					<p>
						Maqam {nameUpper} has 2 variations, and unlike the previous Maqams we've seen, neither can be compared to a Western scale in any meaningful way.
                        However, one good way to think about Maqam is in terms of how it compares to Maqam <CompareButton showsScale="bayati" {...restProps} />, because Maqam Saba is often a natural choice for modulation from Maqam Bayati in both common Arabic melodies and improvisations.
                        Specifically, the 1st variation of Maqam {nameUpper} is <i>like the 2nd variation Maqam Bayati - the descending versions - but with the 4th note flat and 7th note sharp</i>. Similarly the 2nd variation of Maqam {nameUpper} is like the 2nd variation (descending version) Maqam Bayati but with only the 4th note flat instead.
					</p>
					<br />
                    As we've seen is the convention with several other Maqams above, {variationSwitchPossibilityNoteShort}
				</Fragment>
			);
			break;
		case "sikah":
			break;
		default:
			descriptionMarkup = null;
	}
	return <div className="description">{descriptionMarkup}</div>;
}

export default Description;
