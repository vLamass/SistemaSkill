import { StyleSheet } from "react-native";

export function createStyles(colors: any) {
    return StyleSheet.create({
        card: {
            flex: 1,
            minWidth: 0,

            backgroundColor: colors.surface,

            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,

            padding: 16,
            minHeight: 120,

            alignItems: "center",
            justifyContent: "center",

            gap: 8,

            shadowColor: colors.dark,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity:
                colors.shadow.includes("0.35")
                    ? 0.35
                    : 0.08,
            shadowRadius: 8,

            elevation: 3,
        },

        valor: {
            fontSize: 32,
            fontWeight: "700",
            color: colors.primary,
        },

        titulo: {
            fontSize: 14,
            fontWeight: "600",
            color: colors.textSecondary,

            textAlign: "center",
        },
    });
}