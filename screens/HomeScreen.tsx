import { Box, Button, Center, Input, ScrollView, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import CarCard from '../components/CarCard';
import { fetchCarImage } from '../services/api';

export default function HomeScreen() {
  const [carNameInput, setCarNameInput] = useState('');
  const [carImage, setCarImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    if (!carNameInput.trim()) {
      setError('Digite a marca e o modelo do carro');
      return;
    }

    setLoading(true);
    setCarImage(null);

    try {
      const image = await fetchCarImage(carNameInput);
      if (!image) {
        setError('Imagem não encontrada para esse carro');
        return;
      }

      setCarImage(image);
    } catch (e) {
      setError('Erro ao buscar imagem do carro. Tente novamente.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} safeArea bg="primary.600" px={4} pt={6}>
      <Center mb={6}>
        <Text color="white" fontSize="3xl" fontWeight="bold" letterSpacing="md">
          Driveasy
        </Text>
        <Text color="primary.200" fontSize="md" mt={1} fontWeight="medium">
          Encontre seu carro ideal
        </Text>
      </Center>

      <Box bg="white" p={4} borderRadius="lg" shadow={2} flex={1}>
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
          <Button onPress={handleSearch} colorScheme="primary">
            Buscar
          </Button>

          {loading && (
            <Center>
              <Text color="primary.600" fontWeight="bold" mt={2}>
                Buscando imagem...
              </Text>
            </Center>
          )}

          {error && (
            <Center>
              <Text color="red.500" fontWeight="bold" mt={2}>
                {error}
              </Text>
            </Center>
          )}

          {carImage && (
            <>
              <Center>
                <Text
                  mt={4}
                  fontSize="2xl"
                  fontWeight="bold"
                  color="coolGray.800"
                  textAlign="center"
                >
                  {carNameInput}
                </Text>
              </Center>

              <ScrollView>
                <CarCard carImage={carImage} />
              </ScrollView>
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
