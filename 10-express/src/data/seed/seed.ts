import { envs } from "../../config";
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";

(async() => {
    await MongoDatabase.connect({
        dbName: envs.MONGODB_NAME,
        mongoUrl: envs.MONGODB_URL,
    })
    await main();

    MongoDatabase.disconnect();
})();

async function main() {
    //Clean database
    await Promise.all([
        UserModel.deleteMany({}),
        CategoryModel.deleteMany({}),
        ProductModel.deleteMany({}),
    ]);
    //Create users
    const user = await UserModel.insertMany(seedData.users)
    //Create categories
    const categories = await CategoryModel.insertMany(
        seedData.categories.map( category => ({
            ...category,
            user: user[ getRamdomFromCeroToX(user.length ) ]._id
        }))
    )
    //Create products
    const products = await ProductModel.insertMany(
        seedData.products.map( product => ({
            ...product,
            user: user[ getRamdomFromCeroToX(user.length ) ]._id,
            category: categories[ Math.floor(Math.random() * categories.length ) ]._id
        }))
    )

}

const getRamdomFromCeroToX = (x: number): number => {
    const n: number = Math.floor(Math.random() * x );
    return n;
}
