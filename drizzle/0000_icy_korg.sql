CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`todoId` integer
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`finished` integer DEFAULT 0,
	`alarmDate` integer DEFAULT 0,
	`priority` integer DEFAULT 0
);
