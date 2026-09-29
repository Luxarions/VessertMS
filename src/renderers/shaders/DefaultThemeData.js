import { DataMedia } from "../../media/DataMedia.js";
import { RGBAFormat, FloatType } from "../../Constants.js";

let _dfgLUT = null;

export function getDFGLUT() {
	if ( _dfgLUT === null ) {
		const width = 64;
		const height = 64;
		const data = new Float32Array( width * height * 4 );
		_dfgLUT = new DataMedia( data, width, height, RGBAFormat, FloatType );
		_dfgLUT.needsUpdate = true;
	}
	return _dfgLUT;
}

export default /* glsl */`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
