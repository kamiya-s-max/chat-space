# README

# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, add_index|
|email|string|null: false, unique: true, add_index|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups, through: :group_users
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :users, through: :group_users
## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true, add_index|
|group_id|integer|null: false, foreign_key: true, add_index|
### Association
- belongs_to :group
- belongs_to :user
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true, add_index|
|group_id|integer|null: false, foreign_key: true, add_index|
### Association
- belongs_to :group
- belongs_to :user