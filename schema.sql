-- =====================================================
-- 抖音Vue项目 - MySQL数据库初始化脚本
-- 数据库版本: MySQL 8.0+
-- 字符集: utf8mb4
-- =====================================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS `douyin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `douyin`;

-- =====================================================
-- 1. 用户表 (user)
-- =====================================================
CREATE TABLE `user` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
  `uid` VARCHAR(50) UNIQUE NOT NULL COMMENT '用户唯一标识',
  `username` VARCHAR(50) UNIQUE COMMENT '用户名',
  `password` VARCHAR(255) COMMENT '密码(BCrypt加密)',
  `phone` VARCHAR(20) UNIQUE COMMENT '手机号',
  `email` VARCHAR(100) UNIQUE COMMENT '邮箱',
  `nickname` VARCHAR(100) NOT NULL COMMENT '昵称',
  `avatar_168` VARCHAR(500) COMMENT '头像168x168',
  `avatar_300` VARCHAR(500) COMMENT '头像300x300',
  `cover_url` VARCHAR(500) COMMENT '背景图',
  `signature` VARCHAR(500) COMMENT '个人签名',
  `gender` TINYINT DEFAULT 0 COMMENT '性别 0-未知 1-男 2-女',
  `birthday` DATE COMMENT '生日',
  `user_age` INT COMMENT '年龄',
  `province` VARCHAR(50) COMMENT '省份',
  `city` VARCHAR(50) COMMENT '城市',
  `school_name` VARCHAR(200) COMMENT '学校名称',
  `school_department` VARCHAR(200) COMMENT '院系',
  `school_education` VARCHAR(50) COMMENT '学历',
  `school_join_time` BIGINT COMMENT '入学时间',
  `school_display_type` TINYINT DEFAULT 0 COMMENT '学校展示 0-全部 1-仅学校 2-仅自己',
  `followers_count` INT DEFAULT 0 COMMENT '粉丝数',
  `following_count` INT DEFAULT 0 COMMENT '关注数',
  `total_favorited` BIGINT DEFAULT 0 COMMENT '获赞总数',
  `aweme_count` INT DEFAULT 0 COMMENT '作品数',
  `status` TINYINT DEFAULT 1 COMMENT '状态 0-禁用 1-正常',
  `is_verified` BOOLEAN DEFAULT FALSE COMMENT '是否认证',
  `verified_content` VARCHAR(200) COMMENT '认证信息',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_uid (`uid`),
  INDEX idx_phone (`phone`),
  INDEX idx_nickname (`nickname`),
  INDEX idx_followers (`followers_count`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- =====================================================
-- 2. 音乐表 (music)
-- =====================================================
CREATE TABLE `music` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '音乐ID',
  `music_id` VARCHAR(50) UNIQUE COMMENT '音乐唯一标识',
  `title` VARCHAR(200) NOT NULL COMMENT '音乐标题',
  `author` VARCHAR(100) COMMENT '作者',
  `cover_medium` VARCHAR(500) COMMENT '封面图(中)',
  `cover_thumb` VARCHAR(500) COMMENT '封面图(小)',
  `play_url` VARCHAR(500) NOT NULL COMMENT '播放地址',
  `duration` INT COMMENT '时长(秒)',
  `owner_id` BIGINT COMMENT '创作者ID',
  `owner_nickname` VARCHAR(100) COMMENT '创作者昵称',
  `is_original` BOOLEAN DEFAULT FALSE COMMENT '是否原创',
  `user_count` INT DEFAULT 0 COMMENT '使用次数',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_music_id (`music_id`),
  INDEX idx_title (`title`),
  INDEX idx_user_count (`user_count`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='音乐表';

-- =====================================================
-- 3. 视频表 (video)
-- =====================================================
CREATE TABLE `video` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '视频ID',
  `aweme_id` VARCHAR(50) UNIQUE NOT NULL COMMENT '视频唯一标识',
  `author_id` BIGINT NOT NULL COMMENT '作者用户ID',
  `description` TEXT COMMENT '视频描述',
  `video_url` VARCHAR(500) NOT NULL COMMENT '视频播放地址',
  `cover_url` VARCHAR(500) COMMENT '封面图',
  `poster_url` VARCHAR(500) COMMENT '海报图',
  `width` INT COMMENT '视频宽度',
  `height` INT COMMENT '视频高度',
  `duration` INT COMMENT '视频时长(毫秒)',
  `ratio` VARCHAR(20) COMMENT '分辨率标识',
  `file_size` BIGINT COMMENT '文件大小(字节)',
  `music_id` BIGINT COMMENT '音乐ID',
  `type` VARCHAR(50) DEFAULT 'recommend-video' COMMENT '视频类型',
  `is_top` TINYINT DEFAULT 0 COMMENT '是否置顶',
  `private_status` TINYINT DEFAULT 0 COMMENT '隐私状态 0-公开 1-好友可见 2-私密',
  `allow_comment` BOOLEAN DEFAULT TRUE COMMENT '是否允许评论',
  `allow_share` BOOLEAN DEFAULT TRUE COMMENT '是否允许分享',
  `allow_download` BOOLEAN DEFAULT TRUE COMMENT '是否允许下载',
  `status` TINYINT DEFAULT 0 COMMENT '审核状态 0-待审核 1-通过 2-拒绝',
  `is_delete` BOOLEAN DEFAULT FALSE COMMENT '是否删除',
  `view_count` BIGINT DEFAULT 0 COMMENT '播放次数',
  `digg_count` BIGINT DEFAULT 0 COMMENT '点赞数',
  `comment_count` INT DEFAULT 0 COMMENT '评论数',
  `collect_count` INT DEFAULT 0 COMMENT '收藏数',
  `share_count` INT DEFAULT 0 COMMENT '分享数',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`music_id`) REFERENCES `music`(`id`) ON DELETE SET NULL,
  INDEX idx_aweme_id (`aweme_id`),
  INDEX idx_author_id (`author_id`),
  INDEX idx_created_at (`created_at`),
  INDEX idx_digg_count (`digg_count`),
  INDEX idx_status (`status`, `is_delete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='视频表';

-- =====================================================
-- 4. 评论表 (comment)
-- =====================================================
CREATE TABLE `comment` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '评论ID',
  `video_id` BIGINT NOT NULL COMMENT '视频ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `parent_id` BIGINT DEFAULT NULL COMMENT '父评论ID(一级评论为NULL)',
  `reply_to_user_id` BIGINT DEFAULT NULL COMMENT '回复的用户ID',
  `content` TEXT NOT NULL COMMENT '评论内容',
  `digg_count` INT DEFAULT 0 COMMENT '点赞数',
  `reply_count` INT DEFAULT 0 COMMENT '回复数',
  `ip_location` VARCHAR(100) COMMENT 'IP归属地',
  `is_delete` BOOLEAN DEFAULT FALSE COMMENT '是否删除',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`video_id`) REFERENCES `video`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`parent_id`) REFERENCES `comment`(`id`) ON DELETE CASCADE,
  INDEX idx_video_id (`video_id`),
  INDEX idx_user_id (`user_id`),
  INDEX idx_parent_id (`parent_id`),
  INDEX idx_created_at (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论表';

-- =====================================================
-- 5. 用户关注关系表 (user_follow)
-- =====================================================
CREATE TABLE `user_follow` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '关系ID',
  `follower_id` BIGINT NOT NULL COMMENT '关注者ID',
  `following_id` BIGINT NOT NULL COMMENT '被关注者ID',
  `status` TINYINT DEFAULT 1 COMMENT '关注状态 1-关注 0-取消关注',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`follower_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`following_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_follow` (`follower_id`, `following_id`),
  INDEX idx_follower (`follower_id`),
  INDEX idx_following (`following_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户关注关系表';

-- =====================================================
-- 6. 视频点赞表 (video_like)
-- =====================================================
CREATE TABLE `video_like` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '点赞ID',
  `video_id` BIGINT NOT NULL COMMENT '视频ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `status` TINYINT DEFAULT 1 COMMENT '点赞状态 1-点赞 0-取消',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`video_id`) REFERENCES `video`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_video_like` (`video_id`, `user_id`),
  INDEX idx_user_id (`user_id`),
  INDEX idx_video_id (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='视频点赞表';

-- =====================================================
-- 7. 视频收藏表 (video_collect)
-- =====================================================
CREATE TABLE `video_collect` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '收藏ID',
  `video_id` BIGINT NOT NULL COMMENT '视频ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `folder_id` BIGINT DEFAULT NULL COMMENT '收藏夹ID(可选)',
  `status` TINYINT DEFAULT 1 COMMENT '收藏状态 1-收藏 0-取消',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`video_id`) REFERENCES `video`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_video_collect` (`video_id`, `user_id`),
  INDEX idx_user_id (`user_id`),
  INDEX idx_folder_id (`folder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='视频收藏表';

-- =====================================================
-- 8. 评论点赞表 (comment_like)
-- =====================================================
CREATE TABLE `comment_like` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '点赞ID',
  `comment_id` BIGINT NOT NULL COMMENT '评论ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `status` TINYINT DEFAULT 1 COMMENT '点赞状态 1-点赞 0-取消 2-踩',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_comment_like` (`comment_id`, `user_id`),
  INDEX idx_user_id (`user_id`),
  INDEX idx_comment_id (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论点赞表';

-- =====================================================
-- 9. 消息表 (message)
-- =====================================================
CREATE TABLE `message` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '消息ID',
  `from_user_id` BIGINT NOT NULL COMMENT '发送者ID',
  `to_user_id` BIGINT NOT NULL COMMENT '接收者ID',
  `conversation_id` VARCHAR(100) NOT NULL COMMENT '会话ID',
  `content` TEXT COMMENT '消息内容',
  `content_type` TINYINT DEFAULT 1 COMMENT '消息类型 1-文本 2-图片 3-视频 4-语音 5-红包',
  `media_url` VARCHAR(500) COMMENT '媒体文件URL',
  `is_read` BOOLEAN DEFAULT FALSE COMMENT '是否已读',
  `is_delete` BOOLEAN DEFAULT FALSE COMMENT '是否删除',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
  FOREIGN KEY (`from_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`to_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  INDEX idx_conversation_id (`conversation_id`),
  INDEX idx_from_user (`from_user_id`),
  INDEX idx_to_user (`to_user_id`),
  INDEX idx_created_at (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='聊天消息表';

-- =====================================================
-- 10. 通知表 (notification)
-- =====================================================
CREATE TABLE `notification` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '通知ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `type` TINYINT NOT NULL COMMENT '通知类型 1-点赞 2-评论 3-关注 4-系统',
  `content` TEXT COMMENT '通知内容',
  `related_id` BIGINT COMMENT '关联ID(视频/评论/用户)',
  `is_read` BOOLEAN DEFAULT FALSE COMMENT '是否已读',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  INDEX idx_user_id (`user_id`),
  INDEX idx_type (`type`),
  INDEX idx_is_read (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='通知表';

-- =====================================================
-- 11. 标签/话题表 (hashtag)
-- =====================================================
CREATE TABLE `hashtag` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '话题ID',
  `hashtag_id` VARCHAR(50) UNIQUE COMMENT '话题唯一标识',
  `name` VARCHAR(100) NOT NULL COMMENT '话题名称',
  `description` TEXT COMMENT '话题描述',
  `view_count` BIGINT DEFAULT 0 COMMENT '浏览次数',
  `video_count` INT DEFAULT 0 COMMENT '视频数量',
  `cover_url` VARCHAR(500) COMMENT '封面图',
  `is_commerce` BOOLEAN DEFAULT FALSE COMMENT '是否商业话题',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_name (`name`),
  INDEX idx_view_count (`view_count`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='话题表';

-- =====================================================
-- 12. 视频标签关联表 (video_hashtag)
-- =====================================================
CREATE TABLE `video_hashtag` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '关联ID',
  `video_id` BIGINT NOT NULL COMMENT '视频ID',
  `hashtag_id` BIGINT NOT NULL COMMENT '话题ID',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  FOREIGN KEY (`video_id`) REFERENCES `video`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_video_hashtag` (`video_id`, `hashtag_id`),
  INDEX idx_video_id (`video_id`),
  INDEX idx_hashtag_id (`hashtag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='视频标签关联表';

-- =====================================================
-- 13. 用户浏览历史表 (video_history)
-- =====================================================
CREATE TABLE `video_history` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '历史ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `video_id` BIGINT NOT NULL COMMENT '视频ID',
  `watch_duration` INT DEFAULT 0 COMMENT '观看时长(秒)',
  `watch_progress` DECIMAL(5,2) DEFAULT 0 COMMENT '观看进度(百分比)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '观看时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`video_id`) REFERENCES `video`(`id`) ON DELETE CASCADE,
  INDEX idx_user_id (`user_id`),
  INDEX idx_video_id (`video_id`),
  INDEX idx_created_at (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='视频浏览历史表';

-- =====================================================
-- 14. 商品表 (shop_product)
-- =====================================================
CREATE TABLE `shop_product` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '商品ID',
  `product_id` VARCHAR(50) UNIQUE COMMENT '商品唯一标识',
  `name` VARCHAR(200) NOT NULL COMMENT '商品名称',
  `description` TEXT COMMENT '商品描述',
  `price` DECIMAL(10,2) NOT NULL COMMENT '价格',
  `original_price` DECIMAL(10,2) COMMENT '原价',
  `cover_url` VARCHAR(500) COMMENT '封面图',
  `images` TEXT COMMENT '商品图片(JSON数组)',
  `category` VARCHAR(100) COMMENT '分类',
  `stock` INT DEFAULT 0 COMMENT '库存',
  `sales` INT DEFAULT 0 COMMENT '销量',
  `status` TINYINT DEFAULT 1 COMMENT '状态 0-下架 1-上架',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_product_id (`product_id`),
  INDEX idx_category (`category`),
  INDEX idx_sales (`sales`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品表';

-- =====================================================
-- 初始化测试数据
-- =====================================================

-- 插入测试用户
INSERT INTO `user` (`uid`, `nickname`, `avatar_168`, `avatar_300`, `signature`, `gender`, `province`, `city`, `followers_count`, `following_count`, `total_favorited`, `aweme_count`) VALUES
('24058267831', '彭十六elf', 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_99d3a4923c94e1e27b16209743eaec24~c5_168x168.jpeg', 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_99d3a4923c94e1e27b16209743eaec24~c5_300x300.jpeg', '把东方美学带到欧洲', 2, '北京', '北京市', 234500, 156, 6400077, 359),
('test_user_001', '测试用户1', 'https://via.placeholder.com/168', 'https://via.placeholder.com/300', '这是测试用户1', 1, '广东', '广州市', 1000, 500, 50000, 50),
('test_user_002', '测试用户2', 'https://via.placeholder.com/168', 'https://via.placeholder.com/300', '这是测试用户2', 2, '上海', '上海市', 2000, 800, 100000, 100);

-- 插入测试音乐
INSERT INTO `music` (`music_id`, `title`, `author`, `play_url`, `duration`, `owner_nickname`, `is_original`, `user_count`) VALUES
('7267478542388760000', '@彭十六elf创作的原声', '彭十六elf', 'https://sf5-hl-cdn-tos.douyinstatic.com/obj/ies-music/7267478540864572197.mp3', 25, '彭十六elf', TRUE, 0);

-- 插入测试话题
INSERT INTO `hashtag` (`hashtag_id`, `name`, `view_count`, `video_count`) VALUES
('1583784381403150', '卢浮宫', 5000000, 1234),
('1618019281021965', '马面裙', 8000000, 5678);

-- 初始化完成
SELECT '数据库初始化完成！' AS 'Status';
SELECT CONCAT('共创建 ', COUNT(*), ' 张表') AS 'Table Count' FROM information_schema.tables WHERE table_schema = 'douyin';
