export class AudioManager {
	context: AudioContext;
	constructor() {
		this.context = new AudioContext();
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
	loadSample(instrumentSampleUrl: string): Promise<AudioBuffer> {
		return fetch(instrumentSampleUrl)
			.then((response) => response.arrayBuffer())
			.then((buffer) => this.context.decodeAudioData(buffer));
	}
}
