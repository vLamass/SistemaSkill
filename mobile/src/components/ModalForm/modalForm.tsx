import { useState } from 'react';
import {
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from './modalForm.style';

export type AuthMode = 'login' | 'cadastro';

interface ModalFormProps {
  mode: AuthMode;

  usuario: string;
  senha: string;
  confirmarSenha: string;

  lembrarUsuario: boolean;

  loading: boolean;
  erro: string;
  sucesso: string;

  onUsuarioChange: (value: string) => void;

  onSenhaChange: (value: string) => void;

  onConfirmarSenhaChange: (value: string) => void;

  onLembrarUsuarioChange: (value: boolean) => void;

  onSubmit: () => void;

  onChangeMode: (mode: AuthMode) => void;
}

export function ModalForm({
  mode,

  usuario,
  senha,
  confirmarSenha,

  lembrarUsuario,

  loading,
  erro,
  sucesso,

  onUsuarioChange,
  onSenhaChange,
  onConfirmarSenhaChange,
  onLembrarUsuarioChange,

  onSubmit,
  onChangeMode,
}: ModalFormProps) {
  const [mostrarSenha, setMostrarSenha] =
    useState(false);

  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] =
    useState(false);

  const isLogin = mode === 'login';

  return (
    <View style={styles.card}>

      {/* CABEÇALHO */}

      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          {isLogin
            ? 'Bem-vindo'
            : 'Criar conta'}
        </Text>

        <Text style={styles.descricao}>
          {isLogin
            ? 'Insira suas credenciais para acessar o sistema.'
            : 'Preencha seus dados para criar sua conta.'}
        </Text>
      </View>

      {/* USUÁRIO */}

      <View style={styles.formulario}>
        <Text style={styles.label}>
          Usuário
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor={styles.placeholder.color}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="username"
          value={usuario}
          onChangeText={onUsuarioChange}
          editable={!loading}
        />
      </View>

      {/* SENHA */}

      <View style={styles.formulario}>
        <Text style={styles.label}>
          Senha
        </Text>

        <View style={styles.inputSenha}>
          <TextInput
            style={styles.inputSenhaTexto}
            placeholder="Digite sua senha"
            placeholderTextColor={styles.placeholder.color}
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
            autoComplete={
              isLogin
                ? 'current-password'
                : 'new-password'
            }
            value={senha}
            onChangeText={onSenhaChange}
            editable={!loading}
          />

          <Pressable
            style={styles.botaoOlho}
            onPress={() =>
              setMostrarSenha(
                valor => !valor
              )
            }
            disabled={loading}
          >
            <Ionicons
    name={mostrarSenha ? "eye" : "eye-off"}
    size={20}
    color="#777"
/>
          </Pressable>
        </View>
      </View>

      {/* CONFIRMAR SENHA */}

      {!isLogin && (
        <View style={styles.formulario}>
          <Text style={styles.label}>
            Confirmar senha
          </Text>

          <View style={styles.inputSenha}>
            <TextInput
              style={styles.inputSenhaTexto}
              placeholder="Confirme sua senha"
              placeholderTextColor={
                styles.placeholder.color
              }
              secureTextEntry={
                !mostrarConfirmarSenha
              }
              autoCapitalize="none"
              autoComplete="new-password"
              value={confirmarSenha}
              onChangeText={
                onConfirmarSenhaChange
              }
              editable={!loading}
            />

            <Pressable
              style={styles.botaoOlho}
              onPress={() =>
                setMostrarConfirmarSenha(
                  valor => !valor
                )
              }
              disabled={loading}
            >
           <Ionicons
    name={mostrarConfirmarSenha ? "eye" : "eye-off"}
    size={20}
    color="#777"
/>
            </Pressable>
          </View>
        </View>
      )}

      {/* LEMBRAR USUÁRIO */}

      {isLogin && (
        <View style={styles.lembrar}>
          <Switch
            value={lembrarUsuario}
            onValueChange={
              onLembrarUsuarioChange
            }
            disabled={loading}
            trackColor={{
              false: '#D9D2C8',
              true: '#D09A55',
            }}
            thumbColor="#FFFFFF"
          />

          <Text style={styles.textoLembrar}>
            Lembrar-me
          </Text>
        </View>
      )}

      {/* BOTÃO */}

      <Pressable
        style={({ pressed }) => [
          styles.botaoSubmit,
          pressed &&
            !loading &&
            styles.botaoSubmitPressionado,
          loading &&
            styles.botaoSubmitDesabilitado,
        ]}
        onPress={onSubmit}
        disabled={loading}
      >
        <Text style={styles.textoBotaoSubmit}>
          {loading
            ? 'Aguarde...'
            : isLogin
              ? 'Entrar'
              : 'Cadastrar'}
        </Text>
      </Pressable>

      {/* SUCESSO */}

      {sucesso ? (
        <Text style={styles.sucesso}>
          {sucesso}
        </Text>
      ) : null}

      {/* ERRO */}

      {erro ? (
        <Text style={styles.erro}>
          {erro}
        </Text>
      ) : null}

      {/* TROCA LOGIN / CADASTRO */}

      <View style={styles.alternativa}>
        <Text style={styles.textoAlternativa}>
          {isLogin
            ? 'Não possui conta?'
            : 'Já possui uma conta?'}
        </Text>

        <Pressable
          onPress={() =>
            onChangeMode(
              isLogin
                ? 'cadastro'
                : 'login'
            )
          }
          disabled={loading}
        >
          <Text style={styles.botaoAlternativa}>
            {isLogin
              ? 'Cadastre-se'
              : 'Entrar'}
          </Text>
        </Pressable>
      </View>

    </View>
  );
}