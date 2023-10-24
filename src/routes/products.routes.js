import { Router } from 'express'
import {prisma} from '../db.js'

const router = Router()


//obteniendo todos los productos
router.get('/products', async (req,res)=>{
    const products = await prisma.product.findMany()
    res.json(products)
})





//obteniendo un producto por id
router.get('/products/:id', async (req,res)=>{
    const product = await prisma.product.findFirst({
        where:{
            id: parseInt(req.params.id)
        },
        include:{
            category:true,
        }
    })

    if(!product)
    return res.status(404).json({ Error: "producto no encontrado"})

    return res.json(product)
})



//creando un producto
router.post('/products', async (req, res)=>{
    const product = await prisma.product.create({
        data: req.body,
    })
    res.json(product)
})




//eliminando un producto por id
router.delete('/products/:id', async (req,res)=>{
    const product = await prisma.product.delete({
        where:{
            id: parseInt(req.params.id)
        }
    })

    if(!product)
    return res.status(404).json({ Error: "producto no encontrado"})

    return res.json(product)
})




//actualizando un producto por id
router.put('/products/:id', async (req, res)=>{
    const product = await prisma.product.update({
        where:{
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    return res.json(product)
})


export default router