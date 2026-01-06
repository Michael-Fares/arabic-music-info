import "./description.css";

import { Fragment } from "react/jsx-runtime";

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
    const restProps = { comparingScaleName, setComparingScaleName };

    const variationSwitchPossibilityNote = (
        <p className="variation-swap-note">
            The 1st and main variation is primarily played when ascending and
            the 2nd variation is primarily played when descending. However,{" "}
            <i>this is not a hard and fast requirement!</i> For example, when
            improvising it's possible to play the visa-versa wherein the 1st
            variation can be periodically used when ascensding and the 2nd
            variation used when descending. You will often hear then in Arabic
            music using maqam {name}.
        </p>
    );

    switch (name) {
        case "rast":
            descriptionMarkup = (
                <Fragment>
                    <p>
                        Maqam {name} has 2 variations. The 1st and most common
                        varation is like the western{" "}
                        <CompareButton showsScale="major" {...restProps} />{" "}
                        scale but with the 3rd and 7th degrees lowered by a{" "}
                        <i>quater tone</i>. In other words, they are half flat.
                        The 2nd variation is like the western{" "}
                        <CompareButton showsScale="mixolydian" {...restProps} />{" "}
                        scale but with a the 3rd degree lowered by a{" "}
                        <i>quarter tone</i>, or half flat.{" "}
                    </p>
                    <br />
                    {variationSwitchPossibilityNote}
                </Fragment>
            );
            break;
        case "bayati":
            descriptionMarkup = (
                <Fragment>
                    <p>
                        Maqam {name} has 2 variations. The 1st and most common
                        varation is like the western{" "}
                        <CompareButton showsScale="dorian" {...restProps} />{" "}
                        mode but with the 3rd and 7th degrees lowered by a{" "}
                        <i>quater tone</i>. In other words, they are half flat.
                        The 2nd variation is like the western{" "}
                        <CompareButton showsScale="minor" {...restProps} />{" "}
                        scale but with a the 3rd degree lowered by a{" "}
                        <i>quarter tone</i>, or half flat.{" "}
                    </p>
                    <br />
                    {variationSwitchPossibilityNote}
                </Fragment>
            );
            break;
        case "hijaz":
            descriptionMarkup = (
                <Fragment>
                    <p>
                        Maqam {name} has 2 variations. The 1st and most common
                        varation is like the western{" "}
                        <CompareButton
                            showsScale="phrygian dominant"
                            {...restProps}
                        />{" "}
                        scale but with the 6th degree raised by a{" "}
                        <i>quater tone</i>. In other words, it is{" "}
                        <i>half sharp</i>. You will notice that this note is
                        notated as half flat for notiational consistency.
                        Another way to think of this variation is the first 3
                        notes of the phrygian dominant scale, and then starting
                        with the 4th note{" "}
                        <i>
                            first 5 notes of maqam <a href="#rast">rast</a>
                        </i>
                        . In other words, if the starting note of maqam {name}{" "}
                        is "D", then starting from the perfect 4th of "G" it
                        will end with the first 5 notes of maqam rast. similarly
                        if the starting note of maqam {name} is "G", then
                        starting from the perfect 4th of "C" it will end with
                        the first 5 notes of maqam rast. And likewise, if the
                        starting note of maqam {name} is "A", then starting from
                        the perfect 4th of "D" it will end with the first 5
                        notes of maqam rast.
                        {/*
							NEED TO MAKE THE POPOUT HERE START WITH THE 4th degree 
						<CompareButton
                            showsScale="rast"
                            {...restProps}
                        />{" "}  */}
                        The 2nd variation is technically identical to the
                        western phrygian dominant scale.
                    </p>
                    <br />
                    {variationSwitchPossibilityNote}
                </Fragment>
            );
            break;
        case "nahawand":
            descriptionMarkup = (
                <Fragment>
                    <p>
                        Maqam {name} has 2 variations. The 1st and most common
                        varation is technically identical to the western{" "}
                        <CompareButton
                            showsScale="harmonic minor"
                            {...restProps}
                        />{" "}
                        scale. The 2nd varitation is technically identical to
                        the western{" "}
                        <CompareButton showsScale="minor" {...restProps} />{" "}
                    </p>
                    <br />
                    {variationSwitchPossibilityNote}
                </Fragment>
            );
            break;
        case "kurd":
            break;
        case "ajam":
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
