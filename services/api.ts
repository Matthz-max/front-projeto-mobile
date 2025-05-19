import axios from 'axios';

export const fetchCarImage = async (carName: string): Promise<string | null> => {
  try {
    const response = await axios.get('https://www.carimagery.com/api.asmx/GetImageUrl', {
      params: {
        searchTerm: carName,
      },
    });

    // A resposta é XML, então usamos regex para extrair a URL da imagem
    const regex = /<string xmlns="http:\/\/carimagery.com\/">(.+)<\/string>/;
    const match = regex.exec(response.data);

    return match ? match[1] : null;
  } catch (error) {
    console.error('Erro ao buscar imagem do Car Imagery:', error);
    return null;
  }
};
