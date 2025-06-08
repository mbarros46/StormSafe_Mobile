import axios from 'axios';
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080/api/usuarios', // Altere para o IP real da sua API se for dispositivo físico
});

export interface Usuario {
  idUsuario?: number;
  nome: string;
  email: string;
  senha?: string;
  telefone?: string;
  tipoUsuario: 'USER' | 'ADMIN';
}

// 🔍 GET - Listar todos os usuários
export const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await api.get<Usuario[]>('');
    return response.data;
  } catch {
    Alert.alert('Erro', 'Erro ao buscar usuários');
    return [];
  }
};

// 🆕 POST - Criar novo usuário
export const createUsuario = async (dados: Usuario) => {
  try {
    const response = await api.post('', dados);
    Alert.alert('Sucesso', 'Usuário criado com sucesso!');
    return response.data;
  } catch {
    Alert.alert('Erro', 'Falha ao criar usuário');
  }
};

// ✏️ PUT - Atualizar usuário existente
export const updateUsuario = async (id: number, dados: Usuario) => {
  try {
    const response = await api.put(`/${id}`, dados);
    Alert.alert('Sucesso', 'Usuário atualizado!');
    return response.data;
  } catch {
    Alert.alert('Erro', 'Erro ao atualizar usuário');
  }
};

// ❌ DELETE - Deletar usuário
export const deleteUsuario = async (id: number) => {
  try {
    await api.delete(`/${id}`);
    Alert.alert('Sucesso', 'Usuário excluído!');
  } catch {
    Alert.alert('Erro', 'Erro ao deletar usuário');
  }
};
