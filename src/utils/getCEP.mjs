import axios from 'axios';

export async function getCepClient(cep) {
  // Remove qualquer caractere que não seja número
  const cleanedCep = cep.replace(/\D/g, '');

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);

    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar endereço:', error?.response?.data || error.message);
    return null;
  }
}