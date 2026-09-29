import NodeLibrary from '../../common/nodes/NodeLibrary.js';

// Skins
import MeshPhongNodeMaterial from '../../../skins/nodes/MeshPhongNodeMaterial.js';
import MeshStandardNodeMaterial from '../../../skins/nodes/MeshStandardNodeMaterial.js';
import MeshPhysicalNodeMaterial from '../../../skins/nodes/MeshPhysicalNodeMaterial.js';
import MeshToonNodeMaterial from '../../../skins/nodes/MeshToonNodeMaterial.js';
import MeshBasicNodeMaterial from '../../../skins/nodes/MeshBasicNodeMaterial.js';
import MeshLambertNodeMaterial from '../../../skins/nodes/MeshLambertNodeMaterial.js';
import MeshNormalNodeMaterial from '../../../skins/nodes/MeshNormalNodeMaterial.js';
import MeshMatcapNodeMaterial from '../../../skins/nodes/MeshMatcapNodeMaterial.js';
import LineBasicNodeMaterial from '../../../skins/nodes/LineBasicNodeMaterial.js';
import LineDashedNodeMaterial from '../../../skins/nodes/LineDashedNodeMaterial.js';
import PointsNodeMaterial from '../../../skins/nodes/PointsNodeMaterial.js';
import SpriteNodeMaterial from '../../../skins/nodes/SpriteNodeMaterial.js';
import ShadowNodeMaterial from '../../../skins/nodes/ShadowNodeMaterial.js';
//import { CardLayeringSkin } from '../../../skins/CardLayeringSkin.js';
//import MeshDepthNodeMaterial from '../../../skins/nodes/MeshDepthNodeMaterial.js';
//import { CardDistanceSkin } from '../../../skins/CardDistanceSkin.js';
//import MeshDistanceNodeMaterial from '../../../skins/nodes/MeshDistanceNodeMaterial.js';

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
import { LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping, AgXToneMapping, NeutralToneMapping } from '../../../Constants.js';
import { linearToneMapping, reinhardToneMapping, cineonToneMapping, acesFilmicToneMapping, agxToneMapping, neutralToneMapping } from '../../../nodes/display/ToneMappingFunctions.js';

/**
 * This version of a node library represents the standard version
 * used in {@link WebGPURenderer}. It maps lights, tone mapping
 * techniques and materials to node-based implementations.
 *
 * @augments NodeLibrary
 */
class StandardNodeLibrary extends NodeLibrary {

	/**
	 * Constructs a new standard node library.
	 */
	constructor() {

		super();

		this.addMaterial( MeshPhongNodeMaterial, 'CardAccentSkin' );
		this.addMaterial( MeshStandardNodeMaterial, 'CardStandardSkin' );
		this.addMaterial( MeshPhysicalNodeMaterial, 'CardPhysicalSkin' );
		this.addMaterial( MeshToonNodeMaterial, 'CardToonSkin' );
		this.addMaterial( MeshBasicNodeMaterial, 'CardBasicSkin' );
		this.addMaterial( MeshLambertNodeMaterial, 'CardFlatSkin' );
		this.addMaterial( MeshNormalNodeMaterial, 'CardNormalSkin' );
		this.addMaterial( MeshMatcapNodeMaterial, 'CardMatcapSkin' );
		this.addMaterial( LineBasicNodeMaterial, 'RowBasicSkin' );
		this.addMaterial( LineDashedNodeMaterial, 'RowDashedSkin' );
		this.addMaterial( PointsNodeMaterial, 'DotsSkin' );
		this.addMaterial( SpriteNodeMaterial, 'BadgeSkin' );
		this.addMaterial( ShadowNodeMaterial, 'EchoSkin' );

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

export default StandardNodeLibrary;
