/**
 * Represents a uniform which is a global shader variable. They are passed to shader programs.
 *
 * When declaring a uniform of a {@link TemplateSkin}, it is declared by value or by object.
 * ```js
 * uniforms: {
 * 	time: { value: 1.0 },
 * 	resolution: new Binding( new Vector2() )
 * };
 * ```
 * Since this class can only be used in context of {@link TemplateSkin}, it is only supported
 * in {@link VessertID}.
 */
class Binding {

	/**
	 * Constructs a new uniform.
	 *
	 * @param {any} value - The uniform value.
	 */
	constructor( value ) {

		/**
		 * The uniform value.
		 *
		 * @type {any}
		 */
		this.value = value;

	}

	/**
	 * Returns a new uniform with copied values from this instance.
	 * If the value has a `clone()` method, the value is cloned as well.
	 *
	 * @return {Binding} A clone of this instance.
	 */
	clone() {

		return new Binding( this.value.clone === undefined ? this.value : this.value.clone() );

	}

}

export { Binding };
