
function InstrumentSelector({ instrument, setInstrument, instruments }: { instrument: string; setInstrument: (inst: string) => void; instruments: Record<string, string> }) {
	return (
		<div className="instrument-selector">
			<label htmlFor="instrument">Select Instrument: </label>
			<select
				id="instrument"
				value={instrument}
				onChange={(e) => setInstrument(e.target.value)}
			>
				{Object.values(instruments).map((inst) => (
					<option key={inst} value={inst}>
						{inst.charAt(0).toUpperCase() + inst.slice(1)}
					</option>
				))}
			</select>
		</div>
	);
}

export default InstrumentSelector;
