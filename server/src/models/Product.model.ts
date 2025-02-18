import {Table,Column,Model,DataType,Default} from 'sequelize-typescript';

@Table({
    tableName:'products'
})

class Products extends Model{
    @Column({
        type:DataType.STRING(100)
    })
    declare name:string

    @Column({
        type: DataType.FLOAT
    })
    declare price:number

    //Default permite establecer el campo availability como true por defecto
    @Default(true)
    @Column({
        type:DataType.BOOLEAN
    })
    declare availability:boolean
}
export default Products;