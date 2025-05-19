import React from 'react';
import { Box, Image, Text, VStack, Center } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  carImage: string | null;
};

const CarCard: React.FC<Props> = ({ carImage }) => {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      shadow={8}
      overflow="hidden"
      marginY={4}
      mx="auto"
      width="100%"
      maxWidth={350}
    >
      {carImage ? (
        <Box position="relative">
          <Image
            source={{ uri: carImage }}
            alt="Imagem do Carro"
            height={220}
            width="100%"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
            }}
          />
        </Box>
      ) : (
        <Center height={220} bg="gray.200">
          <Text color="gray.500" fontSize="md" italic>
            Nenhuma imagem encontrada.
          </Text>
        </Center>
      )}

      <VStack px={4} py={3} space={1}>
        <Text fontSize="lg" fontWeight="bold" color="coolGray.800">
          🚘 Carro encontrado!
        </Text>
        <Text fontSize="sm" color="coolGray.500">
          Esta imagem é ilustrativa com base na busca realizada.
        </Text>
      </VStack>
    </Box>
  );
};

export default CarCard;
