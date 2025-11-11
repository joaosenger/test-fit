import { Router } from 'express';
import { BookController } from '../controllers/bookController';
import { upload } from '../middleware/upload';

const router = Router();
const bookController = new BookController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - name
 *         - author
 *         - publicationDate
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único do livro
 *         name:
 *           type: string
 *           description: Nome do livro
 *         author:
 *           type: string
 *           description: Autor do livro
 *         publicationDate:
 *           type: string
 *           format: date
 *           description: Data de publicação
 *         description:
 *           type: string
 *           description: Descrição do livro
 *         coverImage:
 *           type: string
 *           nullable: true
 *           description: URL da imagem de capa
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: "Clean Code"
 *         author: "Robert C. Martin"
 *         publicationDate: "2008-08-01"
 *         description: "A Handbook of Agile Software Craftsmanship"
 *         coverImage: "/uploads/book-1234567890.jpg"
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       500:
 *         description: Erro ao buscar livros
 */
router.get('/', bookController.getBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - author
 *               - publicationDate
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do livro
 *               author:
 *                 type: string
 *                 description: Autor do livro
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 description: Data de publicação (YYYY-MM-DD)
 *               description:
 *                 type: string
 *                 description: Descrição do livro
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: Imagem de capa (JPEG, PNG, GIF, WebP - máx 5MB)
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       500:
 *         description: Erro ao criar livro
 */
router.post('/', upload.single('coverImage'), bookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Busca um livro por ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro ao buscar livro
 */
router.get('/:id', bookController.getBookById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Atualiza um livro
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro ao atualizar livro
 */
router.put('/:id', upload.single('coverImage'), bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Deleta um livro
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       204:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro ao deletar livro
 */
router.delete('/:id', bookController.deleteBook);

export default router;