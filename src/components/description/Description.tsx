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
            The 1st and main variation is primarily played when ascending and
            the 2nd variation is primarily played when descending. However,{" "}
            <i>this is not a hard and fast requirement!</i> For example, when
            improvising it's possible to play these visa-versa wherein the 2nd
            variation can be periodically used when ascensding and the 1st
            variation used when descending. You will often hear this in Arabic
            music improvistations or melodies composed in Maqam {nameUpper}.
            This same pattern is common is several other Maqams, as you'll see in Maqams 
            {" "}<a href="#bayati">Bayati</a>,
            {" "}<a href="#hijaz">Hijaz</a>,
            {" "}<a href="#nahawand">Nahawand</a>,
            and
            {" "}<a href="#ajam">Ajam</a>{" "}
            below.
        </p>
    );

    const variationSwitchPossibilityNoteShort = (
        <span className="variation-swap-note">
            the 1st and main variation is primarily played when ascending and
            the 2nd variation is primarily played when descending. But {" "}
            this is not a hard and fast requirement and so when
            improvising it's possible to play these visa-versa wherein the 2nd
            variation can be periodically used when ascensding and the 1st
            variation used when descending.
        </span>
    );

    switch (name) {
        case "rast":
            descriptionMarkup = (
                <Fragment>
                    <p>
                        Maqam {nameUpper} has 2 variations. The 1st and most common
                        varation is like the western{" "}
                        <CompareButton showsScale="major" {...restProps} />{" "}
                        scale but with the <i className="text-italic-qt">3rd and 7th degrees lowered by a{" "}
                        quater tone</i>. In other words, they are half flat.
                        The 2nd variation is like the western{" "}
                        <CompareButton showsScale="mixolydian" {...restProps} />{" "}
                        scale but with a the 3rd degree lowered by a{" "}
                        <i>quarter tone</i>, or half flat.{" "}
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
                        varation is like the western{" "}
                        <CompareButton showsScale="dorian" {...restProps} />{" "}
                        mode but with the 3rd and 7th degrees lowered by a{" "}
                        <i className="text-italic-qt">quater tone</i>. In other words, they are half flat.
                        The 2nd variation is like the western{" "}
                        <CompareButton showsScale="minor" {...restProps} />{" "}
                        scale but with a the 3rd degree lowered by a{" "}
                        <i>quarter tone</i>, or half flat.{" "}
                    </p>
                    <br />
                    Similar to Maqam Rast above, {variationSwitchPossibilityNoteShort}
                </Fragment>
            );
            break;
        case "hijaz":
            descriptionMarkup = (
                <Fragment>
                    <p>
                        Maqam {nameUpper} has 2 variations. The 1st and most common
                        varation is like the western{" "}
                        <CompareButton
                            showsScale="phrygian dominant"
                            {...restProps}
                        />{" "}
                        scale but with the 6th degree raised by a{" "}
                        <i className="text-italic-qt">quater tone</i>. In other words, it is{" "}
                        <i>half sharp</i>. You will notice that this note is
                        notated as half flat for notiational consistency.
                        Another way to think of this variation is the first 3
                        notes of the phrygian dominant scale, and then starting
                        with the 4th note{" "}
                        <i>
                            first 5 notes of maqam <a href="#rast">rast</a>
                        </i>
                        . In other words, if the starting note of maqam {nameUpper}{" "}
                        is "D", then starting from the perfect 4th of "G" it
                        will end with the first 5 notes of maqam rast. similarly
                        if the starting note of maqam {nameUpper} is "G", then
                        starting from the perfect 4th of "C" it will end with
                        the first 5 notes of maqam rast. And likewise, if the
                        starting note of maqam {nameUpper} is "A", then starting from
                        the perfect 4th of "D" it will end with the first 5
                        notes of maqam rast.
                        {/*
							NEED TO MAKE THE POPOUT HERE START WITH THE 4th degree 
						<CompareButton
                            showsScale="rast"
                            {...restProps}
                        />{" "}  */}
                        The 2nd variation is technically identical to the
                        western Phrygian Dominant Scale.
                    </p>
                    <br />
                    Like Maqam Bayati above, {variationSwitchPossibilityNoteShort}
                </Fragment>
            );
            break;
        case "nahawand":
            descriptionMarkup = (
                <Fragment>
                    <p>
                        Maqam {nameUpper} has 2 variations. The 1st and most common
                        varation is technically identical to the western{" "}
                        <CompareButton
                            showsScale="harmonic minor"
                            {...restProps}
                        />{" "}
                        scale. The 2nd varitation is technically identical to
                        the western{" "}
                        <CompareButton showsScale="minor" {...restProps} />{" "} Scale.
                    </p>
                    <br />
                    Like Maqam Hijaz above, {variationSwitchPossibilityNoteShort}
                </Fragment>
            );
            break;
        case "kurd":
            descriptionMarkup = (
                <Fragment>
                    <p>
                        Maqam {nameUpper} is identical to the western{" "}
                        <CompareButton showsScale="phrygian" {...restProps} />{" "}
                        mode, which a{" "}
                        <CompareButton showsScale="minor" {...restProps} /> but
                        with a lowered 2nd degree. You may recognize this scale
                        from Spanish Adalusian Flamenco music, particularly
                        Flamenco guitar music. As the Arabic speaking peoples
                        ruled over this region during the Middle Ages more than 400 years, from roughly 711 -
                        1492 C.E., it's widely believed that Flamenco style
                        music later played the guitar had it's very first roots
                        in Arabic maqam music and took specific influence from
                        this particular maqam.
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
                        varation is identical to the western{" "}
                        <CompareButton showsScale="major" {...restProps} />{" "}
                        scale, and th 2nd variation is identical to the the western{" "}
                        <CompareButton showsScale="mixolydian" {...restProps} />{" "}
                        Scale.
                    </p>
                    <br />
                    Like Maqam's Rast, Bayati, Hijaz, and Nahawand above, {variationSwitchPossibilityNoteShort}
                </Fragment>
            );
            break;
        case "saba":
            break;
        case "sikah":
            break;
        default:
            descriptionMarkup = null;
    }
    return <div className="description">{descriptionMarkup}</div>;
}

export default Description;
