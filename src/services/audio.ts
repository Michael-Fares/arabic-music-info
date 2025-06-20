
export const context:AudioContext = new AudioContext();


export function loadSample(context:AudioContext, url :string):Promise<AudioBuffer> {
	return fetch(url)
		.then((response) => response.arrayBuffer())
		.then((buffer) => context.decodeAudioData(buffer));
}

export function playSample(context:AudioContext, noteValue: number, sample: AudioBuffer) {
	const source = context.createBufferSource();
	source.buffer = sample;
	// first try to use the detune property for pitch shifting
	if (source.detune) {
		source.detune.value = noteValue * 100;
	} else {
		// fallback to using playbackRate for pitch shifting
		source.playbackRate.value = 2 ** (noteValue / 12);
	}
	source.connect(context.destination);
	source.start(0);
}


