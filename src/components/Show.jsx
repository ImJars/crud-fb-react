import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaEdit, FaTrash } from "react-icons/fa";

import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

import Swal from 'sweetalert2'
import Contador from "./contador";

function Show() {
  //1 - Configuramos HOOKS
  const [products, setProducts] = useState([]);

  //2 - Referenciamos a la BD firestore
  const productsCollection = collection(db, "products");

  //3 - Funcion para mostrar todos los docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // console.log(products);
  };

  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  //5 - Funcion de confirmacion para SweetAlert
  const confirmDelete = (id) => {
    Swal.fire({
        title: '¿Remove the product?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
  }

  //6 - Usamos useEffect
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  //7 - devolvemos vista de nuestro componente

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="">
          <div className="">
            <div className="d-grid gap-2 flex justify-center my-4">
              <Link to="/create" className="px-40 py-2 text-text-white-gray font-bold text-4xl border border-text-general rounded-xl border-opacity-25 bg-secondary">
                Create
              </Link>
            </div>
            <table className="w-full h-full flex flex-col bg-table-color text-text-general rounded-xl">
                <thead className="w-full h-full">
                  <tr className="flex justify-between">
                    <th className="w-full text-center p-5">Description</th>
                    <th className="w-full text-center p-5">Stock</th>
                    <th className="w-full text-center p-5">Acctions</th>
                  </tr>
                </thead>

                <tbody className="w-full">
                  {products.map((product) => (
                    <tr className="flex justify-between" key={product.id}>
                      <td className="w-full text-start mt-10">{product.description}</td>
                      <td className="w-full flex justify-center mt-10">{product.stock}</td>
                      <td className="w-full flex justify-center mt-10 items-center space-x-4">
                        <Link to={`/edit/${product.id}`} className="btn btn-light"><FaEdit className="text-3xl"/></Link>
                        <button onClick={() => {confirmDelete(product.id)}} className="btn btn-danger"><FaTrash className="text-3xl"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <div>
                  <h1 className="text-text-white-gray text-4xl">
                    <Contador idContador={"miContador"}/>

                    <Contador idContador={"miContador1"}/>
                    <Contador idContador={"miContador2"}/>
                    <Contador idContador={"miContador3"}/>
                    <Contador idContador={"miContador4"}/>




                  </h1>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Show;
