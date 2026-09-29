import { ActivityCreate, ActivityAnnounce, ActivityLike, ActivityFollow, ActivityUndo } from '../../src/Constants.js';

/**
 * W3C ActivityPub and ActivityStreams 2.0 client and payload builder.
 * Serializes standard federation activities for decentralized social networks.
 */
class ActivityPubClient {

	/**
	 * Creates an ActivityPubClient.
	 *
	 * @param {Object} actor - The local federated actor profile.
	 * @param {string} actor.id - Canonical URI for the actor.
	 * @param {string} actor.inbox - Actor inbox endpoint URI.
	 * @param {string} actor.outbox - Actor outbox endpoint URI.
	 */
	constructor( actor = {} ) {

		this.actor = actor;
		this.context = 'https://www.w3.org/ns/activitystreams';

	}

	/**
	 * Wraps an object into a W3C Activity envelope.
	 *
	 * @param {string} type - ActivityStreams verb (e.g. Create, Like, Announce).
	 * @param {Object} object - Target object payload.
	 * @param {Object} [meta={}] - Additional metadata.
	 * @return {Object} Valid ActivityStreams 2.0 JSON-LD activity object.
	 */
	createActivity( type, object, meta = {} ) {

		return {
			'@context': this.context,
			id: `${this.actor.outbox || 'urn:vessert:act'}/${Date.now()}-${Math.random().toString( 36 ).slice( 2, 7 )}`,
			type: type,
			actor: this.actor.id,
			published: new Date().toISOString(),
			to: meta.to || [ 'https://www.w3.org/ns/activitystreams#Public' ],
			cc: meta.cc || ( this.actor.followers ? [ this.actor.followers ] : [] ),
			object: object
		};

	}

	/**
	 * Creates a Note post publication activity.
	 *
	 * @param {string} content - HTML or markdown post text content.
	 * @param {Array<Object>} [attachments=[]] - Image or video media attachments.
	 * @param {Object} [meta={}] - Visibility options.
	 * @return {Object} Create activity.
	 */
	buildPostNote( content, attachments = [], meta = {} ) {

		const note = {
			id: `${this.actor.id}/notes/${Date.now()}`,
			type: 'Note',
			attributedTo: this.actor.id,
			content: content,
			published: new Date().toISOString(),
			to: meta.to || [ 'https://www.w3.org/ns/activitystreams#Public' ],
			attachment: attachments.map( a => ( {
				type: 'Document',
				mediaType: a.mediaType || 'image/jpeg',
				url: a.url,
				name: a.altText || ''
			} ) )
		};

		return this.createActivity( ActivityCreate, note, meta );

	}

	/**
	 * Builds a Like reaction activity.
	 *
	 * @param {string} objectId - Target note/post URI.
	 * @return {Object} Like activity.
	 */
	buildLike( objectId ) {

		return this.createActivity( ActivityLike, objectId );

	}

	/**
	 * Builds an Announce (repost/boost) activity.
	 *
	 * @param {string} objectId - Target post URI.
	 * @return {Object} Announce activity.
	 */
	buildAnnounce( objectId ) {

		return this.createActivity( ActivityAnnounce, objectId );

	}

	/**
	 * Builds a Follow subscription activity.
	 *
	 * @param {string} targetActorId - Target federated user URI.
	 * @return {Object} Follow activity.
	 */
	buildFollow( targetActorId ) {

		return this.createActivity( ActivityFollow, targetActorId );

	}

	/**
	 * Builds an Undo activity to revoke a previous action (e.g. unlike, unboost).
	 *
	 * @param {Object} activityToUndo - The previously published activity.
	 * @return {Object} Undo activity.
	 */
	buildUndo( activityToUndo ) {

		return this.createActivity( ActivityUndo, activityToUndo );

	}

}

export { ActivityPubClient };
