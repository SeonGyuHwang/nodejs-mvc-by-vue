create table board (
	idx int(11) unsigned auto_increment comment 'PK' primary key,
	user_email VARCHAR(100) not null comment '로그인 아이디',
	title VARCHAR(100) not null comment '제목',
	contents TEXT COMMENT '내용',
	del_yn enum('Y', 'N') default 'N' comment '삭제여부',
	created_date DATETIME default CURRENT_TIMESTAMP not null,
	created_id VARCHAR(100) not null,
	updated_date DATETIME default null,
	updated_id VARCHAR(100) default null
) ENGINE=InnoDB CHARSET UTF8
;

create index user_email_del_yn
	on board (user_email, del_yn)
;
