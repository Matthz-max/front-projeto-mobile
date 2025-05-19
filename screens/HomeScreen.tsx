import { Box, Button, Center, Input, ScrollView, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import CarCard from '../components/CarCard';
import { fetchCarImage } from '../services/api';

export default function HomeScreen() {
  const [carNameInput, setCarNameInput] = useState('');
  const [carImages, setCarImages] = useState<string[]>([]); // array de imagens
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    if (!carNameInput.trim()) {
      setError('Digite a marca e o modelo do carro');
      return;
    }

    setLoading(true);

    try {
      const image = await fetchCarImage(carNameInput);
      if (!image) {
        setError('Imagem não encontrada para esse carro');
        return;
      }

      // adiciona nova imagem no início da lista
      setCarImages(prevImages => [image, ...prevImages]);
      setCarNameInput(''); // limpa o input após busca
    } catch (e) {
      setError('Erro ao buscar imagem do carro. Tente novamente.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      flex={1}
      bg="primary.600"
      contentContainerStyle={{ padding: 16, paddingTop: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Center mb={6}>
        <Text color="white" fontSize="3xl" fontWeight="bold" letterSpacing="md">
          Driveasy
        </Text>
        <Text color="primary.200" fontSize="md" mt={1} fontWeight="medium">
          Encontre seu carro ideal
        </Text>
      </Center>

      <Box bg="white" p={4} borderRadius="lg" shadow={2}>
        <VStack space={4}>
          <Input
            placeholder="Digite marca e modelo do carro (ex: Toyota Corolla)"
            value={carNameInput}
            onChangeText={setCarNameInput}
            variant="filled"
            bg="gray.100"
            borderRadius="md"
            _focus={{ bg: 'gray.200' }}
          />
          <Button onPress={handleSearch} colorScheme="primary" isLoading={loading}>
            Buscar
          </Button>

          {error && (
            <Center>
              <Text color="red.500" fontWeight="bold" mt={2}>
                {error}
              </Text>
            </Center>
          )}

          {/* Renderiza cada CarCard da lista */}
          {carImages.length > 0 &&
            carImages.map((img, index) => (
              <CarCard key={index} carImage={img} />
            ))}
        </VStack>
      </Box>
    </ScrollView>
  );
}
