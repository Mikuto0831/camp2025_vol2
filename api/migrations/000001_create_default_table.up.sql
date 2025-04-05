-- 拡張機能（PostGIS用）
CREATE EXTENSION IF NOT EXISTS postgis;

BEGIN;

-- ユーザータイプ
CREATE TABLE IF NOT EXISTS user_type (
    id UUID PRIMARY KEY,
    type VARCHAR(16) NOT NULL -- 例: "domain", "general", "admin"
);

-- ユーザー
CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY,
    uid UUID NOT NULL, -- Firebase UID
    user_type VARCHAR(16) REFERENCES user_type(id) ON DELETE SET NULL,
    name VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL,
    birth DATE NOT NULL,
    sex INTEGER NOT NULL, -- 0: その他, 1: 男, 2: 女
    create_at TIMESTAMP,
    update_at TIMESTAMP,
    delete_at TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE
);

-- 趣味のカテゴリ（例：音楽、Youtube、読書）
CREATE TABLE IF NOT EXISTS hobby (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);

-- 趣味ジャンル（例：Lo-fi, Pop, Jazz など）
CREATE TABLE IF NOT EXISTS genre (
    id SERIAL PRIMARY KEY,
    hobby INTEGER REFERENCES hobby(id) ON DELETE CASCADE,
    name VARCHAR(64) NOT NULL
);

-- 趣味の個別インスタンス（例：好きな楽曲、読んだ本など）
CREATE TABLE IF NOT EXISTS hobby_instance (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES "user"(id) ON DELETE CASCADE,
    hobby_id INTEGER REFERENCES hobby(id) ON DELETE CASCADE,
    title VARCHAR(128) NOT NULL,
    created_by VARCHAR(128) NOT NULL,
    contents_url VARCHAR(256),
    image_url VARCHAR(256),
    geom geometry,
    create_at TIMESTAMP
);

-- 趣味インスタンスとジャンルのマッピング
CREATE TABLE IF NOT EXISTS hobby_map_genre (
    id SERIAL PRIMARY KEY,
    hobby_instance_id UUID REFERENCES hobby_instance(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genre(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_uid ON "user"(uid);
CREATE INDEX idx_hobby_instance_user ON hobby_instance(user_id);
CREATE INDEX idx_hobby_instance_hobby ON hobby_instance(hobby_id);
CREATE INDEX idx_genre_hobby ON genre(hobby);
CREATE INDEX idx_hobby_map_genre_instance ON hobby_map_genre(hobby_instance_id);

INSERT INTO user_type (id, type) VALUES
    ('9ee2e99f-944f-4278-b1d7-ef5c5475cd76', 'domain'),
    ('c31b7734-6581-4457-b05b-6715b21f590c', 'general'),
    ('380de38b-6531-490a-822c-ff74fed8771f', 'admin');

INSERT INTO "user" (uid, user_type, name, email, birth, sex) VALUES
    ('pLCe1daykgdyUli0JKG0vECOGUy2', 'domain', 'mikuto', 'mikuto1227k@gmail.com', '2004-09-23', 1);

COMMIT;
