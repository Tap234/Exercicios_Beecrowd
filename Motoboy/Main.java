import java.io.IOException;
import java.util.Scanner;

public class Main {

    static int[] minutos;
    static int[] quantidadePizzas;
    static int limitePizza;
    static int N;

    // A assinatura pode continuar a mesma, pois os nomes são genéricos
    public static int encontrarMelhorCombinacao(int itemAtual, int pizzasAtuais, int minutosAtuais) {
        // Condição de parada: já decidimos sobre todos os pedidos
        if (itemAtual == N) {
            return minutosAtuais;
        }

        // Ramo 1: NÃO incluir o pedido atual
        int valorSemIncluir = encontrarMelhorCombinacao(itemAtual + 1, pizzasAtuais, minutosAtuais);

        // Ramo 2: TENTAR incluir o pedido atual
        int valorIncluindo = 0;
        // Verificamos se a quantidade de pizzas não excede o limite
        if (pizzasAtuais + quantidadePizzas[itemAtual] <= limitePizza) {
            // Se couber, chamamos a recursão atualizando os totais
            valorIncluindo = encontrarMelhorCombinacao(itemAtual + 1, 
                                                        pizzasAtuais + quantidadePizzas[itemAtual], 
                                                        minutosAtuais + minutos[itemAtual]);
        }
        
        // Retorna o máximo de minutos entre incluir ou não o pedido
        return Math.max(valorSemIncluir, valorIncluindo);
    }

    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);

        while (true) {
            N = sc.nextInt();

            if (N == 0) {
                break;
            }

            // Lê o limite de pizzas que Roberto pode entregar
            limitePizza = sc.nextInt();

            quantidadePizzas = new int[N];
            minutos = new int[N];

            // Loop para ler os N pedidos
            for (int i = 0; i < N; i++) {
                // CORREÇÃO 2: Ordem de leitura ajustada
                minutos[i] = sc.nextInt();
                quantidadePizzas[i] = sc.nextInt();
            }

            // A chamada inicial é para o item 0, com 0 pizzas e 0 minutos acumulados.
            int resultado = encontrarMelhorCombinacao(0, 0, 0);
            
            // CORREÇÃO 3: Formato da saída ajustado
            System.out.println(resultado + " min.");
        }

        sc.close();
    }
}