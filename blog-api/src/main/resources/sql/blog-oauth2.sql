CREATE TABLE `autz_user` (
  `user_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '用户表ID',
  `name` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '用户姓名',
  `username` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '用户密码',
  `email` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '用户邮箱',
  `last_login_ip` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '最后登录IP',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `enable` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效（1：有效 0：无效）',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `USERNAME_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户表'


CREATE TABLE `autz_role` (
  `role_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '角色表ID',
  `role_name` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '角色名称',
  `role_code` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '角色CODE',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` smallint(6) DEFAULT NULL COMMENT '状态(0：删除 1：正常)',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色表'


		  
CREATE TABLE `autz_user_role` (
  `user_role_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '用户角色关联表ID',
  `user_id` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '用户ID',
  `role_id` varchar(32) COLLATE utf8_bin DEFAULT NULL COMMENT '角色表ID',
  `remark` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '说明',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`user_role_id`),
  KEY `fk_reference_3` (`user_id`),
  KEY `fk_reference_6` (`role_id`),
  CONSTRAINT `fk_reference_3` FOREIGN KEY (`user_id`) REFERENCES `autz_user` (`user_id`),
  CONSTRAINT `fk_reference_6` FOREIGN KEY (`role_id`) REFERENCES `autz_role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户多权限配置表'


CREATE TABLE `security_client` (
  `client_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT '客户端ID',
  `name` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '名称',
  `secret` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '秘钥',
  `remark` varchar(500) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `status` varchar(4) COLLATE utf8_bin DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='OAUTH2客户端(SECURITY_CLIENT)'



CREATE TABLE `security_access` (
  `access_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '通道ID',
  `client_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '客户端ID',
  `user_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '用户ID',
  `access_token` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '访问令牌',
  `refresh_token` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '刷新令牌',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `expire_in` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '访问令牌失效时间',
  `REFRESH_TOKEN_VALIDITY` int(11) DEFAULT NULL COMMENT 'refreshtoken有效时间',
  `ACCESS_TOKEN_UPDATE_TIME` datetime DEFAULT NULL COMMENT 'ACCESS更新时间',
  PRIMARY KEY (`access_id`),
  UNIQUE KEY `update_token` (`client_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='OAUTH2 TOKEN(SECURITY_ACCESS)'






  

