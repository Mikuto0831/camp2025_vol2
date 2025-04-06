-- name: GetUserByUid :one
SELECT * FROM users
WHERE uid = $1
  AND deleted = false;