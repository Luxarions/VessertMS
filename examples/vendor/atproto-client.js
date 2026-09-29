import { ATProtoFeedPost, ATProtoFeedLike, ATProtoFeedRepost } from '../../src/Constants.js';

/**
 * AT Protocol (Bluesky) XRPC client and record synthesizer.
 * Formats standard data repository records according to ATProto lexicons.
 */
class ATProtoClient {

	/**
	 * Creates an ATProto client.
	 *
	 * @param {string} pdsEndpoint - Personal Data Server endpoint URL.
	 * @param {string} [did=''] - Decentralized Identifier of the authenticated user.
	 */
	constructor( pdsEndpoint = 'https://bsky.social', did = '' ) {

		this.pdsEndpoint = pdsEndpoint.replace( /\/+$/, '' );
		this.did = did;

	}

	/**
	 * Generates a standard Tid (timestamp-based record identifier).
	 *
	 * @return {string} 13-character base32 TID.
	 */
	static createTid() {

		const s32 = '234567abcdefghijklmnopqrstuvwxyz';
		let now = Math.floor( Date.now() * 1000 );
		let out = '';

		for ( let i = 0; i < 11; i ++ ) {

			out = s32[ now % 32 ] + out;
			now = Math.floor( now / 32 );

		}

		out += '22';
		return out;

	}

	/**
	 * Creates an app.bsky.feed.post record payload.
	 *
	 * @param {string} text - Post text content.
	 * @param {Object} [options={}] - Optional facets, reply parents, or embeds.
	 * @return {Object} Valid record payload.
	 */
	createPostRecord( text, options = {} ) {

		const record = {
			$type: ATProtoFeedPost,
			text: text,
			createdAt: new Date().toISOString(),
			langs: options.langs || [ 'en' ]
		};

		if ( options.reply ) {

			record.reply = options.reply;

		}

		if ( options.embed ) {

			record.embed = options.embed;

		}

		if ( options.facets ) {

			record.facets = options.facets;

		}

		return {
			collection: ATProtoFeedPost,
			repo: this.did,
			rkey: ATProtoClient.createTid(),
			record: record
		};

	}

	/**
	 * Creates an app.bsky.feed.like record payload.
	 *
	 * @param {string} uri - Strong reference subject URI.
	 * @param {string} cid - Strong reference subject CID hash.
	 * @return {Object} Valid like record payload.
	 */
	createLikeRecord( uri, cid ) {

		return {
			collection: ATProtoFeedLike,
			repo: this.did,
			rkey: ATProtoClient.createTid(),
			record: {
				$type: ATProtoFeedLike,
				subject: { uri, cid },
				createdAt: new Date().toISOString()
			}
		};

	}

	/**
	 * Creates an app.bsky.feed.repost record payload.
	 *
	 * @param {string} uri - Strong reference subject URI.
	 * @param {string} cid - Strong reference subject CID hash.
	 * @return {Object} Valid repost record payload.
	 */
	createRepostRecord( uri, cid ) {

		return {
			collection: ATProtoFeedRepost,
			repo: this.did,
			rkey: ATProtoClient.createTid(),
			record: {
				$type: ATProtoFeedRepost,
				subject: { uri, cid },
				createdAt: new Date().toISOString()
			}
		};

	}

}

export { ATProtoClient };
