/**
 * Web Vibration and Haptic Feedback driver for social micro-interactions.
 * Provides standard sensory feedback for like bursts, bookmarking, pull-to-refresh, and warnings.
 */
class HapticDriver {

	/**
	 * Preset vibration patterns (durations in milliseconds).
	 */
	static Patterns = {
		Light: [ 10 ],
		Medium: [ 25 ],
		Heavy: [ 50 ],
		Success: [ 15, 60, 25 ],
		Warning: [ 30, 40, 30 ],
		Error: [ 50, 40, 50, 40, 80 ],
		Selection: [ 8 ],
		ReactionBurst: [ 10, 30, 15, 40, 25, 50, 40 ]
	};

	/**
	 * Checks if the browser environment supports vibration.
	 *
	 * @return {boolean} True if vibration API is available.
	 */
	static isSupported() {

		return typeof navigator !== 'undefined' && 'vibrate' in navigator;

	}

	/**
	 * Triggers a sensory haptic pulse.
	 *
	 * @param {string|Array<number>|number} pattern - Preset key name, custom array, or duration in ms.
	 * @return {boolean} Whether the vibration request was accepted by the user agent.
	 */
	static trigger( pattern = 'Light' ) {

		if ( ! this.isSupported() ) return false;

		try {

			let patternSequence = pattern;

			if ( typeof pattern === 'string' && pattern in this.Patterns ) {

				patternSequence = this.Patterns[ pattern ];

			}

			return navigator.vibrate( patternSequence );

		} catch ( _err ) {

			return false;

		}

	}

	/**
	 * Immediately cancels any ongoing vibration sequence.
	 */
	static cancel() {

		if ( this.isSupported() ) {

			try {

				navigator.vibrate( 0 );

			} catch ( _err ) {

				// Silent catch on unsupported or throttled contexts

			}

		}

	}

}

export { HapticDriver };
