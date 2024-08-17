const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient()

async function main(){
    try{
        await database.category.createMany({
            data:[
                {name:"Computer science"},
                {name:"Web design"},
                {name:"Web development"},
                {name:"Frontend development"},
                {name:"Backend development"},
                {name:"Mobile development"},
                {name:"Computer programming"},
                {name:"Cross platform development"},
                {name:"Database management systems"},
            ]
        })
        console.log("Success")
    }catch(err){
        console.log("Error seeding the database categories",err)

    }finally{
        await database.$disconnect()
    }
}

main()