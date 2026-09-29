import { GESTURE } from '../../src/Constants.js';

/**
 * Mobile touch and pointer gesture recognizer for social feed interaction.
 * Recognizes taps, double-taps, long-presses, directional swipes, pinches, and pull-to-refresh.
 */
class GestureRecognizer {

	/**
	 * Creates a new GestureRecognizer instance.
	 *
	 * @param {HTMLElement} element - The target DOM element to monitor.
	 * @param {Object} [options={}] - Configuration options.
	 */
	constructor( element, options = {} ) {

		this.element = element;
		this.options = Object.assign( {
			doubleTapDelay: 300,
			longPressDelay: 500,
			swipeThreshold: 50,
			pinchThreshold: 0.1,
			pullToRefreshThreshold: 80
		}, options );

		this.listeners = new Map();
		this._startX = 0;
		this._startY = 0;
		this._startTime = 0;
		this._lastTapTime = 0;
		this._longPressTimer = null;
		this._initialPinchDistance = 0;
		this._isPinching = false;

		this._onPointerDown = this._onPointerDown.bind( this );
		this._onPointerMove = this._onPointerMove.bind( this );
		this._onPointerUp = this._onPointerUp.bind( this );
		this._onPointerCancel = this._onPointerCancel.bind( this );

		this._bindEvents();

	}

	/**
	 * Registers an event listener for a specific gesture.
	 *
	 * @param {number} gestureType - The gesture constant from GESTURE.
	 * @param {Function} callback - Callback function receiving gesture detail.
	 * @return {GestureRecognizer} Self for chaining.
	 */
	on( gestureType, callback ) {

		if ( ! this.listeners.has( gestureType ) ) {

			this.listeners.set( gestureType, new Set() );

		}

		this.listeners.get( gestureType ).add( callback );
		return this;

	}

	/**
	 * Unregisters an event listener.
	 *
	 * @param {number} gestureType - The gesture constant from GESTURE.
	 * @param {Function} callback - Callback function to remove.
	 * @return {GestureRecognizer} Self for chaining.
	 */
	off( gestureType, callback ) {

		if ( this.listeners.has( gestureType ) ) {

			this.listeners.get( gestureType ).delete( callback );

		}

		return this;

	}

	/**
	 * Dispatches gesture callbacks.
	 *
	 * @private
	 * @param {number} gestureType - The triggered gesture type.
	 * @param {Object} detail - Event detail payload.
	 */
	_emit( gestureType, detail = {} ) {

		const callbacks = this.listeners.get( gestureType );

		if ( callbacks ) {

			for ( const cb of callbacks ) {

				cb( detail );

			}

		}

	}

	/**
	 * Binds DOM pointer event listeners.
	 *
	 * @private
	 */
	_bindEvents() {

		this.element.addEventListener( 'pointerdown', this._onPointerDown, { passive: false } );
		this.element.addEventListener( 'pointermove', this._onPointerMove, { passive: false } );
		this.element.addEventListener( 'pointerup', this._onPointerUp, { passive: false } );
		this.element.addEventListener( 'pointercancel', this._onPointerCancel, { passive: false } );

	}

	/**
	 * Handles pointer down event.
	 *
	 * @private
	 * @param {PointerEvent} e - DOM pointer event.
	 */
	_onPointerDown( e ) {

		this._startX = e.clientX;
		this._startY = e.clientY;
		this._startTime = performance.now();

		this._longPressTimer = setTimeout( () => {

			this._emit( GESTURE.LONG_PRESS, { x: this._startX, y: this._startY, originalEvent: e } );

		}, this.options.longPressDelay );

	}

	/**
	 * Handles pointer move event.
	 *
	 * @private
	 * @param {PointerEvent} e - DOM pointer event.
	 */
	_onPointerMove( e ) {

		const dx = e.clientX - this._startX;
		const dy = e.clientY - this._startY;

		if ( Math.hypot( dx, dy ) > 10 && this._longPressTimer ) {

			clearTimeout( this._longPressTimer );
			this._longPressTimer = null;

		}

		this._emit( GESTURE.PAN_DRAG, { dx, dy, x: e.clientX, y: e.clientY } );

	}

	/**
	 * Handles pointer up event.
	 *
	 * @private
	 * @param {PointerEvent} e - DOM pointer event.
	 */
	_onPointerUp( e ) {

		if ( this._longPressTimer ) {

			clearTimeout( this._longPressTimer );
			this._longPressTimer = null;

		}

		const dt = performance.now() - this._startTime;
		const dx = e.clientX - this._startX;
		const dy = e.clientY - this._startY;
		const distance = Math.hypot( dx, dy );

		// Tap or Double Tap
		if ( distance < 15 && dt < 400 ) {

			const now = performance.now();

			if ( now - this._lastTapTime < this.options.doubleTapDelay ) {

				this._emit( GESTURE.DOUBLE_TAP, { x: e.clientX, y: e.clientY, originalEvent: e } );
				this._lastTapTime = 0;

			} else {

				this._lastTapTime = now;
				setTimeout( () => {

					if ( this._lastTapTime === now ) {

						this._emit( GESTURE.TAP, { x: e.clientX, y: e.clientY, originalEvent: e } );

					}

				}, this.options.doubleTapDelay );

			}

			return;

		}

		// Directional Swipes
		if ( distance >= this.options.swipeThreshold && dt < 500 ) {

			const absX = Math.abs( dx );
			const absY = Math.abs( dy );

			if ( absX > absY ) {

				if ( dx > 0 ) {

					if ( this._startX <= 30 ) {

						this._emit( GESTURE.EDGE_SWIPE_BACK, { dx, dy } );

					} else {

						this._emit( GESTURE.SWIPE_RIGHT, { dx, velocity: absX / dt } );

					}

				} else {

					this._emit( GESTURE.SWIPE_LEFT, { dx, velocity: absX / dt } );

				}

			} else {

				if ( dy > 0 ) {

					if ( this.element.scrollTop === 0 && dy >= this.options.pullToRefreshThreshold ) {

						this._emit( GESTURE.PULL_TO_REFRESH, { dy } );

					} else {

						this._emit( GESTURE.SWIPE_DOWN, { dy, velocity: absY / dt } );

					}

				} else {

					this._emit( GESTURE.SWIPE_UP, { dy, velocity: absY / dt } );

				}

			}

		}

	}

	/**
	 * Handles pointer cancel event.
	 *
	 * @private
	 */
	_onPointerCancel() {

		if ( this._longPressTimer ) {

			clearTimeout( this._longPressTimer );
			this._longPressTimer = null;

		}

	}

	/**
	 * Disposes event listeners and cancels pending timers.
	 */
	dispose() {

		this._onPointerCancel();
		this.element.removeEventListener( 'pointerdown', this._onPointerDown );
		this.element.removeEventListener( 'pointermove', this._onPointerMove );
		this.element.removeEventListener( 'pointerup', this._onPointerUp );
		this.element.removeEventListener( 'pointercancel', this._onPointerCancel );
		this.listeners.clear();

	}

}

export { GestureRecognizer };
