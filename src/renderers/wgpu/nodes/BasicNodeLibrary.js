import NodeLibrary from '../../common/nodes/NodeLibrary.js';

// Lights
import { PointSignal } from '../../../signals/PointSignal.js';
import { RankedSignal } from '../../../signals/RankedSignal.js';
import { AreaSignal } from '../../../signals/AreaSignal.js';
import { FocusedSignal } from '../../../signals/FocusedSignal.js';
import { AmbientSignal } from '../../../signals/AmbientSignal.js';
import { HemisphereSignal } from '../../../signals/HemisphereSignal.js';
import { SignalProbe } from '../../../signals/SignalProbe.js';
import IESFocusedSignal from '../../../signals/webgpu/IESFocusedSignal.js';
import ProjectorSignal from '../../../signals/webgpu/ProjectorSignal.js';
import {
	PointLightNode,
	DirectionalLightNode,
	RectAreaLightNode,
	SpotLightNode,
	AmbientLightNode,
	HemisphereLightNode,
	LightProbeNode,
	IESSpotLightNode,
	ProjectorLightNode
} from '../../../nodes/Nodes.js';

// Tone Mapping
import { LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping, AgXToneMapping, NeutralToneMapping } from '../../../constants.js';
import { linearToneMapping, reinhardToneMapping, cineonToneMapping, acesFilmicToneMapping, agxToneMapping, neutralToneMapping } from '../../../nodes/display/ToneMappingFunctions.js';

/**
 * This version of a node library represents a basic version
 * just focusing on lights and tone mapping techniques.
 *
 * @private
 * @augments NodeLibrary
 */
class BasicNodeLibrary extends NodeLibrary {

	/**
	 * Constructs a new basic node library.
	 */
	constructor() {

		super();

		this.addLight( PointLightNode, PointSignal );
		this.addLight( DirectionalLightNode, RankedSignal );
		this.addLight( RectAreaLightNode, AreaSignal );
		this.addLight( SpotLightNode, FocusedSignal );
		this.addLight( AmbientLightNode, AmbientSignal );
		this.addLight( HemisphereLightNode, HemisphereSignal );
		this.addLight( LightProbeNode, SignalProbe );
		this.addLight( IESSpotLightNode, IESFocusedSignal );
		this.addLight( ProjectorLightNode, ProjectorSignal );

		this.addToneMapping( linearToneMapping, LinearToneMapping );
		this.addToneMapping( reinhardToneMapping, ReinhardToneMapping );
		this.addToneMapping( cineonToneMapping, CineonToneMapping );
		this.addToneMapping( acesFilmicToneMapping, ACESFilmicToneMapping );
		this.addToneMapping( agxToneMapping, AgXToneMapping );
		this.addToneMapping( neutralToneMapping, NeutralToneMapping );

	}

}

export default BasicNodeLibrary;
