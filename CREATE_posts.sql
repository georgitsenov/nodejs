CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `view_count` int(10) unsigned NOT NULL DEFAULT '0',
  `user_id` int(10) unsigned DEFAULT NULL,
  `active` enum('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `fk_posts_1_idx` (`user_id`),
  CONSTRAINT `fk_posts_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8
