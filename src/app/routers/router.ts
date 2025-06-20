import express from "express";
import { BookRoutes } from "../modules/books/books.router";
import { BorrowRoutes } from "../modules/borrow/borrow.router";

const router = express.Router();

const moduleRoutes = [
  { path: "/books", route: BookRoutes },
  { path: "/borrow", route: BorrowRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
