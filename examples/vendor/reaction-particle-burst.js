import { ReactionHeart, ReactionFire, ReactionMindblown } from '../../src/Constants.js';

/**
 * 2D Canvas & GPU Particle Burst engine for social card micro-animations.
 * Renders particle physics cascades for double-tap likes, fire bursts, and celebrations.
 */
class ReactionParticleBurst {

	/**
	 * Creates a particle burst animator.
	 *
	 * @param {HTMLCanvasElement} canvas - Target canvas element.
	 */
	constructor( canvas ) {

		this.canvas = canvas;
		this.ctx = canvas.getContext( '2d' );
		this.particles = [];
		this._animId = null;
		this._onFrame = this._onFrame.bind( this );

	}

	/**
	 * Spawns a celebratory particle burst.
	 *
	 * @param {number} x - Origin X coordinate.
	 * @param {number} y - Origin Y coordinate.
	 * @param {number} [reactionType=ReactionHeart] - Constant from Reaction.
	 * @param {number} [count=24] - Number of particles.
	 */
	burst( x, y, reactionType = ReactionHeart, count = 24 ) {

		const colors = this._getColors( reactionType );

		for ( let i = 0; i < count; i ++ ) {

			const angle = ( Math.PI * 2 * i ) / count + ( Math.random() - 0.5 ) * 0.5;
			const speed = 2 + Math.random() * 6;

			this.particles.push( {
				x: x,
				y: y,
				vx: Math.cos( angle ) * speed,
				vy: Math.sin( angle ) * speed - 2, // Slight upward bias
				gravity: 0.15,
				size: 4 + Math.random() * 6,
				color: colors[ Math.floor( Math.random() * colors.length ) ],
				alpha: 1.0,
				decay: 0.015 + Math.random() * 0.02,
				rotation: Math.random() * Math.PI,
				vRot: ( Math.random() - 0.5 ) * 0.2
			} );

		}

		if ( ! this._animId ) {

			this._animId = requestAnimationFrame( this._onFrame );

		}

	}

	/**
	 * Animation render loop step.
	 *
	 * @private
	 */
	_onFrame() {

		if ( ! this.ctx ) return;

		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		for ( let i = this.particles.length - 1; i >= 0; i -- ) {

			const p = this.particles[ i ];
			p.x += p.vx;
			p.y += p.vy;
			p.vy += p.gravity;
			p.rotation += p.vRot;
			p.alpha -= p.decay;

			if ( p.alpha <= 0 ) {

				this.particles.splice( i, 1 );
				continue;

			}

			this.ctx.save();
			this.ctx.globalAlpha = Math.max( 0, p.alpha );
			this.ctx.translate( p.x, p.y );
			this.ctx.rotate( p.rotation );
			this.ctx.fillStyle = p.color;

			this.ctx.beginPath();
			this.ctx.arc( 0, 0, p.size, 0, Math.PI * 2 );
			this.ctx.fill();

			this.ctx.restore();

		}

		if ( this.particles.length > 0 ) {

			this._animId = requestAnimationFrame( this._onFrame );

		} else {

			this._animId = null;

		}

	}

	/**
	 * Returns color palette array for a reaction type.
	 *
	 * @private
	 * @param {number} reactionType - Reaction constant.
	 * @return {Array<string>} Color hex strings.
	 */
	_getColors( reactionType ) {

		switch ( reactionType ) {

			case ReactionFire:
				return [ '#FF4500', '#FF8C00', '#FFD700', '#FF3300' ];

			case ReactionMindblown:
				return [ '#9370DB', '#00FFFF', '#FF00FF', '#7B68EE' ];

			case ReactionHeart:
			default:
				return [ '#FF1493', '#FF69B4', '#DC143C', '#FF4500', '#FFF0F5' ];

		}

	}

	/**
	 * Clears particles and cancels animation loop.
	 */
	dispose() {

		if ( this._animId ) {

			cancelAnimationFrame( this._animId );
			this._animId = null;

		}

		this.particles = [];

		if ( this.ctx ) {

			this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		}

	}

}

export { ReactionParticleBurst };
