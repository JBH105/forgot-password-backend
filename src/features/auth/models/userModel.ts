import { DataTypes, Model, Sequelize } from 'sequelize';

export class AccountEntity extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public resetPasswordToken!: string | null;
    public resetPasswordExpires!: Date | null;

    static initModel(sequelize: Sequelize): void {
        AccountEntity.init(
            {
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                resetPasswordToken: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                resetPasswordExpires: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'account',
                timestamps: false,
            }
        );
    }
}
