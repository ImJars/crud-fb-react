import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection, setDoc } from "@firebase/firestore";
import { db } from "../firebaseConfig/firebase";

function Contador({ idContador }) {
    const [contador, setContador] = useState(0);
  
    useEffect(() => {
      const obtenerContador = async () => {
        const docRef = doc(db, "contadores", idContador);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContador(docSnap.data().valor);
        } else {
          await setDoc(docRef, { valor: 0 });
        }
      };
      obtenerContador();
    }, [idContador]);
  
    const incrementar = async () => {
      const docRef = doc(db, "contadores", idContador);
      await updateDoc(docRef, { valor: contador + 1 });
      setContador(contador + 1);
    };
  
    const decrementar = async () => {
      const docRef = doc(db, "contadores", idContador);
      if (contador > 0) {
        await updateDoc(docRef, { valor: contador - 1 });
        setContador(contador - 1);
      }
    };
  
    return (
      <div>
        <p>Contador: {contador}</p>
        <button onClick={incrementar}>Incrementar</button>
        <button onClick={decrementar}>Decrementar</button>
      </div>
    );
  }

export default Contador;
