export class AudioManager {
	context: AudioContext;
	samples: {
		piano: AudioBuffer | null;
	};
	constructor() {
		this.context = new AudioContext();
		this.samples = { piano: null }; // initialize with null, will be filled later
		const fileNames = ["piano"];
		Promise.all(
			fileNames.map((fileName) =>
				this.loadSample(`${import.meta.env.BASE_URL}audio/${fileName}.mp3`)
			)
		).then((audioBuffers) => {
			const [piano] = audioBuffers; // add more samples as needed, eg. oud, guitar, etc.
			this.samples = { piano }; // add more samples as needed, eg. oud, guitar, etc.
		});
	}

	playSample(noteValue: number, sample: AudioBuffer) {
		const source = this.context.createBufferSource();
		source.buffer = sample;
		// first try to use the detune property for pitch shifting
		if (source.detune) {
			source.detune.value = noteValue * 100;
		} else {
			// fallback to using playbackRate for pitch shifting
			source.playbackRate.value = 2 ** (noteValue / 12);
		}
		source.connect(this.context.destination);
		source.start(0);
	}
	loadSample(samplesampleUrl: string): Promise<AudioBuffer> {
		return fetch(samplesampleUrl)
			.then((response) => response.arrayBuffer())
			.then((buffer) => this.context.decodeAudioData(buffer));
	}
}
