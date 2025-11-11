import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface BookAttributes {
    id: string;
    name: string;
    author: string;
    publicationDate: Date;
    description: string;
    coverImage?: string;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id' | 'coverImage'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
    public id!: string;
    public name!: string;
    public author!: string;
    public publicationDate!: Date;
    public description!: string;
    public coverImage?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Book.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publicationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'books',
        timestamps: true,
    }
);

export default Book;