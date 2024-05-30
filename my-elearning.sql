-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 30, 2024 at 04:51 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my-elearning`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` int(11) NOT NULL,
  `sub_module_id` int(11) DEFAULT NULL,
  `type` varchar(15) DEFAULT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `sub_module_id`, `type`, `content`) VALUES
(1, 1, 'heading', 'Task 1 heading'),
(2, 1, 'paragraph', 'Task 1 paragraph content'),
(3, 2, 'heading', 'Task 2 heading'),
(4, 2, 'paragraph', 'Task 2 paragraph content'),
(5, 3, 'heading', 'Task 3 heading'),
(6, 3, 'paragraph', 'Task 3 paragraph content'),
(7, 4, 'heading', 'Task 1 heading'),
(8, 4, 'paragraph', 'Task 1 paragraph content'),
(9, 5, 'heading', 'Task 2 heading'),
(10, 5, 'paragraph', 'Task 2 paragraph content'),
(11, 6, 'heading', 'Task 3 heading'),
(12, 6, 'paragraph', 'Task 3 paragraph content'),
(13, 7, 'heading', 'Task 1 heading'),
(14, 7, 'paragraph', 'Task 1 paragraph content'),
(15, 8, 'heading', 'Task 2 heading'),
(16, 8, 'paragraph', 'Task 2 paragraph content'),
(17, 9, 'heading', 'Task 3 heading'),
(18, 9, 'paragraph', 'Task 3 paragraph content'),
(19, 10, 'heading', 'Task 1 heading'),
(20, 10, 'paragraph', 'Task 1 paragraph content'),
(21, 11, 'heading', 'Task 2 heading'),
(22, 11, 'paragraph', 'Task 2 paragraph content'),
(23, 12, 'heading', 'Task 3 heading'),
(24, 12, 'paragraph', 'Task 3 paragraph content'),
(25, 13, 'heading', 'Task 1 heading'),
(26, 13, 'paragraph', 'Task 1 paragraph content'),
(27, 14, 'heading', 'Task 2 heading'),
(28, 14, 'paragraph', 'Task 2 paragraph content'),
(29, 15, 'heading', 'Task 3 heading'),
(30, 15, 'paragraph', 'Task 3 paragraph content'),
(31, 16, 'heading', 'Task 1 heading'),
(32, 16, 'paragraph', 'Task 1 paragraph content'),
(33, 17, 'heading', 'Task 2 heading'),
(34, 17, 'paragraph', 'Task 2 paragraph content'),
(35, 18, 'heading', 'Task 3 heading'),
(36, 18, 'paragraph', 'Task 3 paragraph content');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(3) NOT NULL,
  `course_title` varchar(40) NOT NULL,
  `image` varchar(40) NOT NULL,
  `more_info` varchar(100) NOT NULL,
  `instructions` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_title`, `image`, `more_info`, `instructions`) VALUES
(1, 'Test course 1', 'test.jpg', 'Pop up box with more info 1', 'In order to complete this learning, visit each of the modules shown below 1 '),
(2, 'Test course 2', 'test.jpg', 'Pop up box with more info 2', 'In order to complete this learning, visit each of the modules shown below 2 ');

-- --------------------------------------------------------

--
-- Table structure for table `enrolled_courses`
--

CREATE TABLE `enrolled_courses` (
  `id` int(255) NOT NULL,
  `user_id` int(3) NOT NULL,
  `course_title` varchar(150) NOT NULL,
  `course_id` int(3) NOT NULL,
  `entry_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `module_title` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `course_id`, `module_title`) VALUES
(1, 1, 'Course 1 Day 1'),
(2, 1, 'Course 1 Day 2'),
(3, 1, 'Course 1 Day 3'),
(4, 2, 'Course 2 Day 1'),
(5, 2, 'Course 2 Day 2'),
(6, 2, 'Course 2 Day 3');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `token`, `entry_date`) VALUES
(1, 1, 'rse6f97wr2sW51SYYCYSFd8xynspp835FOU3SXNHWQF', '2024-05-29 23:03:40');

-- --------------------------------------------------------

--
-- Table structure for table `sub_modules`
--

CREATE TABLE `sub_modules` (
  `id` int(3) NOT NULL,
  `module_id` int(3) NOT NULL,
  `sub_module_title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sub_modules`
--

INSERT INTO `sub_modules` (`id`, `module_id`, `sub_module_title`) VALUES
(1, 1, 'Day 1, Task 1'),
(2, 1, 'Day 1, Task 2'),
(3, 1, 'Day 1, Task 3'),
(4, 2, 'Day 2, Task 1'),
(5, 2, 'Day 2, Task 2'),
(6, 2, 'Day 2, Task 3'),
(7, 3, 'Day 3, Task 1'),
(8, 3, 'Day 3, Task 2'),
(9, 3, 'Day 3, Task 3'),
(10, 4, 'Day 1, Task 1'),
(11, 4, 'Day 1, Task 2'),
(12, 4, 'Day 1, Task 3'),
(13, 5, 'Day 2, Task 1'),
(14, 5, 'Day 2, Task 2'),
(15, 5, 'Day 2, Task 3'),
(16, 6, 'Day 3, Task 1'),
(17, 6, 'Day 3, Task 2'),
(18, 6, 'Day 3, Task 3');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(5) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `entry_date`) VALUES
(1, 'asdasd', 'harry_bannister@outlook.com', 'c751998dcec21babf084bd83595e3005a537b90dfd569e517954126fd18af937', '2024-05-29 23:03:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enrolled_courses`
--
ALTER TABLE `enrolled_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_modules`
--
ALTER TABLE `sub_modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enrolled_courses`
--
ALTER TABLE `enrolled_courses`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sub_modules`
--
ALTER TABLE `sub_modules`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
