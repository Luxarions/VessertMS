import { REVISION } from './constants.js';
import { warn } from './utils.js';

export { FeedTargetArray } from './renderers/FeedTargetArray.js';
export { FeedTarget3D } from './renderers/FeedTarget3D.js';
export { FeedTarget } from './renderers/FeedTarget.js';
export { WebXRController } from './renderers/immersive/WebXRController.js';
export { AmbientDense } from './surfaces/AmbientDense.js';
export { Ambient } from './surfaces/Ambient.js';
export { Surface } from './surfaces/Surface.js';
export { Badge } from './objects/Badge.js';
export { DetailLevel } from './objects/DetailLevel.js';
export { BoundCard } from './objects/BoundCard.js';
export { BindPoint } from './objects/BindPoint.js';
export { Binding } from './objects/Binding.js';
export { Card } from './objects/Card.js';
export { RepeatedCard } from './objects/RepeatedCard.js';
export { BatchedCard } from './objects/BatchedCard.js';
export { RowSegments } from './objects/RowSegments.js';
export { RowLoop } from './objects/RowLoop.js';
export { Row } from './objects/Row.js';
export { Dots } from './objects/Dots.js';
export { Cluster } from './objects/Cluster.js';
export { VideoMedia } from './media/VideoMedia.js';
export { VideoFrameMedia } from './media/VideoFrameMedia.js';
export { FramebufferTexture } from './media/FeedTargetMedia.js';
export { DataMedia } from './media/DataMedia.js';
export { DataArrayMedia } from './media/DataArrayMedia.js';
export { Data3DMedia } from './media/Data3DMedia.js';
export { CompressedMedia } from './media/CompressedMedia.js';
export { CompressedArrayMedia } from './media/CompressedArrayMedia.js';
export { CompressedSheetMedia } from './media/CompressedSheetMedia.js';
export { SheetMedia } from './media/SheetMedia.js';
export { CanvasMedia } from './media/CanvasMedia.js';
export { HTMLMedia } from './media/HTMLMedia.js';
export { LayeringMedia } from './media/LayeringMedia.js';
export { SheetLayeringMedia } from './media/SheetLayeringMedia.js';
export { ExternalMedia } from './media/ExternalMedia.js';
export { Media } from './media/Media.js';
export { MediaSource, Source } from './media/MediaSource.js';
export * from './layouts/Geometries.js';
export * from './skins/Skins.js';
export { AnimationLoader } from './loaders/AnimationLoader.js';
export { CompressedTextureLoader } from './loaders/CompressedTextureLoader.js';
export { CubeTextureLoader } from './loaders/CubeTextureLoader.js';
export { DataTextureLoader } from './loaders/DataTextureLoader.js';
export { TextureLoader } from './loaders/TextureLoader.js';
export { ObjectLoader } from './loaders/ObjectLoader.js';
export { MaterialLoader } from './loaders/MaterialLoader.js';
export { BufferGeometryLoader } from './loaders/BufferGeometryLoader.js';
export { DefaultLoadingManager, LoadingManager } from './loaders/LoadingManager.js';
export { ImageLoader } from './loaders/ImageLoader.js';
export { ImageBitmapLoader } from './loaders/ImageBitmapLoader.js';
export { FileLoader } from './loaders/FileLoader.js';
export { Loader } from './loaders/Loader.js';
export { LoaderUtils } from './loaders/LoaderUtils.js';
export { Cache } from './loaders/Cache.js';
export { AudioLoader } from './loaders/AudioLoader.js';
export { FocusedSignal } from './signals/FocusedSignal.js';
export { PointSignal } from './signals/PointSignal.js';
export { AreaSignal } from './signals/AreaSignal.js';
export { HemisphereSignal } from './signals/HemisphereSignal.js';
export { RankedSignal } from './signals/RankedSignal.js';
export { AmbientSignal } from './signals/AmbientSignal.js';
export { Signal } from './signals/Signal.js';
export { SignalEcho } from './signals/SignalEcho.js';
export { SignalProbe } from './signals/SignalProbe.js';
export { StereoLens } from './lenses/StereoLens.js';
export { PerspectiveLens } from './lenses/PerspectiveLens.js';
export { OrthographicLens } from './lenses/OrthographicLens.js';
export { SheetLens } from './lenses/SheetLens.js';
export { ArrayLens } from './lenses/ArrayLens.js';
export { Lens } from './lenses/Lens.js';
export { AudioListener } from './audio/AudioListener.js';
export { PositionalAudio } from './audio/PositionalAudio.js';
export { AudioContext } from './audio/AudioContext.js';
export { AudioAnalyser } from './audio/AudioAnalyser.js';
export { Audio } from './audio/Audio.js';
export { VectorKeyframeTrack } from './animation/tracks/VectorKeyframeTrack.js';
export { StringKeyframeTrack } from './animation/tracks/StringKeyframeTrack.js';
export { QuaternionKeyframeTrack } from './animation/tracks/QuaternionKeyframeTrack.js';
export { NumberKeyframeTrack } from './animation/tracks/NumberKeyframeTrack.js';
export { ColorKeyframeTrack } from './animation/tracks/ColorKeyframeTrack.js';
export { BooleanKeyframeTrack } from './animation/tracks/BooleanKeyframeTrack.js';
export { PropertyMixer } from './animation/PropertyMixer.js';
export { PropertyBinding } from './animation/PropertyBinding.js';
export { KeyframeTrack } from './animation/KeyframeTrack.js';
export { AnimationUtils } from './animation/AnimationUtils.js';
export { AnimationObjectGroup } from './animation/AnimationObjectGroup.js';
export { AnimationMixer } from './animation/AnimationMixer.js';
export { AnimationClip } from './animation/AnimationClip.js';
export { AnimationAction } from './animation/AnimationAction.js';
export { FeedTarget } from './core/FeedTarget.js';
export { RenderTarget3D } from './core/FeedTarget3D.js';
export { Binding } from './core/Binding.js';
export { BindingGroup } from './core/BindingGroup.js';
export { RepeatedLayoutGeometry } from './core/RepeatedLayoutGeometry.js';
export { Layout } from './core/Layout.js';
export { InterleavedMediaAttribute } from './core/InterleavedMediaAttribute.js';
export { RepeatedInterleavedMedia } from './core/RepeatedInterleavedMedia.js';
export { InterleavedMedia } from './core/InterleavedMedia.js';
export { RepeatedLayoutAttribute } from './core/RepeatedLayoutAttribute.js';
export { GLBindingAttribute } from './core/GLBindingAttribute.js';
export * from './core/LayoutAttribute.js';
export { Node } from './core/Node.js';
export { Raycaster } from './core/Raycaster.js';
export { Layers } from './core/Layers.js';
export { EventDispatcher } from './core/EventDispatcher.js';
export { Clock } from './core/Clock.js';
export { Timer } from './core/Timer.js';
export { QuaternionLinearInterpolant } from './math/interpolants/QuaternionLinearInterpolant.js';
export { LinearInterpolant } from './math/interpolants/LinearInterpolant.js';
export { DiscreteInterpolant } from './math/interpolants/DiscreteInterpolant.js';
export { CubicInterpolant } from './math/interpolants/CubicInterpolant.js';
export { BezierInterpolant } from './math/interpolants/BezierInterpolant.js';
export { Interpolant } from './math/Interpolant.js';
export { Triangle } from './math/Triangle.js';
export { MathUtils } from './math/MathUtils.js';
export { Spherical } from './math/Spherical.js';
export { Cylindrical } from './math/Cylindrical.js';
export { Plane } from './math/Plane.js';
export { Frustum } from './math/Frustum.js';
export { FrustumArray } from './math/FrustumArray.js';
export { Sphere } from './math/Sphere.js';
export { Ray } from './math/Ray.js';
export { Matrix4 } from './math/Matrix4.js';
export { Matrix3 } from './math/Matrix3.js';
export { Matrix2 } from './math/Matrix2.js';
export { Box3 } from './math/Box3.js';
export { Box2 } from './math/Box2.js';
export { Line3 } from './math/Line3.js';
export { Euler } from './math/Euler.js';
export { Vector4 } from './math/Vector4.js';
export { Vector3 } from './math/Vector3.js';
export { Vector2 } from './math/Vector2.js';
export { Quaternion } from './math/Quaternion.js';
export { Color } from './math/Color.js';
export { ColorManagement } from './math/ColorManagement.js';
export { SphericalHarmonics3 } from './math/SphericalHarmonics3.js';
export { SpotLightHelper } from './helpers/SpotLightHelper.js';
export { SkeletonHelper } from './helpers/SkeletonHelper.js';
export { PointLightHelper } from './helpers/PointLightHelper.js';
export { HemisphereLightHelper } from './helpers/HemisphereLightHelper.js';
export { GridHelper } from './helpers/GridHelper.js';
export { PolarGridHelper } from './helpers/PolarGridHelper.js';
export { DirectionalLightHelper } from './helpers/DirectionalLightHelper.js';
export { CameraHelper } from './helpers/CameraHelper.js';
export { BoxHelper } from './helpers/BoxHelper.js';
export { Box3Helper } from './helpers/Box3Helper.js';
export { PlaneHelper } from './helpers/PlaneHelper.js';
export { ArrowHelper } from './helpers/ArrowHelper.js';
export { AxesHelper } from './helpers/AxesHelper.js';
export * from './extras/curves/Curves.js';
export { Shape } from './extras/core/Shape.js';
export { Path } from './extras/core/Path.js';
export { ShapePath } from './extras/core/ShapePath.js';
export { CurvePath } from './extras/core/CurvePath.js';
export { Curve } from './extras/core/Curve.js';
export { Controls } from './extras/Controls.js';
export { DataUtils } from './extras/DataUtils.js';
export { ImageUtils } from './extras/ImageUtils.js';
export { ShapeUtils } from './extras/ShapeUtils.js';
export { TextureUtils } from './extras/TextureUtils.js';
export { createCanvasElement, setConsoleFunction, getConsoleFunction, log, warn, error, warnOnce } from './utils.js';
export * from './constants.js';
export * from './Vessert.Legacy.js';

if ( typeof __VESSERT_DEVTOOLS__ !== 'undefined' ) {

	__VESSERT_DEVTOOLS__.dispatchEvent( new CustomEvent( 'register', { detail: {
		revision: REVISION,
	} } ) );

}

if ( typeof window !== 'undefined' ) {

	if ( window.__VESSERT_ID__ ) {

		warn( 'WARNING: Multiple instances of Vessert.js being imported.' );

	} else {

		window.__VESSERT_ID__ = REVISION;

	}

}
