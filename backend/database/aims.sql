-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 22, 2024 lúc 03:25 PM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `aims`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book`
--

CREATE TABLE `book` (
  `id` bigint(20) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `cover_type` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `number_of_pages` int(11) NOT NULL,
  `publication_date` datetime(6) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `book`
--

INSERT INTO `book` (`id`, `author`, `cover_type`, `genre`, `language`, `number_of_pages`, `publication_date`, `publisher`) VALUES
(6, 'J.K. Rowling', 'Hardcover', 'Fantasy', 'English', 309, '1997-06-26 00:00:00.000000', 'Bloomsbury'),
(10, 'J.R.R. Tolkien', 'Hardcover', 'Fantasy', 'English', 310, '1937-09-21 00:00:00.000000', 'George Allen & Unwin'),
(14, 'George Orwell', 'Paperback', 'Dystopian', 'English', 328, '1949-06-08 00:00:00.000000', 'Secker & Warburg'),
(18, 'Jane Austen', 'Hardcover', 'Romance', 'English', 279, '1813-01-28 00:00:00.000000', 'T. Egerton');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `subtotal` double DEFAULT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`subtotal`, `id`) VALUES
(2100000, 301),
(NULL, 302),
(710000, 303),
(NULL, 304),
(200000, 305),
(NULL, 306),
(410000, 307),
(NULL, 308),
(200000, 309),
(NULL, 310),
(780000, 311),
(NULL, 312),
(760000, 313),
(NULL, 314),
(2120000, 315),
(1200000, 322),
(NULL, 323),
(740000, 324),
(NULL, 325),
(NULL, 326);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_product`
--

CREATE TABLE `cart_product` (
  `qty` int(11) NOT NULL,
  `cart_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `cart_product`
--

INSERT INTO `cart_product` (`qty`, `cart_id`, `product_id`) VALUES
(1, 301, 2),
(1, 301, 3),
(1, 301, 4),
(1, 301, 5),
(1, 301, 6),
(1, 301, 10),
(1, 301, 11),
(1, 301, 15),
(1, 301, 16),
(2, 303, 2),
(2, 303, 18),
(1, 303, 24),
(1, 305, 2),
(1, 307, 3),
(1, 307, 4),
(1, 309, 2),
(2, 311, 2),
(2, 311, 3),
(1, 313, 2),
(1, 313, 3),
(1, 313, 6),
(1, 313, 8),
(2, 315, 6),
(2, 315, 12),
(2, 315, 15),
(2, 315, 16),
(2, 322, 2),
(2, 322, 3),
(2, 322, 6),
(1, 324, 2),
(2, 324, 3),
(1, 324, 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cd`
--

CREATE TABLE `cd` (
  `id` bigint(20) NOT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `record_label` varchar(255) DEFAULT NULL,
  `release_date` datetime(6) DEFAULT NULL,
  `tracklist` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `cd`
--

INSERT INTO `cd` (`id`, `artist`, `genre`, `record_label`, `release_date`, `tracklist`) VALUES
(3, 'The Beatles', 'Rock', 'Apple Records', '1969-09-26 00:00:00.000000', 'Come Together, Something, Maxwell\'s Silver Hammer, etc.'),
(8, 'Michael Jackson', 'Pop', 'Epic Records', '1982-11-30 00:00:00.000000', 'Wanna Be Startin\' Somethin\', Thriller, Beat It...'),
(12, 'Pink Floyd', 'Rock', 'Harvest Records', '1973-03-01 00:00:00.000000', 'Speak to Me, Breathe, On the Run...'),
(16, 'Led Zeppelin', 'Rock', 'Atlantic Records', '1971-11-08 00:00:00.000000', 'Black Dog, Rock and Roll, Stairway to Heaven...'),
(20, 'The Beatles', 'Rock', 'Parlophone', '1967-05-26 00:00:00.000000', 'Sgt. Pepper\'s Lonely Hearts Club Band, With a Little Help from My Friends...');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `delivery_info`
--

CREATE TABLE `delivery_info` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `delivery_time` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `instructions` varchar(255) DEFAULT NULL,
  `is_rush_order` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `delivery_info`
--

INSERT INTO `delivery_info` (`id`, `address`, `delivery_time`, `email`, `instructions`, `is_rush_order`, `name`, `phone`, `province`) VALUES
(5, 'HN', '2024-06-07', 'abc@gmail.com', 'Hello', b'1', 'Hai', '0123456789', '01'),
(6, 'Hai Ba Trung', '2024-06-05', 'abc@gmail.com', 'Nhanh len nhe', b'1', 'Tran Nam', '0123456789', '01'),
(7, '03 ABC Hai ba trung', '2024-06-24', 'admin@gmail.com', 'giao nhanh nhe', b'1', 'Duong ', '0314121412', '01'),
(8, '03 ABC Hai ba trung', '2024-06-19', 'an@gmail.com', 'hello nhanh len nhe', b'1', 'Lê Minh', '0314121412', '01'),
(9, '03 ABC Hai ba trung', NULL, 'hoanghai2003vp@gmail.com', '', b'1', 'Lê Minh Việt Anh', '0866172604', '01'),
(10, '03 ABC Hai ba trung', NULL, 'longhvp03@gmail.com', '', b'1', 'Trần Thị Lan', '0314121412', '89'),
(11, '03 ABC Hai ba trung', NULL, 'an@gmail.com', '', b'1', 'Tran A', '0866172604', '77'),
(12, '03 ABC Hai ba trung', NULL, 'hoanghai2003vp@gmail.com', '', b'0', 'Lê Minh Việt Anh', '0866172604', '01'),
(13, '03 ABC Hai ba trung', '2024-06-19', 'hoanghai2003vp@gmail.com', 'nhanh len nhe', b'1', 'Lê Minh Việt Anh', '0866172604', '01'),
(14, '03 ABC Hai ba trung', '2024-06-19', 'hoanghai2003vp@gmail.com', 'nhanh len nhe', b'1', 'Lê Minh Việt Anh', '0866172604', '01'),
(17, '03 ABC Hai ba trung', '2024-06-27', 'hoanghai2003vp@gmail.com', 'nhanh len nhe', b'1', 'Trần Thị Lan', '0314121412', '01'),
(18, '03 ABC Hai ba trung', NULL, 'hoanghai2003vp@gmail.com', '', b'0', 'Trần Thị Lan', '0314121412', '24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dvd`
--

CREATE TABLE `dvd` (
  `id` bigint(20) NOT NULL,
  `director` varchar(255) DEFAULT NULL,
  `disc_type` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `release_date` datetime(6) DEFAULT NULL,
  `runtime` int(11) NOT NULL,
  `studio` varchar(255) DEFAULT NULL,
  `subtitles` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `dvd`
--

INSERT INTO `dvd` (`id`, `director`, `disc_type`, `genre`, `language`, `release_date`, `runtime`, `studio`, `subtitles`) VALUES
(4, 'Quentin Tarantino', 'Blu-ray', 'Crime', 'English', '1994-10-14 00:00:00.000000', 154, 'Miramax', 'English, Spanish, French'),
(7, 'Christopher Nolan', 'Blu-ray', 'Sci-Fi', 'English', '2010-07-16 00:00:00.000000', 148, 'Warner Bros.', 'English, Spanish, French'),
(11, 'Robert Zemeckis', 'DVD', 'Drama', 'English', '1994-07-06 00:00:00.000000', 142, 'Paramount Pictures', 'English, Spanish'),
(15, 'George Lucas', 'Blu-ray', 'Sci-Fi', 'English', '1977-05-25 00:00:00.000000', 121, '20th Century Fox', 'English, Spanish, French'),
(19, 'Peter Jackson', 'Blu-ray', 'Fantasy', 'English', '2001-12-19 00:00:00.000000', 178, 'New Line Cinema', 'English, Elvish, Spanish');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoice`
--

CREATE TABLE `invoice` (
  `id` bigint(20) NOT NULL,
  `amount` double NOT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `payment_transaction_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `invoice`
--

INSERT INTO `invoice` (`id`, `amount`, `currency`, `order_id`, `payment_transaction_id`) VALUES
(6, 2342000, 'VND', 6, 6),
(7, 850000.0000000001, 'VND', 7, 7),
(9, 220000.00000000003, 'VND', 8, 9),
(11, 458500.00000000006, 'VND', 9, 11),
(13, 232500.00000000003, 'VND', 10, 13),
(15, 860000.0000000001, 'VND', 11, 15),
(17, 868000.0000000001, 'VND', 12, 17),
(19, 2393500, 'VND', 13, 20),
(25, 1374000, 'VND', 16, 25),
(27, 826500.0000000001, 'VND', 17, 27);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lp`
--

CREATE TABLE `lp` (
  `id` bigint(20) NOT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `record_label` varchar(255) DEFAULT NULL,
  `release_date` datetime(6) DEFAULT NULL,
  `tracklist` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `lp`
--

INSERT INTO `lp` (`id`, `artist`, `genre`, `record_label`, `release_date`, `tracklist`) VALUES
(5, 'Various Artists', 'Soundtrack', 'MCA Records', '1985-07-03 00:00:00.000000', 'The Power of Love, Back in Time, Heaven Is One Step Away, etc.'),
(9, 'John Williams', 'Soundtrack', 'MCA Records', '1993-06-11 00:00:00.000000', 'Theme from Jurassic Park, Incident at Isla Nublar...'),
(13, 'Vangelis', 'Soundtrack', 'Atlantic Records', '1982-06-25 00:00:00.000000', 'Main Titles, Blush Response, Wait for Me...'),
(17, 'Various Artists', 'Soundtrack', 'Warner Bros. Records', '1999-03-31 00:00:00.000000', 'Main Title, Trinity Infinity, Neo on the Run...');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `cart_id` bigint(20) DEFAULT NULL,
  `delivery_info_id` bigint(20) DEFAULT NULL,
  `normal_shipping_fees` double DEFAULT NULL,
  `rush_shipping_fees` double DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `cart_id`, `delivery_info_id`, `normal_shipping_fees`, `rush_shipping_fees`, `state`) VALUES
(6, 301, 7, 0, 32000, 'CANCELLED'),
(7, 303, 8, 2000, 67000, 'CANCELLED'),
(8, 305, 9, 0, 0, 'APPROVED'),
(9, 307, 10, 7500, 0, 'REJECTED'),
(10, 309, 11, 12500, 0, 'REJECTED'),
(11, 311, 12, 2000, 0, 'CANCELLED'),
(12, 313, 13, 0, 32000, 'APPROVED'),
(13, 315, 14, 9500, 52000, 'REJECTED'),
(16, 322, 17, 2000, 52000, 'PENDING'),
(17, 324, 18, 12500, 0, 'PENDING');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment_transaction`
--

CREATE TABLE `payment_transaction` (
  `id` bigint(20) NOT NULL,
  `amount` int(11) NOT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `error_code` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `transaction_content` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `transaction_num` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `payment_transaction`
--

INSERT INTO `payment_transaction` (`id`, `amount`, `created_at`, `error_code`, `message`, `transaction_content`, `transaction_id`, `transaction_num`, `payment_method`) VALUES
(6, 2342000, '20240618001450', '00', NULL, 'Payment for order 6', '14464207', '45945326', 'VNPay'),
(7, 850000, '20240618213555', '00', NULL, 'Payment for order 7', '14466019', '01364908', 'VNPay'),
(9, 220000, '20240618215743', '00', NULL, 'Payment for order 8', '14466073', '43634567', 'VNPay'),
(11, 458500, '20240618215851', '00', NULL, 'Payment for order 9', '14466076', '93788390', 'VNPay'),
(13, 232500, '20240618221310', '00', NULL, 'Payment for order 10', '14466105', '26516165', 'VNPay'),
(15, 860000, '20240618223050', '00', NULL, 'Payment for order 11', '14466137', '26958109', 'VNPay'),
(17, 868000, '20240618223912', '00', NULL, 'Payment for order 12', '14466155', '26129912', 'VNPay'),
(20, 2393500, '20240618225800', '00', NULL, 'Payment for order 13', '14466190', '49499869', 'VNPay'),
(25, 1374000, '20240622202200', '00', NULL, 'Payment for order 16', '14473099', '28676479', 'VNPay'),
(27, 826500, '20240622202316', '00', NULL, 'Payment for order 17', '14473103', '34790225', 'VNPay');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `price` double NOT NULL,
  `qty_in_stock` int(11) NOT NULL,
  `rush_order_eligible` bit(1) NOT NULL,
  `weight` double NOT NULL,
  `year` int(11) NOT NULL,
  `id` bigint(20) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`price`, `qty_in_stock`, `rush_order_eligible`, `weight`, `year`, `id`, `category`, `image_url`, `title`, `value`) VALUES
(200000, 18, b'0', 2, 1972, 2, 'DVD', '/poster/image2.jpg', 'The Godfather 2', ''),
(190000, 26, b'0', 1, 1969, 3, 'CD', '/poster/image3.jpg', 'Abbey Road', ''),
(220000, 1, b'0', 1, 1994, 4, 'DVD', '/poster/image4.jpg', 'Pulp Fiction', ''),
(200000, 41, b'0', 1, 1985, 5, 'LP', '/poster/image5.jpg', 'Back to the Future', ''),
(210000, 21, b'1', 2.3, 1997, 6, 'Book', '/poster/image6.jpg', 'Harry Potter and the Sorcerer\'s Stone', '170000'),
(220000, 35, b'0', 2, 2010, 7, 'DVD', '/poster/image7.jpg', 'Inception', '180000'),
(160000, 27, b'0', 1.7, 1982, 8, 'CD', '/poster/image8.jpg', 'Thriller', '120000'),
(230000, 12, b'0', 1.3, 1993, 9, 'LP', '/poster/image9.jpg', 'Jurassic Park', '190000'),
(240000, 45, b'0', 2.1, 1937, 10, 'Book', '/poster/image10.jpg', 'The Hobbit', '200000'),
(250000, 32, b'0', 2.5, 1994, 11, 'DVD', '/poster/image11.jpg', 'Forrest Gump', '210000'),
(260000, 27, b'0', 1.9, 1973, 12, 'CD', '/poster/image12.jpg', 'Dark Side of the Moon', '220000'),
(270000, 14, b'0', 2.8, 1982, 13, 'LP', '/poster/image13.jpg', 'Blade Runner', '230000'),
(280000, 19, b'0', 1.1, 1949, 14, 'Book', '/poster/image14.jpg', '1984', '240000'),
(290000, 50, b'0', 2.6, 1977, 15, 'DVD', '/poster/image15.jpg', 'Star Wars: A New Hope', '250000'),
(300000, 23, b'0', 2.2, 1971, 16, 'CD', '/poster/image16.jpg', 'Led Zeppelin IV', '260000'),
(240000, 11, b'0', 2.4, 1999, 17, 'LP', '/poster/image17.jpg', 'The Matrix', '200000'),
(150000, 38, b'0', 1, 1813, 18, 'Book', '/poster/image18.jpg', 'Pride and Prejudice', '100000'),
(290000, 29, b'0', 1.6, 2001, 19, 'DVD', '/poster/image19.jpg', 'The Lord of the Rings: The Fellowship of the Ring', '250000'),
(280000, 20, b'0', 2.7, 1967, 20, 'CD', '/poster/image20.jpg', 'Sgt. Pepper\'s Lonely Hearts Club Band', '230000'),
(10000, 99, b'1', 10, 2002, 24, 'Book', '/poster/image1.jpg', 'book4', '10000'),
(10000, 100, b'1', 1.98, 2000, 25, 'Book', '/poster/image1.jpg', 'Demo', '10000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` binary(16) NOT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `is_admin` bit(1) NOT NULL DEFAULT b'0',
  `password` longtext NOT NULL,
  `is_manager` bit(1) NOT NULL DEFAULT b'0',
  `address` varchar(255) DEFAULT NULL,
  `blocked` bit(1) NOT NULL DEFAULT b'0',
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `email`, `full_name`, `is_admin`, `password`, `is_manager`, `address`, `blocked`, `phone`) VALUES
(0x39fb720dcd614f87841e3ca1f67c26ed, 'admin@gmail.com', 'Dương Hoàng Hải', b'0', '$2a$10$YBYR5zBMR/ZOdzS2uOY3FOHtC/Gy.VHqopkfc63grRrnUvbDl2s4a', b'1', 'Vĩnh Yên', b'0', '314121412'),
(0x40f26975cb874a59bead90ff25837b8a, 'an@gmail.com', 'Dương Hoàng Hải', b'0', '$2a$10$NGWSRsuO.VBAuR24/h9HtOK.EX0kF7iAOMnzcHOmOdZOCcCx6reLy', b'1', 'Vĩnh Yên', b'0', '866172604'),
(0x4f5126bf31634648837da10649204646, 'abc@gmail.com', 'Dương Hoàng Hải', b'1', '$2a$10$2qsyIDxyZqKvAFY6tvoo5e3krHEDR6K0YS6uJDPBloOun4aXxxV/6', b'1', 'Vĩnh Yên', b'0', '314121412'),
(0x73e7f71f5b924bce9ce3f661c0b641ed, 'longhvp03@gmail.com', 'Trần Thị Lan', b'1', '$2a$10$DKp.sxYc9ycIqwEFbIIYn.6LhJkU5YVNRdsJltn/zbDLbce/MAuSC', b'1', 'Ha Noi', b'0', '866172604'),
(0xc7109ae171834cc7a146e5e69a0ceec8, 'g@gmail.com', 'Dương Hoàng Hải', b'1', '$2a$10$WBVXoV88gg5PshVeHbVvceMKG6o5n/Com0YMBFhRn.sVSFquI1PlW', b'1', NULL, b'0', NULL),
(0xe479931d64484a358fa87485cd60603d, 'ag@gmail.com', 'Duong ', b'1', '$2a$10$4oDfYEBPPyh2gzL7aX52YOtFPwTfRW9z5QsIB1AlRfz.63pdR1WKC', b'1', 'Vĩnh Yên', b'0', '123456789');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `cart_product`
--
ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`cart_id`,`product_id`),
  ADD KEY `FK2kdlr8hs2bwl14u8oop49vrxi` (`product_id`);

--
-- Chỉ mục cho bảng `cd`
--
ALTER TABLE `cd`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `delivery_info`
--
ALTER TABLE `delivery_info`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `dvd`
--
ALTER TABLE `dvd`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKgnfabg6rvhoc3c9o4deqb1hn4` (`order_id`),
  ADD UNIQUE KEY `UKg8w1kpogyegms2fbtqjqdshjl` (`payment_transaction_id`);

--
-- Chỉ mục cho bảng `lp`
--
ALTER TABLE `lp`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKs1sr8a1rkx80gwq9pl0952dar` (`cart_id`),
  ADD UNIQUE KEY `UKqh132tgg0wbcmrh09s46nwgu1` (`delivery_info_id`);

--
-- Chỉ mục cho bảng `payment_transaction`
--
ALTER TABLE `payment_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `book`
--
ALTER TABLE `book`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=327;

--
-- AUTO_INCREMENT cho bảng `cd`
--
ALTER TABLE `cd`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `delivery_info`
--
ALTER TABLE `delivery_info`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `dvd`
--
ALTER TABLE `dvd`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `lp`
--
ALTER TABLE `lp`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `payment_transaction`
--
ALTER TABLE `payment_transaction`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `FK8cjf4cjanicu58p2l5t8d9xvu` FOREIGN KEY (`id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `cart_product`
--
ALTER TABLE `cart_product`
  ADD CONSTRAINT `FK2kdlr8hs2bwl14u8oop49vrxi` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FKlv5x4iresnv4xspvomrwd8ej9` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`);

--
-- Các ràng buộc cho bảng `cd`
--
ALTER TABLE `cd`
  ADD CONSTRAINT `FKg450nkyhi3a0t7kn2cosol0xf` FOREIGN KEY (`id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `dvd`
--
ALTER TABLE `dvd`
  ADD CONSTRAINT `FK8767xtav39bmxqpras2ivshb9` FOREIGN KEY (`id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `FK9m8ufclck00o6ovi1v0dgoeww` FOREIGN KEY (`payment_transaction_id`) REFERENCES `payment_transaction` (`id`),
  ADD CONSTRAINT `FKthf5w8xuexpjinfl7xheakhqn` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `lp`
--
ALTER TABLE `lp`
  ADD CONSTRAINT `FKm8q2bkr1mx9vxhjq1g5durpsr` FOREIGN KEY (`id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKog5c4dewaxrg2d0tpklulvca2` FOREIGN KEY (`delivery_info_id`) REFERENCES `delivery_info` (`id`),
  ADD CONSTRAINT `FKtpihbdn6ws0hu56camb0bg2to` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
