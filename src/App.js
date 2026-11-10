/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './services/api';
import './style.css';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function getCEP() {
    try {
      const response = await api.get(`${input}/json/`);

      // ViaCEP responde 200 com { erro: true } para CEP inexistente
      if (response.data.erro) {
        throw new Error(`CEP ${input} não encontrado`);
      }

      setCep(response.data);

      const adress = document.querySelector("#adress");
      adress.classList.remove('hidden');

    } catch (error) {
      console.error(error);
      setInput("");
      document.querySelector("#adress").classList.add('hidden');

      toast.error('CEP inválido', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="container">

        <h1>BUSCAR CEP</h1>

        <div className="container-input">
          
          <input type="text" placeholder="CEP" value={input} onChange={(e) => setInput(e.target.value) }/>
          <button className="search" onClick={getCEP}> <FiSearch size={25} color="#FFF"/> </button>
          
        </div>

        <main className='hidden' id="adress">

          <span>{cep.logradouro}, {cep.complemento}</span>
          <span>{cep.bairro}, {cep.localidade}-{cep.uf}</span>

        </main>

      </div>
    </>
  );
}

export default App;
