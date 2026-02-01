export class AudioManager {
	context: AudioContext;
	samples: AudioSampleSet;
	constructor() {
		this.context = new AudioContext();
		this.samples = {}; // initialize with null, will be filled later
		const fileNames = ["piano", "violin", "oud"]; // add more sample file names as needed, eg. oud, guitar, etc.
		// load all samples in parallel
		Promise.all(
			fileNames.map((fileName) =>
				this.loadSample(`${import.meta.env.BASE_URL}audio/${fileName}.mp3`)
			)
		).then((audioBuffers) => {
			const [piano, violin, oud] = audioBuffers; // add more samples as needed, eg. oud, guitar, etc.
			this.samples = { piano, violin, oud }; // add more samples as needed, eg. oud, guitar, etc.
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
