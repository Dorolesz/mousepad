-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Már 12. 21:49
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mousepad_shop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `delivery_days` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `name`, `type`, `price`, `delivery_days`, `created_at`, `img`) VALUES
(1, 'Gamer XL egérpad', 'gamer', 7990, 3, '2026-01-24 22:50:53', 'https://i.pinimg.com/1200x/4e/66/69/4e6669b10cf4fa3740fe728f0e48a4eb.jpg'),
(2, 'RGB világítós egérpad', 'RGB', 10990, 5, '2026-01-24 22:50:53', 'https://i.pinimg.com/1200x/53/fe/d2/53fed2976e45acccdedd79e22c7f6263.jpg'),
(3, 'Nyomtatott egérpad', 'nyomtatott', 4990, 2, '2026-01-24 22:50:53', 'https://i.pinimg.com/1200x/8d/ae/6a/8dae6a58802eadee46c0505f4f4016a0.jpg'),
(4, 'Kompakt egérpad', 'kicsi', 2990, 1, '2026-01-24 22:50:53', 'https://i.pinimg.com/1200x/be/79/7e/be797ee4a498c796e217fe9ad96c183b.jpg');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
