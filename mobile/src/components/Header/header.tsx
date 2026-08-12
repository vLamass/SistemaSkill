import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

import { createStyles } from './header.style';

export function Header() {
    const navigation = useNavigation();

    const { usuario, logout } = useAuth();
    const {
        tema,
        alternarTema,
        colors,
    } = useTheme();

    const styles = createStyles(colors);

    function sair() {
        logout();
        navigation.navigate('Login' as never);
    }

    return (
        <View style={styles.header}>
            <Text style={styles.logo}>
                Sistema Skills
            </Text>

            <View style={styles.direita}>
                <Text style={styles.usuario}>
                    {usuario?.login || 'Usuário'}
                </Text>

                <Pressable
                    style={styles.botaoTema}
                    onPress={alternarTema}
                    accessibilityLabel="Alterar tema"
                >
                    <Text style={styles.iconeTema}>
                        {tema === 'light'
                            ? '🌙'
                            : '☀️'}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.botaoSair}
                    onPress={sair}
                >
                    <Text
                        style={
                            styles.textoBotaoSair
                        }
                    >
                        Sair
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}