# ts-express-orm-template
Web service template using typescript, express, and typeorm.

## How to

1. Clone this repository

```sh
$ git clone https://github.com/novemberde/ts-express-orm-template
```

2. Install packages

```sh
$ cd ts-express-orm-template
$ npm install
```

3. Start mysql

```sh
# Docker is very simple to use on testing.
$ docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 mysql:5.7.23

# Initialize a database on mysql. Type password on 'Enter password'
$ docker exec -it my-mysql mysql -u root -p
Enter password: [Type your password]

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.23 MySQL Community Server (GPL)

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

# Create 'test' database
mysql> create database test;
```

4. Start a express server

```sh
$ npm start

> ts-express-orm-template@1.0.0 start /Users/kyuhyunbyun/WorkSpace/_/precium/ts-express-orm-template
> nodemon --watch src --delay 1 --exec 'ts-node' src/www.ts

[nodemon] 1.18.5
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: /Users/kyuhyunbyun/WorkSpace/_/precium/ts-express-orm-template/src/**/*
[nodemon] starting `ts-node src/www.ts`
Server is running at 3000
query: START TRANSACTION
query: SELECT DATABASE() AS `db_name`
query: SELECT * FROM `INFORMATION_SCHEMA`.`TABLES` WHERE (`TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'user')
query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE (`TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'user')
query: SELECT * FROM `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` WHERE `CONSTRAINT_NAME` = 'PRIMARY' AND ((`TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'user'))
query: SELECT `SCHEMA_NAME`, `DEFAULT_CHARACTER_SET_NAME` as `CHARSET`, `DEFAULT_COLLATION_NAME` AS `COLLATION` FROM `INFORMATION_SCHEMA`.`SCHEMATA`
query: SELECT `s`.* FROM `INFORMATION_SCHEMA`.`STATISTICS` `s` LEFT JOIN `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS` `rc` ON `s`.`INDEX_NAME` = `rc`.`CONSTRAINT_NAME` WHERE ((`s`.`TABLE_SCHEMA` = 'test' AND `s`.`TABLE_NAME` = 'user')) AND `s`.`INDEX_NAME` != 'PRIMARY' AND `rc`.`CONSTRAINT_NAME` IS NULL
query: SELECT `kcu`.`TABLE_SCHEMA`, `kcu`.`TABLE_NAME`, `kcu`.`CONSTRAINT_NAME`, `kcu`.`COLUMN_NAME`, `kcu`.`REFERENCED_TABLE_SCHEMA`, `kcu`.`REFERENCED_TABLE_NAME`, `kcu`.`REFERENCED_COLUMN_NAME`, `rc`.`DELETE_RULE` `ON_DELETE`, `rc`.`UPDATE_RULE` `ON_UPDATE` FROM `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu` INNER JOIN `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS` `rc` ON `rc`.`constraint_name` = `kcu`.`constraint_name` WHERE (`kcu`.`TABLE_SCHEMA` = 'test' AND `kcu`.`TABLE_NAME` = 'user')
query: ALTER TABLE `user` CHANGE `deletedAt` `deletedAt` timestamp NULL
query: COMMIT
```


Done!!

## Todo

- [X] Auto restart using nodemon
- [ ] Webpack support
- [ ] Server Side Rendering support
- [ ] Server Side Rendering support

## Liscense

Provided under the terms of the [MIT license](/LICENSE)