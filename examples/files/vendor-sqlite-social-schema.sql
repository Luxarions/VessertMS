-- ====================================================================
-- VessertID Universal Social Content Graph Relational Schema
-- Standard: ANSI SQL / PostgreSQL / SQLite 3 (WASM Compatible)
-- ====================================================================

PRAGMA foreign_keys = ON;

-- 1. Identity & Profiles
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    handle TEXT UNIQUE NOT NULL,
    did TEXT UNIQUE, -- Decentralized Identifier (ATProto / W3C DID)
    display_name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    banner_url TEXT,
    is_verified INTEGER DEFAULT 0,
    reputation_score REAL DEFAULT 1.0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

-- 2. Social Graph Edges (Follows, Mutes, Blocks)
CREATE TABLE IF NOT EXISTS social_edges (
    source_user_id TEXT NOT NULL,
    target_user_id TEXT NOT NULL,
    edge_type TEXT NOT NULL, -- "follow", "mute", "block", "close_friend"
    weight REAL DEFAULT 1.0,
    created_at INTEGER NOT NULL,
    PRIMARY KEY (source_user_id, target_user_id, edge_type),
    FOREIGN KEY (source_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (target_user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_social_edges_target ON social_edges(target_user_id, edge_type);

-- 3. Posts & Feed Cards
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL,
    parent_id TEXT, -- For nested thread comments
    root_id TEXT,   -- For thread hierarchy
    post_type TEXT NOT NULL DEFAULT "standard", -- "standard", "reel", "poll", "quote"
    content_text TEXT,
    content_lang TEXT DEFAULT "en",
    uri_atproto TEXT,
    uri_activitypub TEXT,
    visibility TEXT DEFAULT "public", -- "public", "followers", "direct"
    sensitive_flag INTEGER DEFAULT 0,
    rank_score REAL DEFAULT 0.0,
    like_count INTEGER DEFAULT 0,
    repost_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_root_id ON posts(root_id);

-- 4. Media Attachments & Blobs
CREATE TABLE IF NOT EXISTS media_attachments (
    id TEXT PRIMARY KEY,
    post_id TEXT NOT NULL,
    media_type TEXT NOT NULL, -- "image", "video_hls", "audio", "ktx2_texture"
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    width INTEGER,
    height INTEGER,
    duration_sec REAL,
    mime_type TEXT,
    blurhash TEXT,
    alt_text TEXT,
    storage_tier TEXT DEFAULT "cdn_hot", -- "cdn_hot", "opfs_cached", "cold_archive"
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- 5. Social Commerce & EAN Product Catalog Links
CREATE TABLE IF NOT EXISTS product_pins (
    id TEXT PRIMARY KEY,
    post_id TEXT NOT NULL,
    ean_13 TEXT NOT NULL,
    gtin_14 TEXT,
    sku TEXT,
    product_name TEXT NOT NULL,
    price_cents INTEGER NOT NULL,
    currency TEXT DEFAULT "USD",
    pin_x_ratio REAL NOT NULL,
    pin_y_ratio REAL NOT NULL,
    checkout_url TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_product_pins_ean ON product_pins(ean_13);

-- 6. Offline Client Outbox & Sync Queue (CRDT / Optimistic Mutations)
CREATE TABLE IF NOT EXISTS sync_outbox (
    mutation_id TEXT PRIMARY KEY,
    action_type TEXT NOT NULL, -- "create_post", "like", "repost", "follow", "bookmark"
    payload_json TEXT NOT NULL,
    status TEXT DEFAULT "pending", -- "pending", "syncing", "synced", "failed"
    attempt_count INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL
);
