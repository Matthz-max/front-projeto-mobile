import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
  Actionsheet,
  useDisclose,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import CarCard from '../components/CarCard';
import { fetchCarImage } from '../services/api';

export default function HomeScreen() {
  const [carNameInput, setCarNameInput] = useState('');
  const [carImage, setCarImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { isDarkMode, toggleTheme } = useTheme();

  const colors = {
    background: isDarkMode ? '#121212' : '#f9f9f9',
    card: isDarkMode ? '#1f1f1f' : '#ffffff',
    header: isDarkMode ? '#000000' : '#FF6B00', // ← COR DO HEADER
    textPrimary: isDarkMode ? '#ffffff' : '#1a1a1a',
    textSecondary: isDarkMode ? '#aaaaaa' : '#666666',
    accent: '#FF6B00',
    inputBg: isDarkMode ? '#2c2c2c' : '#e6e6e6',
  };

  useEffect(() => {
    if (carNameInput.trim().length < 3) {
      setPreviewImage(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const image = await fetchCarImage(carNameInput);
        setPreviewImage(image);
      } catch {
        setPreviewImage(null);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [carNameInput]);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <Box
        bg={colors.header}
        safeAreaTop
        px={4}
        py={3}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        shadow={2}
      >
        {/* MENU HAMBÚRGUER */}
        <Pressable onPress={onOpen}>
          <Ionicons name="menu" size={28} color="white" />
        </Pressable>

        {/* LOGO NO CANTO DIREITO */}
        <Image
          source={require('../assets/logo-removebg-preview 1.svg')} // altere extensão se necessário
          alt="Logo"
          size="xs"
          resizeMode="contain"
        />
      </Box>

      {/* MENU HAMBÚRGUER */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content backgroundColor={colors.card}>
          <Actionsheet.Item
            onPress={() => {
              toggleTheme();
              onClose();
            }}
            _text={{ color: colors.textPrimary, fontWeight: 'bold' }}
          >
            {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      {/* CONTEÚDO PRINCIPAL */}
      <ScrollView
        flex={1}
        bg={colors.background}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Center mb={4}>
          <HStack space={3} width="100%" maxW="480px">
            <Input
              flex={1}
              placeholder="Marca e modelo (ex: Toyota Corolla)"
              value={carNameInput}
              onChangeText={setCarNameInput}
              variant="filled"
              bg={colors.inputBg}
              borderRadius="3xl"
              _focus={{ bg: isDarkMode ? '#3a3a3a' : 'gray.300' }}
              px={4}
              py={3}
              fontSize="md"
              returnKeyType="search"
              onSubmitEditing={handleSearch}
              color={colors.textPrimary}
              placeholderTextColor={colors.textSecondary}
            />
            <Button
              onPress={handleSearch}
              bg={colors.accent}
              borderRadius="3xl"
              px={6}
              py={3}
              isLoading={loading}
              _text={{ fontSize: 'md', fontWeight: 'bold', color: 'white' }}
              _pressed={{ bg: '#e65a00' }}
            >
              Buscar
            </Button>
          </HStack>

          {/* Pré-visualização */}
          {previewImage && (
            <Center
              mt={5}
              bg={colors.card}
              p={4}
              borderRadius="xl"
              shadow={3}
              width="100%"
              maxW="480px"
            >
              <Image
                source={{ uri: previewImage }}
                alt="Pré-visualização do carro"
                size="lg"
                resizeMode="contain"
                borderRadius="lg"
              />
              <Text
                mt={3}
                fontSize="md"
                fontWeight="semibold"
                color={colors.textPrimary}
                textAlign="center"
                noOfLines={1}
              >
                {carNameInput}
              </Text>
            </Center>
          )}
        </Center>

        {/* Erro */}
        {error && (
          <Center mb={4}>
            <Text color="red.500" fontWeight="bold" fontSize="md">
              {error}
            </Text>
          </Center>
        )}

        {/* Resultado final */}
        {carImage && (
          <Box
            bg={colors.card}
            p={5}
            borderRadius="xl"
            shadow={3}
            maxW="480px"
            mx="auto"
            mb={8}
          >
            <Center mb={4}>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={colors.textPrimary}
                textAlign="center"
              >
                {carNameInput}
              </Text>
            </Center>
            <CarCard carImage={carImage} />
          </Box>
        )}
      </ScrollView>
    </>
  );
}
