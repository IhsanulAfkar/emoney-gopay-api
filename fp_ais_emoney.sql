-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 07, 2022 at 02:26 AM
-- Server version: 8.0.26
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fp_ais_emoney`
--

-- --------------------------------------------------------

--
-- Table structure for table `topup`
--

CREATE TABLE `topup` (
  `topup_id` int NOT NULL,
  `user_id` varchar(12) NOT NULL,
  `topup_amount` int NOT NULL,
  `topup_date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `topup`
--

INSERT INTO `topup` (`topup_id`, `user_id`, `topup_amount`, `topup_date`) VALUES
(1, '3', 100, '2022-11-06 17:37:01'),
(2, '3', 100, '2022-11-06 17:40:05'),
(3, '3', 100, '2022-11-06 17:41:43'),
(4, '3', 100, '2022-11-06 17:44:45'),
(5, '3', 100, '2022-11-06 17:45:26'),
(6, '3', 100, '2022-11-06 17:46:10'),
(7, '3', 100, '2022-11-06 17:47:55'),
(8, '3', 100, '2022-11-06 17:48:07');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL,
  `user_id` varchar(12) NOT NULL,
  `transaction_amount` int NOT NULL,
  `transaction_description` varchar(20) DEFAULT NULL,
  `transaction_date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `user_id`, `transaction_amount`, `transaction_description`, `transaction_date`) VALUES
(1, '1', 7, ' soft test', '2022-11-07 02:19:22'),
(2, '1', 77, ' soft test', '2022-11-07 02:19:40'),
(3, '1', 77, ' soft test', '2022-11-07 02:19:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_phone` varchar(12) NOT NULL,
  `user_email` varchar(20) NOT NULL,
  `user_name` varchar(36) NOT NULL,
  `user_pass` varchar(20) NOT NULL,
  `user_balance` int NOT NULL DEFAULT '0',
  `user_createtime` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_phone`, `user_email`, `user_name`, `user_pass`, `user_balance`, `user_createtime`) VALUES
(1, '1', 'admin@admin.com', 'admin', 'siadmin', 999839, '0000-00-00 00:00:00'),
(3, '000000000001', 'korban@korban.com', 'korban', 'korban', 200, '2022-11-06 07:39:48'),
(4, '000000000002', 'korbin@korbin.com', 'korbin', 'korbin', 0, '2022-11-06 13:37:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `topup`
--
ALTER TABLE `topup`
  ADD PRIMARY KEY (`topup_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `topup`
--
ALTER TABLE `topup`
  MODIFY `topup_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
