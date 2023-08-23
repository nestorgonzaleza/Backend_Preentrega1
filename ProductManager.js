class ProductManager{

    constructor(){

        this.products=[]

    }


    getProducts(){

        return this.products

    }


    addProduct(title,description,price,thumbnail,code,stock){

        if (title === '' || description === ''|| isNaN(price) || thumbnail === '' || isNaN(code) || isNaN(stock) ) { // se asegura de ingresar valores válidos
            alert('Los valores ingresados son inválidos');
            return;
        }

        price = price

        const product_id = this.products.length + 1

        const product={

        id:product_id,

        title,

        description,

        price,

        thumbnail,

        code,

        stock

        }

        if (this.products.some((prod) => prod.code === product.code)) {    // no se agregará un producto que YA  se encuentra en el array products
            alert('Este producto ya existe en el catálogo');
            return;
        }


        this.products.push(product)

    }


    getProductById(product_id){

        const producto_encontrado = this.products.find((prod)=>prod.id===product_id)

        if(producto_encontrado){

            console.log(producto_encontrado)

        }else{

            console.log("Not Found")

        }


    }

}

const productManager = new ProductManager()

//Agregar productos_ **addProduct(title,description,price,thumbnail,code,stock)**

productManager.addProduct("Aros","Aros bellos",1000,"ruta Aros",1,10)

productManager.addProduct("Anillos","Anillos bellos",2000,"ruta Anillos",2,5)


//Obtener los eventos despues de poner en gira_

const productosActualizados=productManager.getProducts()

console.log("Productos actualizados",productosActualizados)